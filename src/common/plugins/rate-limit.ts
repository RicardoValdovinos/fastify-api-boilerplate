import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import fp from 'fastify-plugin'
import type { FastifyInstanceTypebox } from '../types.js'

/**
 * When exposing an application to the public internet, it's a good
 * approach to add a rate limiter to disallow excessive usage.
 * A rate limiter will save resources and based on the configuration
 * help you identify malicious users.
 *
 * Usually one of the best suited databases for storing rate limit data
 * is Redis, due to its speed and the simple nature of the store data.
 * In this case we will reuse Elasticsearch, to avoid increase the complexity
 * of the codebase and the cost of the infrastructure.
 * Fastify offers a simple yet powerful plugin for handling rate limiting,
 * named `fastify-rate-limit`. Unfortunately Elasticsearch is not part
 * of the officially supported stores, so we'll write a custom one.
 */
const rateLimit: FastifyPluginAsyncTypebox = async (
  instance: FastifyInstanceTypebox
) => {
  console.log(instance.version)
}


export default fp(rateLimit, {
  name: 'rateLimit',
})
