import Cors from "@fastify/cors";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const cors: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	await instance.register(Cors, {
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
		credentials: true
	});
};

export default fp(cors, {
	name: "cors",
});
