import { type Static, Type } from "@fastify/type-provider-typebox";

export const envSchema = Type.Object({
	NODE_ENV: Type.String({ default: "development" }),
	PORT: Type.Number({ default: 3000 }),
	COOKIE_SECRET: Type.String(),
	ALLOWED_USERS: Type.String(),
});

export type envSchemaType = Static<typeof envSchema>;
