import type { FastifyEnvOptions } from "@fastify/env";
import { Type } from "@fastify/type-provider-typebox";

const schema = Type.Object({
	PORT: Type.String({ default: "3000" }),
});

export const envOptions: FastifyEnvOptions = {
	dotenv: true, // optional, default: false
	confKey: "config", // optional, default: 'config'
	schema,
	data: process.env, // optional, default: process.env
};
