import type { envSchemaType } from "./configs/env.ts";

declare module "fastify" {
	interface FastifyInstance {
		config: envSchemaType;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends envSchemaType {}
	}
}
