import Helmet, { type FastifyHelmetOptions } from "@fastify/helmet";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
/**
 * https://github.com/fastify/fastify-helmet
 * https://helmetjs.github.io/
 */
const helmet: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const defaultHelmetOptions: FastifyHelmetOptions = {
		contentSecurityPolicy: {
			directives: {
				"default-src": ["'self'"],
				"base-uri": ["'self'"],
				"font-src": ["'self'", "https:", "data:"],
				"form-action": ["'self'"],
				"frame-ancestors": ["'self'"],
				"img-src": ["'self'", "data:"],
				"object-src": ["'none'"],
				"script-src": ["'self'"],
				"script-src-attr": ["'none'"],
				"style-src": ["'self'", "https:", "'unsafe-inline'"],
				"upgrade-insecure-requests": [],
			},
			reportOnly: false,
			useDefaults: true,
		},
		crossOriginEmbedderPolicy: {
			policy: "require-corp",
		},
		crossOriginOpenerPolicy: {
			policy: "same-origin",
		},
		crossOriginResourcePolicy: {
			policy: "same-origin",
		},
		originAgentCluster: true,
		referrerPolicy: {
			policy: "no-referrer",
		},
		strictTransportSecurity: {
			includeSubDomains: true,
			maxAge: 15552000,
			preload: false,
		},
		xContentTypeOptions: true,
		xDnsPrefetchControl: {
			allow: false,
		},
		xDownloadOptions: true,
		xFrameOptions: {
			action: "sameorigin",
		},
		xPermittedCrossDomainPolicies: {
			permittedPolicies: "none",
		},
		xPoweredBy: false,
		xXssProtection: false,
	};

	await instance.register(Helmet, defaultHelmetOptions);
};

export default fp(helmet, {
	name: "helmet",
});
