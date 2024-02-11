import type { RouteHandlerMethod } from "fastify";

export const root: RouteHandlerMethod = async (_request, reply) => {
	void reply.header("Content-Type", "application/json; charset=utf-8");
	void reply.status(200);
	return { hello: "world" };
};

export const hello: RouteHandlerMethod = async (_request, reply) => {
	void reply.header("Content-Type", "application/json; charset=utf-8");
	void reply.status(200);
	return { hello: "world" };
};
