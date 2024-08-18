import Helmet from "@fastify/helmet";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const helmet: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	await instance.register(Helmet);
};

export default fp(helmet, {
	name: "helmet",
});
