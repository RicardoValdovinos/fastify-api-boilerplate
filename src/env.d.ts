import type { Kysely, Sql } from "kysely";
import type { Auth } from "./configs/authentication.ts";
import type { envSchemaType } from "./configs/env.ts";

declare module "fastify" {
	interface FastifyInstance {
		config: envSchemaType;
		database: Kysely<DB>;
		sql: Sql;
		auth: Auth;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends envSchemaType {}
	}
}
