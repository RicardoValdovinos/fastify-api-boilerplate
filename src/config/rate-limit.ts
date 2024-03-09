import type { RateLimitOptions } from "@fastify/rate-limit";

export const rateLimitOptions: RateLimitOptions = {
	max: 1000,
	ban: -1,
	timeWindow: 1000 * 60,
	hook: 'onRequest',
	cache: 5000,
	allowList: [],
	continueExceeding: false,
	skipOnError: false,
}
