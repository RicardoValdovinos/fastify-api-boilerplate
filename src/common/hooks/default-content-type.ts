import type { preHandlerAsyncHookHandler } from "fastify";

export const defaultContentType: preHandlerAsyncHookHandler = async (
	_request,
	reply
) => {
	reply.headers({ "content-type": "application/json; charset=utf-8" });
};
