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
import { fileURLToPath } from "node:url";
import type { FastifyInstanceTypebox } from "./common/types.js";
import { logger } from "./configs/logger.js";

const serverOptions: FastifyServerOptions = {
	logger,
};

const server: FastifyInstanceTypebox =
	fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await server.register(Autoload, {
	dir: path.normalize(path.join(__dirname, "common/plugins")),
});
await server.register(Autoload, {
	dir: path.normalize(path.join(__dirname, "modules")),
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
