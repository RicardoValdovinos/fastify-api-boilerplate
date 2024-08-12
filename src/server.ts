import Autoload from "@fastify/autoload";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import fastify, {
	type FastifyListenOptions,
	type FastifyServerOptions,
} from "fastify";
import path from "path";
import type { FastifyInstanceTypebox } from "./common/types.js";
import { getRootDirectory } from "./common/utils.js";
import { logger } from "./configs/logger.js";

const serverOptions: FastifyServerOptions = {
	logger,
};

const server: FastifyInstanceTypebox = fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

// Normally you would need to load by hand each plugin. `fastify-autoload` is an utility
// written to solve this specific problems. It loads all the content from the specified
// folder, even the subfolders. Take at look at its documentation, as it's doing a lot more!
// First of all, we require all the plugins that we'll need in our application.
await server.register(Autoload, {
	dir: path.join(getRootDirectory(), "src/common/plugins"),
})
await server.register(Autoload, {
	dir: path.join(getRootDirectory(), "src/modules/"),
	matchFilter: "plugins",
})

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
