import { preHandlerAsyncHookHandler } from "fastify";

export const validateRequestSession: preHandlerAsyncHookHandler = async (
	request,
	reply
) => {
	const { server: instance } = request;
	const { auth_session: sessionId } = request.cookies;

	if (!sessionId) {
		return reply.unauthorized();
	}

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
};
