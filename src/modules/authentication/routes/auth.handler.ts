import type { CookieSerializeOptions } from "@fastify/csrf-protection";
import {
	generateCodeVerifier,
	generateState,
	OAuth2RequestError,
} from "arctic";
import type { RouteHandlerMethod } from "fastify";
import { generateIdFromEntropySize } from "lucia";
import { parseCookies } from "oslo/cookie";
import { request as undiciRequest } from "undici";
import type { RouteHandlerMethodTypebox, User } from "../../../common/types.js";
import type {
	refererQueryStringSchema,
	stateAndCodeQueryStringSchema,
} from "./auth.schema.js";

// response from google api
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

export const authGoogle: RouteHandlerMethodTypebox<
	typeof refererQueryStringSchema
> = async (request, reply): Promise<void> => {
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

	const cookieOptions: CookieSerializeOptions = {
		httpOnly: true,
		secure: instance.config.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		path: "/",
	};

	reply.cookie("google_oauth_state", state, cookieOptions);
	reply.cookie("code_verifier", codeVerifier, cookieOptions);

	const { referer } = request.query;
	if (!referer) {
		return reply.badRequest("Missing referer search param");
	}
	reply.cookie("referer", referer, cookieOptions);

	return reply.redirect(url.toString());
};

export const authGoogleCallback: RouteHandlerMethodTypebox<
	typeof stateAndCodeQueryStringSchema
> = async (request, reply): Promise<void> => {
	const { server: instance } = request;
	const requestCookies = request.headers.cookie ?? "";
	const cookies = parseCookies(requestCookies);
	const stateCookie = cookies.get("google_oauth_state") ?? null;
	const codeVerifier = cookies.get("code_verifier") ?? null;
	const referer = cookies.get("referer") ?? null;

	// verify state
	const { state, code } = request.query;
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
		const googleUser: User = {
			id: "",
			googleId: googleUserInfoResponse.sub,
			googleEmail: googleUserInfoResponse.email,
			googleName: googleUserInfoResponse.name,
		};

		const existingUser = await instance.database
			.selectFrom("user")
			.where("googleId", "=", googleUser.googleId)
			.selectAll()
			.executeTakeFirst();

		reply.clearCookie("google_oauth_state");
		reply.clearCookie("code_verifier");
		reply.clearCookie("referer");

		if (existingUser && existingUser.id) {
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

			return await reply.redirect(referer);
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		googleUser.id = userId;

		await instance.database
			.insertInto("user")
			.values({
				id: googleUser.id,
				googleId: googleUser.googleId,
				googleEmail: googleUser.googleEmail,
				googleName: googleUser.googleName,
			})
			.execute();

		const session = await instance.auth.lucia.createSession(googleUser.id, {});
		const sessionCookie = instance.auth.lucia.createSessionCookie(session.id);
		reply.cookie(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);

		return await reply.redirect(referer);
	} catch (error) {
		request.log.error(error);
		if (error instanceof OAuth2RequestError) {
			return reply.badRequest();
		}
		return reply.internalServerError();
	}
};

export const logout: RouteHandlerMethodTypebox<
	typeof refererQueryStringSchema
> = async (request, reply) => {
	const { server: instance } = request;
	const { auth_session: sessionId } = request.cookies;

	const { referer } = request.query;
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
