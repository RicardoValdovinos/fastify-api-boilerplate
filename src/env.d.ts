import type { Database } from "./config/database/index.ts";
import type { envSchemaType } from "./config/env.ts";

declare module "fastify" {
	interface FastifyInstance {
		config: envSchemaType;
		database: Database;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends envSchemaType {}
	}
}
