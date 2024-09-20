import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import FastifyRateLimit, { type RateLimitPluginOptions } from "@fastify/rate-limit";

const rateLimit: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance,
	_options: FastifyPluginOptions
): Promise<void> => {
  // https://github.com/fastify/fastify-rate-limit
  const defaultRateLimitOptions: RateLimitPluginOptions ={
    global : true,
    max: 1000,
    ban: -1,
    timeWindow: 1000 * 60,
    hook: 'onRequest',
    cache: 5000,
    allowList: [],
    redis: null,
    nameSpace: 'fastify-rate-limit-',
    continueExceeding: false,
    skipOnError: false,
    keyGenerator: (request) => request.ip,
    errorResponseBuilder: (_request, _context) => ({}),
    enableDraftSpec: false,
    addHeadersOnExceeding: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true
    },
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true
    }
  }

  await instance.register(FastifyRateLimit, defaultRateLimitOptions)
};

export default fp(rateLimit, {
	name: "rate-limit",
	dependencies: ["env"],
});
