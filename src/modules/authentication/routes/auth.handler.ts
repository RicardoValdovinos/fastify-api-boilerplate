import { generateState, OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { parseCookies, serializeCookie } from "oslo/cookie";
import { request as undiciRequest } from "undici";
import type { RouteHandlerMethodTypebox } from "../../../common/types.js";
import type { GetExampleByIdSchema, getExamplesSchema } from "./auth.schema.js";

export const auth: RouteHandlerMethodTypebox<typeof getExamplesSchema> = async (
	request,
	reply
): Promise<void> => {
	const { auth, config } = request.server;
	const state = generateState();
	const url = await auth.github.createAuthorizationURL(state);
	reply.statusCode = 302;
	reply.header("location", url.toString());
	reply.header(
		"Set-Cookie",
		serializeCookie("github_oauth_state", state, {
			httpOnly: true,
			secure: config.NODE_ENV === "production",
			maxAge: 60 * 10, // 10 minutes
			path: "/",
		})
	);
	return;
};

interface GitHubUserResult {
	id: number;
	login: string; // username
}

export const authCallback: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<void> => {
	const { auth, database } = request.server;
	const cookies = parseCookies(request.headers.cookie ?? "");
	const stateCookie = cookies.get("github_oauth_state") ?? null;

	const url = new URL(request.url);
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	// verify state
	if (!state || !stateCookie || !code || stateCookie !== state) {
		reply.status(400);
		return;
	}

	try {
		const tokens = await auth.github.validateAuthorizationCode(code);
		const githubUserResponse = await undiciRequest(
			"https://api.github.com/user",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			}
		);
		const githubUserResult =
			(await githubUserResponse.body.json()) as GitHubUserResult;

		const existingUser = await database
			.selectFrom("user")
			.where("github_id", "=", githubUserResult.id)
			.execute();

		if (existingUser) {
			const session = await auth.lucia.createSession(existingUser.id, {});
			const sessionCookie = auth.lucia.createSessionCookie(session.id);
			reply.statusCode = 302;
			reply.header("location", "/");
			reply.header("Set-Cookie", sessionCookie.serialize());
			return;
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		database.insertInto("user").values({
			id: userId,
			username: githubUserResult.login,
			githubId: githubUserResult.id,
		});

		const session = await auth.lucia.createSession(userId, {});
		const sessionCookie = auth.lucia.createSessionCookie(session.id);
		reply.statusCode = 302;
		reply.header("location", "/");
		reply.header("Set-Cookie", sessionCookie.serialize());
		return;
	} catch (error) {
		request.log.error(error);
		if (error instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			reply.statusCode = 400;
			return;
		}
		reply.statusCode = 500;
		return;
	}
};
