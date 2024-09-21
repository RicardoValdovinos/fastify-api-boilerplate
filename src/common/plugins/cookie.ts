import FastifyCookie, {
	type CookieSerializeOptions,
	type FastifyCookieOptions,
} from "@fastify/cookie";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-cookie
 */
const cookie: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const defaultCookieSerializeOptions: CookieSerializeOptions = {};

	const defaultCookieOptions: FastifyCookieOptions = {
		secret: undefined,
		hook: "onRequest",
		algorithm: "sha256",
		parseOptions: defaultCookieSerializeOptions,
	};

	await instance.register(FastifyCookie, defaultCookieOptions);
};

export default fp(cookie, {
	name: "cookie",
});
