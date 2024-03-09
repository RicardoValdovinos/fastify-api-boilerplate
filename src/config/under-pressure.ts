import type { UnderPressureOptions } from "@fastify/under-pressure";

export const underPressureOptions: UnderPressureOptions = {
	maxEventLoopDelay: 1000,
	message: 'Under pressure!',
	retryAfter: 50
}
