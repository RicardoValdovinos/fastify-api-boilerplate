import type { Kysely } from "kysely";
import type { Auth } from "./configs/authentication.ts";
import type { envSchemaType } from "./configs/env.ts";

declare module "fastify" {
	interface FastifyInstance {
		config: envSchemaType;
		database: Kysely<DB>;
		auth: Auth;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends envSchemaType {}
	}
}
