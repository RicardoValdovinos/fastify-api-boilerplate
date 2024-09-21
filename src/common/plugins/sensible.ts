import Sensible from "@fastify/sensible";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-sensible
 */
const sensible: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	await instance.register(Sensible);
};

export default fp(sensible, {
	name: "sensible",
});
