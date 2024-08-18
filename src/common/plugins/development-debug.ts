import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * Plugins that should only run during development should be registered here
 */
const developmentDebug: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const environment = instance.config.NODE_ENV.toLowerCase();
	if (environment === "production") {
		return;
	}

	await instance.register((instance) => {
		instance.log.info("Example development plugin registered!");
	});
};

export default fp(developmentDebug, {
	name: "developmentDebug",
	dependencies: ["env"],
});
