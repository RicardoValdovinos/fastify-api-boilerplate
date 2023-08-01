import fastify from "fastify";

const server = fastify();

server.get("/ping", (): string => {
	return "pong\n";
});

server.listen({ port: 8080 }, (error, address) => {
	if (error) {
		throw new Error(error.message);
	}
	console.log(`Server listening at ${address}`);
});
