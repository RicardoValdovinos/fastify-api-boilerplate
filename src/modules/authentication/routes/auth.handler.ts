import {
	generateCodeVerifier,
	generateState,
	OAuth2RequestError,
} from "arctic";
import { RouteHandlerMethod } from "fastify";
import { generateIdFromEntropySize } from "lucia";
import { parseCookies } from "oslo/cookie";
import { request as undiciRequest } from "undici";
import { GoogleOAuthUser } from "../../../common/types.js";

type GoogleUserInfoResponse = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: string;
	hd: string;
};

export const authGoogle: RouteHandlerMethod = async (
	request,
	reply
): Promise<void> => {
	const { server: instance } = request;
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await instance.auth.google.createAuthorizationURL(
		state,
		codeVerifier,
		{
			scopes: ["profile", "email"],
		}
	);

	reply.cookie("google_oauth_state", state, {
		httpOnly: true,
		secure: instance.config.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		path: "/",
	});

	reply.cookie("code_verifier", codeVerifier, {
		httpOnly: true,
		secure: instance.config.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		path: "/",
	});

	const clientUrl = new URL(request.url, "http://placeholder.com"); // don't care about base url. just want params
	const referer = clientUrl.searchParams.get("referer");
	if (!referer) {
		return reply.badRequest("Missing referer search param");
	}

	return reply.redirect(url.toString());
};

export const authGoogleCallback: RouteHandlerMethod = async (
	request,
	reply
): Promise<void> => {
	const { server: instance } = request;
	const requestCookies = request.headers.cookie ?? "";
	const cookies = parseCookies(requestCookies);
	const stateCookie = cookies.get("google_oauth_state") ?? null;
	const codeVerifier = cookies.get("code_verifier") ?? null;
	const referer = cookies.get("referer") ?? null;

	const url = new URL(request.url);
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	// verify state
	if (
		!state ||
		!stateCookie ||
		!code ||
		stateCookie !== state ||
		!codeVerifier
	) {
		return reply.badRequest();
	}

	if (!referer) {
		return reply.badRequest("Missing referer search param");
	}

	try {
		const tokens = await instance.auth.google.validateAuthorizationCode(
			code,
			codeVerifier
		);
		const googleUserResponse = await undiciRequest(
			"https://openidconnect.googleapis.com/v1/userinfo",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			}
		);
		const googleUserInfoResponse =
			(await googleUserResponse.body.json()) as GoogleUserInfoResponse;
		const googleUser: GoogleOAuthUser = {
			id: "",
			googleId: googleUserInfoResponse.sub,
			googleEmail: googleUserInfoResponse.email,
			googleName: googleUserInfoResponse.name,
		};

		const existingUser = await instance.database
			.selectFrom("user")
			.where("google_id", "=", googleUser.googleId)
			.executeTakeFirst();

		reply.clearCookie("google_oauth_state");
		reply.clearCookie("code_verifier");
		reply.clearCookie("referer");

		if (existingUser) {
			const session = await instance.auth.lucia.createSession(
				existingUser.id,
				{}
			);
			const sessionCookie = instance.auth.lucia.createSessionCookie(session.id);
			reply.cookie(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);

			return reply.redirect(referer);
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		googleUser.id = userId;

		await instance.database
			.insertInto("GoogleOAuthUser")
			.values({
				id: googleUser.id,
				googleId: googleUser.googleId,
				googleEmail: googleUser.googleEmail,
				name: googleUser.googleName,
			})
			.execute();

		const session = await instance.auth.lucia.createSession(googleUser.id, {});
		const sessionCookie = instance.auth.lucia.createSessionCookie(session.id);
		reply.cookie(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);

		return reply.redirect(referer);
	} catch (error) {
		request.log.error(error);
		if (error instanceof OAuth2RequestError) {
			return reply.badRequest();
		}
		return reply.internalServerError();
	}
};

export const logout: RouteHandlerMethod = async (request, reply) => {
	const { server: instance } = request;
	const { auth_session: sessionId } = request.cookies;

	const clientUrl = new URL(request.url, "http://placeholder.com");
	const referer = clientUrl.searchParams.get("referer");

	if (!referer) {
		return reply.badRequest("Missing referer search param");
	}

	if (!sessionId) {
		return reply.redirect(referer);
	}

	const sessionCookie = instance.auth.lucia.createBlankSessionCookie();
	reply.cookie(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return reply.redirect(referer);
};

export const verify: RouteHandlerMethod = async (request, reply) => {
	const { server: instance } = request;
	const { auth_session: sessionId } = request.cookies;

	// no session Id in cookie/cookie does not exist
	if (!sessionId) {
		return reply.unauthorized();
	}

	// valid cookie but session does not exist in db - delete cookie
	const { session } = await instance.auth.lucia.validateSession(sessionId);
	if (!session) {
		const sessionCookie = instance.auth.lucia.createBlankSessionCookie();
		reply.cookie(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return reply.unauthorized();
	}

	// valid cookie and session but has expired - set new session cookie
	if (session && session.fresh) {
		const sessionCookie = instance.auth.lucia.createSessionCookie(session.id);
		reply.cookie(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
	}

	return reply;
};
