import fastify from "fastify";
import closeWithGrace from "close-with-grace";
import { exampleRoutes } from "./modules/example/plugins/routes.js";
// eslint-disable-next-line n/no-unpublished-import
import fastifyPrintRoutes from "fastify-print-routes";

const envToLogger = {
	development: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
	production: true,
	test: false,
};
const server = fastify({ logger: envToLogger["test"] ?? true });

/*
Since fastify-print-routes uses an onRoute hook, you have to either:

* use `await register...`
* wrap you routes definitions in a plugin

See: https://www.fastify.io/docs/latest/Guides/Migration-Guide-V4/#synchronous-route-definitions
*/
await server.register(fastifyPrintRoutes);

await server.register(exampleRoutes, { prefix: "/api" });

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
