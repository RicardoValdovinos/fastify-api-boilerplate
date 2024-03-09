import type { SwaggerOptions } from "@fastify/swagger";
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerOptions: SwaggerOptions = {
	swagger: {
		info: {
			title: 'Test swagger',
			description: 'Testing the Fastify swagger API',
			version: '0.1.0'
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here'
		},
		host: 'localhost',
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
		tags: [
			{ name: 'user', description: 'User related end-points' },
			{ name: 'code', description: 'Code related end-points' }
		],
		definitions: {
			User: {
				type: 'object',
				required: ['id', 'email'],
				properties: {
					id: { type: 'string', format: 'uuid' },
					firstName: { type: 'string' },
					lastName: { type: 'string' },
					email: { type: 'string', format: 'email' }
				}
			}
		},
		securityDefinitions: {
			apiKey: {
				type: 'apiKey',
				name: 'apiKey',
				in: 'header'
			}
		}
	}
}

export const swaggerUIOptions: FastifySwaggerUiOptions = {
	routePrefix: '/documentation',
	uiConfig: {
		docExpansion: 'full',
		deepLinking: false
	},
	uiHooks: {
		onRequest: function(_request, _reply, next) { next() },
		preHandler: function(_request, _reply, next) { next() }
	},
	staticCSP: true,
	transformStaticCSP: (header) => header,
	transformSpecification: (swaggerObject) => { return swaggerObject },
	transformSpecificationClone: true
}
