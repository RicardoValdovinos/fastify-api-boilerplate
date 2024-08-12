import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyPrintRoutes from "fastify-print-routes";

/**
 * Plugins that you only expect to run during development should be registered here
 */
const developmentDebug: FastifyPluginAsyncTypebox = async (
    instance: FastifyInstance,
): Promise<void> => {
    const environment = instance.config.NODE_ENV.toLowerCase();
    if (environment !== "production") {
		await instance.register(fastifyPrintRoutes);
	}
};

export default fp(developmentDebug, {
    name: "developmentDebug",
});