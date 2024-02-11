import fastify from "fastify";
import closeWithGrace from "close-with-grace";
import { exampleRoutes } from "./modules/example/plugins/routes.js";

const server = fastify();

void server.register(exampleRoutes);

server.listen({ port: 3000 }, (error, address) => {
	if (error) {
		console.error(`Error starting server: ${error.message}`);
	}

	console.log(`Server listening at ${address}`);
});

closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
	if (err) {
		console.error(err);
	}

	console.log(`closeWithGrace: signal=${signal}, manual=${manual}`);
	await server.close();
});
