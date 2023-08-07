import fp from "fastify-plugin";

export const exampleRoutes = fp((fastify, _options, done) => {
	fastify.get("/", (_request, reply) => {
		void reply.header("Content-Type", "application/json; charset=utf-8");
		void reply.status(200);
		return { hello: "world" };
	});
	done();
});
export default exampleRoutes;
