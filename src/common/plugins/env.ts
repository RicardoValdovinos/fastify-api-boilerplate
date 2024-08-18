import { fastifyEnv } from "@fastify/env";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { envSchema } from "../../configs/env.js";

const env: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	await instance.register(fastifyEnv, {
		schema: envSchema,
		dotenv: true,
	});
};

export default fp(env, {
	name: "env",
});
