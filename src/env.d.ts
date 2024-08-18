import type { Kysely } from "kysely";
import type { envSchemaType } from "./configs/env.ts";

declare module "fastify" {
	interface FastifyInstance {
		config: envSchemaType;
		database: Kysely<DB>;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends envSchemaType {}
	}
}
