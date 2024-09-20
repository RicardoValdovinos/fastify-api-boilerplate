import FastifyCookie, { type CookieSerializeOptions, type FastifyCookieOptions } from "@fastify/cookie";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const cookie: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	// https://github.com/fastify/fastify-cookie
	const defaultCookieSerializeOptions: CookieSerializeOptions = {

	}

	const defaultCookieOptions: FastifyCookieOptions = {
		secret: undefined,
		hook: "onRequest",
		algorithm: undefined,
		parseOptions: defaultCookieSerializeOptions
	}
	
	await instance.register(FastifyCookie, defaultCookieOptions);
};

export default fp(cookie, {
	name: "cookie",
});
