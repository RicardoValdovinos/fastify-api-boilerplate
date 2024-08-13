import Swagger, { type SwaggerOptions } from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import * as packageJson from '../../../package.json';

/**
 * Swagger documentation generator for Fastify.
 * It uses the schemas you declare in your routes to generate a swagger compliant doc.
 * https://github.com/fastify/fastify-swagger
 */
const swaggerGenerator: FastifyPluginAsync = async (instance: FastifyInstance) => {
  const swaggerOptions: SwaggerOptions = {
    swagger: {
      info: {
        title: 'Fastify URL Shortener',
        description: 'Fastify URL Shortener documentation',
        version: packageJson.default.version
      },
      externalDocs: {
        url: 'https://github.com/RicardoValdovinos/fastify-example',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json', 'text/html'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Bearer',
          in: 'header'
        },
        Csrf: {
          type: 'apiKey',
          name: 'x-csrf-token',
          in: 'header'
        }
      }
    },
  }

  await instance.register(Swagger, swaggerOptions)

  if (instance.config.NODE_ENV !== 'production') {
    await instance.register(SwaggerUI, {
      routePrefix: '/documentation'
    })
  }
}

export default fp(swaggerGenerator, {
  name: 'swaggerGenerator'
})
