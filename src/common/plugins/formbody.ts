import FastifyFormBody, {
	type FastifyFormbodyOptions,
} from "@fastify/formbody";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-formbody
 */
const formBody: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const defaultFormBodyOptions: FastifyFormbodyOptions = {
		bodyLimit: 1048576,
		//  parser: (stringValue) => yourCustomParser(stringValue)
	};

	await instance.register(FastifyFormBody, defaultFormBodyOptions);
};

export default fp(formBody, {
	name: "rate-limit",
});
