import Swagger, { type SwaggerOptions } from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const swaggerGenerator: FastifyPluginAsync = async (
	instance: FastifyInstance
) => {
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
			securityDefinitions: {
				
			},
		},
	};

	await instance.register(Swagger, swaggerOptions);

	if (instance.config.NODE_ENV !== "production") {
		await instance.register(SwaggerUI, {
			routePrefix: "/api/documentation",
		});
	}
};

export default fp(swaggerGenerator, {
	name: "swaggerGenerator",
	dependencies: ["env"],
});
