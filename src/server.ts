import Autoload from "@fastify/autoload";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import {
	fastify,
	type FastifyListenOptions,
	type FastifyServerOptions,
} from "fastify";
import path from "node:path";
import type { FastifyInstanceTypebox } from "./common/types.js";
import { getRootDirectory } from "./common/utils.js";
import { logger } from "./configs/logger.js";

const serverOptions: FastifyServerOptions = {
	logger,
};

const server: FastifyInstanceTypebox =
	fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

await server.register(Autoload, {
	dir: path.join(getRootDirectory(), path.normalize("src/common/plugins")),
});
await server.register(Autoload, {
	dir: path.join(getRootDirectory(), path.normalize("src/modules/")),
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
