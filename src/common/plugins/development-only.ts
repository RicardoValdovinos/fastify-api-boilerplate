import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * Plugins that should only run during development should be registered here
 */
const developmentOnly: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const environment = instance.config.NODE_ENV.toLowerCase();
	if (environment === "production") {
		return;
	}

	await instance.register(async (innerInstance) => {
		innerInstance.log.info("Example development plugin registered!");
	});
};

export default fp(developmentOnly, {
	name: "development-only",
	dependencies: ["env"],
});
