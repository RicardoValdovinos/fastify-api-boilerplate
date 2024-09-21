import dayjs from "dayjs";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-caching
 * Note: the default cache should not be used in a "production" environment.
 * It is an LRU, in-memory cache that is capped at 100,000 items.
 * It is highly recommended that a full featured cache object be supplied, e.g. https://github.com/jsumners/abstract-cache-redis
 */
const cache: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	instance.decorate("dayjs", dayjs);
};

export default fp(cache, {
	name: "day",
});
