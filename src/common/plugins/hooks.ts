import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { defaultContentType } from "../hooks/default-content-type.js";

/**
 * Register common hooks here
 */
const hooks: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	instance.addHook("preHandler", defaultContentType);
};

export default fp(hooks, {
	name: "hooks",
});
