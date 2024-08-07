import type { UnderPressureOptions } from "@fastify/under-pressure";

export const underPressureOptions: UnderPressureOptions = {
	maxEventLoopDelay: 1000,
	maxHeapUsedBytes: 1000000000,
	maxRssBytes: 1000000000,
	maxEventLoopUtilization: 0.98,
};
