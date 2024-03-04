import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import fastify, { type FastifyListenOptions } from "fastify";
import { exampleRoutes } from "./modules/example/plugins/routes.js";
// eslint-disable-next-line n/no-unpublished-import
import fastifyPrintRoutes from "fastify-print-routes";
import fastifyEnv from "@fastify/env";
import { envOptions } from "./config/env.js";

const envToLogger = {
	transport: {
		target: "pino-pretty",
		options: {
			translateTime: "HH:MM:ss Z",
			ignore: "pid,hostname",
		},
	},
};

const server = fastify({
	logger: envToLogger,
}).withTypeProvider<TypeBoxTypeProvider>();

/*
Since fastify-print-routes uses an onRoute hook, you have to either:

* use `await register...`
* wrap you routes definitions in a plugin

See: https://www.fastify.io/docs/latest/Guides/Migration-Guide-V4/#synchronous-route-definitions
*/
await server.register(fastifyPrintRoutes);

await server.register(fastifyEnv, envOptions);
await server.register(exampleRoutes, { prefix: "/api" });

const serverListenOptions: FastifyListenOptions = {
	port: 3000,
};

server.listen(serverListenOptions, (error, address) => {
	if (error) {
		server.log.error(`Error starting server: ${error.message}`);
	}

	server.log.info(`Server listening at ${address}`);
});

closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
	if (err) {
		server.log.error(err);
	}

	server.log.info(`closeWithGrace: signal=${signal}, manual=${manual}`);
	await server.close();
});
