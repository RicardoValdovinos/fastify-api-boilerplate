import FastifySwagger, { type SwaggerOptions } from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-swagger
 */
const swagger: FastifyPluginAsync = async (
	instance: FastifyInstance
): Promise<void> => {
	const swaggerOptions: SwaggerOptions = {
		swagger: {
			info: {
				title: "Fastify API Boilerplate",
				description: "Fastify API Boilerplate documentation",
				version: "1.0.0",
			},
			externalDocs: {
				url: "https://github.com/RicardoValdovinos/Fastify API Boilerplate",
				description: "Find more info here",
			},
			host: "localhost",
			schemes: ["http", "https"],
			consumes: ["application/json"],
			produces: ["application/json", "text/html"],
			securityDefinitions: {},
		},
	};

	await instance.register(FastifySwagger, swaggerOptions);

	if (instance.config.NODE_ENV !== "production") {
		await instance.register(FastifySwaggerUI, {
			routePrefix: "/api/documentation",
		});
	}
};

export default fp(swagger, {
	name: "swagger",
	dependencies: ["env"],
});
