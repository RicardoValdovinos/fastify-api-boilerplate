import type { FastifyEnvOptions } from "@fastify/env";
import { type Static, Type } from "@fastify/type-provider-typebox";

const envSchema = Type.Object({
	PORT: Type.Number({ default: 3000 }),
	DATABASE_NAME: Type.String({ default: "my_database" }),
	DATABASE_HOST: Type.String({ default: "localhost" }),
	DATABASE_USER: Type.String({ default: "admin" }),
	DATABASE_PASSWORD: Type.String(),
	DATABASE_PORT: Type.Number({ default: 5434 }),
});

export type envSchemaType = Static<typeof envSchema>;

export const envOptions: FastifyEnvOptions = {
	dotenv: true, // optional, default: false
	confKey: "config", // optional, default: 'config'
	schema: envSchema,
	data: process.env, // optional, default: process.env
};
