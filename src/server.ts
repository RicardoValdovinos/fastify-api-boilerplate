import Autoload from "@fastify/autoload";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import "dotenv/config";
import {
	fastify,
	type FastifyListenOptions,
	type FastifyServerOptions,
} from "fastify";
import path from "node:path";
import type { FastifyInstanceTypebox } from "./common/types.js";
import { logger } from "./configs/logger.js";

const serverOptions: FastifyServerOptions = {
	logger,
};

const server: FastifyInstanceTypebox =
	fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

await server.register(Autoload, {
	dir: path.normalize(path.join("common/plugins")),
});
await server.register(Autoload, {
	dir: path.normalize(path.join("modules")),
	matchFilter: "plugins",
});

closeWithGrace({ delay: 500 }, async ({ signal, err, manual }) => {
	if (err) {
		server.log.error({ err });
	} else {
		server.log.info(`closeWithGrace: signal=${signal}, manual=${manual}`);
	}

	await server.close();
});

const serverListenOptions: FastifyListenOptions = {
	port: server.config.PORT,
};

server.listen(serverListenOptions, (error) => {
	if (error) {
		server.log.error(`Error starting server: ${error.message}`);
	}
});
