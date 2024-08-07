import type { FastifyEnvOptions } from "@fastify/env";
import { type Static, Type } from "@fastify/type-provider-typebox";

const envSchema = Type.Object({
	NODE_ENV: Type.String({ default: "development" }),
	PORT: Type.Number({ default: 3000 }),
	ELASTIC_CLOUD_ID: Type.Optional(Type.String()),
	ELASTIC_ADDRESS: Type.Optional(Type.String()),
	ELASTIC_API_KEY: Type.String(),
	GITHUB_APP_ID: Type.String(),
	GITHUB_APP_SECRET: Type.String(),
	COOKIE_SECRET: Type.String(),
	ALLOWED_USERS: Type.String(),
});

export type envSchemaType = Static<typeof envSchema>;

export const envOptions: FastifyEnvOptions = {
	schema: envSchema,
	dotenv: true
};