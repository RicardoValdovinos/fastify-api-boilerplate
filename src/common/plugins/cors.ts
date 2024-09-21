import FastifyCors, { type FastifyCorsOptions } from "@fastify/cors";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-cors 
 */
const cors: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const defaultCorsOptions: FastifyCorsOptions = {
		origin: instance.config.ALLOWED_ORIGINS.split(" "),
		methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
		hook: 'onRequest',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
		exposedHeaders: undefined,
		allowedHeaders: undefined,
		maxAge: undefined,
		preflight: false,
		strictPreflight: true
	}

	await instance.register(FastifyCors, defaultCorsOptions);
};

export default fp(cors, {
	name: "cors",
	dependencies: ["env"],
});
