import fastifyEnv from '@fastify/env';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { envSchema } from '../../configs/env.js';



/**
 * It's very common to pass secrets and configuration
 * to your application via environment variables.
 * The `fastify-env` plugin will expose those configuration
 * under `fastify.config` and validate those at startup.
 */
const env: FastifyPluginAsyncTypebox = async (
  instance: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> => {
  await instance.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
    ...options
  })
}


export default fp(env, {
  name: 'env',
})




