import fastifyEnv from "@fastify/env";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import fastify, {
	type FastifyListenOptions,
	type FastifyServerOptions,
} from "fastify";
import { exampleRoutes } from "./modules/example/plugins/routes.js";
// eslint-disable-next-line n/no-unpublished-import
import fastifyPrintRoutes from "fastify-print-routes";
import type { FastifyTypebox } from "./common/types.js";
import { envOptions } from "./config/env.js";
import { logger } from "./config/logger.js";
import { database } from "./config/database.js";

const serverOptions: FastifyServerOptions = {
	logger,
};

const server: FastifyTypebox =
	fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

/*
Since fastify-print-routes uses an onRoute hook, you have to either:

* use `await register...`
* wrap you routes definitions in a plugin

See: https://www.fastify.io/docs/latest/Guides/Migration-Guide-V4/#synchronous-route-definitions
*/
await server.register(fastifyPrintRoutes);

await server.register(fastifyEnv, envOptions);
await server.register(exampleRoutes);

server.decorate("database", database);

const serverListenOptions: FastifyListenOptions = {
	port: server.config.PORT,
};

server.listen(serverListenOptions, (error) => {
	if (error) {
		server.log.error(`Error starting server: ${error.message}`);
	}
});

closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
	if (err) {
		server.log.error({ err });
	}

	server.log.info(`closeWithGrace: signal=${signal}, manual=${manual}`);
	await server.close();
});
