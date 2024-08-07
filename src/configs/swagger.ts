import type { SwaggerOptions } from "@fastify/swagger";
import * as packageJson from "../../package.json";

export const swaggerOptions: SwaggerOptions = {
	swagger: {
		info: {
			title: "Fastify URL Shortener",
			description: "Fastify URL Shortener documentation",
			version: packageJson.default.version,
		},
		externalDocs: {
			url: "https://github.com/RicardoValdovinos/fastify-example",
			description: "Find more info here",
		},
		host: "localhost", // and your deployed url
		schemes: ["http", "https"],
		consumes: ["application/json"],
		produces: ["application/json", "text/html"],
		securityDefinitions: {
			Bearer: {
				type: "apiKey",
				name: "Bearer",
				in: "header",
			},
			Csrf: {
				type: "apiKey",
				name: "x-csrf-token",
				in: "header",
			},
		},
	},
};
