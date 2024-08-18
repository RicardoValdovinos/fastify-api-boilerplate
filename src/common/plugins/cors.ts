import Cors from "@fastify/cors";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * Enables the use of CORS in a Fastify application.
 * https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 */
const cors: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	await instance.register(Cors, {
		origin: false,
	});
};

export default fp(cors, {
	name: "cors",
});
