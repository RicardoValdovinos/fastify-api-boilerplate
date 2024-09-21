import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import FastifyUnderPressure, { type FastifyUnderPressureOptions } from "@fastify/under-pressure";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/under-pressure
 */
const underPressure: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
  const defaultUnderPressureOptions: FastifyUnderPressureOptions = {
    // customError: new Error(""),
    exposeStatusRoute: "/status",
    // healthCheck: async (_healthCheckInstance) => {return true },
    healthCheckInterval: -1,
    maxEventLoopDelay: 0,
    maxEventLoopUtilization:0,
    maxHeapUsedBytes: 0,
    maxRssBytes: 0,
    // message: 'Under pressure!',
    // pressureHandler: (request, reply, type, value) => {},
    sampleInterval: 10,
    retryAfter: 10,
  }

	await instance.register(FastifyUnderPressure, defaultUnderPressureOptions);
};

export default fp(underPressure, {
	name: "cors",
	dependencies: ["env"],
});
