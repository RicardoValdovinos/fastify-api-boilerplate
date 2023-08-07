import fastify from "fastify";

const server = fastify();

void server.register(import("./modules/example/route"));

server.listen({ port: 3000 }, (error, address) => {
	if (error) {
		throw new Error(`Error starting server: ${error.message}`);
	}
	console.log(`Server listening at ${address}`);
});
