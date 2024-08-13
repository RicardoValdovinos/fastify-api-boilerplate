import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import UnderPressure from '@fastify/under-pressure';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

/**
 * This plugin is especially useful if you expect an high load
 * on your application, it measures the process load and returns
 * a 503 if the process is undergoing too much stress.
 */
const underPressure: FastifyPluginAsyncTypebox = async (
  instance: FastifyInstance
): Promise<void> => {
  await instance.register(UnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98,
  })
}

export default fp(underPressure, {
  name: 'under-pressure',
})
