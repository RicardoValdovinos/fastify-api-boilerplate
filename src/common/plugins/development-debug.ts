import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * Plugins that you only expect to run during development should be registered here
 */
const developmentDebug: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const environment = instance.config.NODE_ENV.toLowerCase();
	if (environment === "production") {
		return;
	}

	// await instance.register(dev_only_plugin_here);
};

export default fp(developmentDebug, {
	name: "developmentDebug",
	dependencies: ["env"],
});
