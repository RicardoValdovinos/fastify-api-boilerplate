import { type Static, Type } from "@fastify/type-provider-typebox";

export const envSchema = Type.Object({
	NODE_ENV: Type.String({ default: "development" }),
	PORT: Type.Number({ default: 3000 }),
	DATABASE_URL: Type.String(),
	DATABASE_USER: Type.String(),
	DATABASE_PASSWORD: Type.String(),
	DATABASE_NAME: Type.String(),
	DATABASE_SERVER: Type.String(),
	GOOGLE_CLIENT_ID: Type.String(),
	GOOGLE_CLIENT_SECRET: Type.String(),
	GOOGLE_REDIRECT_URI: Type.String(),
	ALLOWED_ORIGINS: Type.String(),
});

export type envSchemaType = Static<typeof envSchema>;
