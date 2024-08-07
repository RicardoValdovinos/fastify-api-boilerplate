import Autoload from "@fastify/autoload";
import Cors from '@fastify/cors';
import Env from "@fastify/env";
import Sensible from '@fastify/sensible';
import Swagger from '@fastify/swagger';
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import UnderPressure from '@fastify/under-pressure';
import closeWithGrace from "close-with-grace";
import fastify, {
	type FastifyListenOptions,
	type FastifyServerOptions,
} from "fastify";
import fastifyPrintRoutes from "fastify-print-routes";
import type { FastifyInstanceTypebox } from "./common/types.js";
import { runOnlyInDevelopmentAsync } from "./common/utils.js";
import { moduleAutoloadOptions } from "./configs/autoload.js";
import { corsOptions } from "./configs/cors.js";
import { envOptions } from "./configs/env.js";
import { logger } from "./configs/logger.js";
import { swaggerOptions } from "./configs/swagger.js";
import { underPressureOptions } from "./configs/under-pressure.js";

const serverOptions: FastifyServerOptions = {
	logger,
};

const server: FastifyInstanceTypebox = fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

// It's very common to pass secrets and configuration
// to your application via environment variables.
// The `fastify-env` plugin will expose those configuration
// under `fastify.config` and validate those at startup.
await server.register(Env, envOptions);

// Fastify allows for easy swagger integration
await server.register(Swagger, swaggerOptions);

// Fastify is an extremely lightweight framework, it does very little for you.
// Every feature you might need, such as cookies or database coonnectors
// is provided by external plugins.
// See the list of recognized plugins  by the core team! https://fastify.dev/docs/latest/Guides/Ecosystem/
// `fastify-sensible` adds many  small utilities, such as nice http errors.
await server.register(Sensible)

// This plugin is especially useful if you expect an high load
// on your application, it measures the process load and returns
// a 503 if the process is undergoing too much stress.
await server.register(UnderPressure, underPressureOptions)

// Enables the use of CORS in a Fastify application.
// https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
await server.register(Cors, corsOptions)

// Normally you would need to load by hand each plugin. `fastify-autoload` is an utility
// we wrote to solve this specific problems. It loads all the content from the specified
// folder, even the subfolders. Take at look at its documentation, as it's doing a lot more!
// First of all, we require all the plugins that we'll need in our application.
// await server.register(Autoload, commonAutoloadOptions)
await server.register(Autoload, moduleAutoloadOptions)

// This function must run after @fastify/env is registered otherwise fastify will not
// be able to read NODE_ENV in the root .env file to determine whether the application
// is running in dev or production
await runOnlyInDevelopmentAsync(server, async () => { await server.register(fastifyPrintRoutes); })

const serverListenOptions: FastifyListenOptions = {
	port: server.config.PORT,
};

server.listen(serverListenOptions, (error) => {
	if (error) {
		server.log.error(`Error starting server: ${error.message}`);
	}
});

closeWithGrace({ delay: 500 }, async ({ signal, err, manual }) => {
	if (err) {
		server.log.error({ err });
	}

	server.log.info(`closeWithGrace: signal=${signal}, manual=${manual}`);
	await server.close();
});
