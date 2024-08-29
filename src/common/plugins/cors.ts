import Cors from "@fastify/cors";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const cors: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	await instance.register(Cors, {
		origin: instance.config.ALLOWED_ORIGINS.split(" "),
		credentials: true,
	});
};

export default fp(cors, {
	name: "cors",
	dependencies: ["env"],
});
