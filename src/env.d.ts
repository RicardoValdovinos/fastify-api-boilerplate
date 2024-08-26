import type { Kysely, Sql } from "kysely";
import type { envSchemaType } from "./configs/env.ts";
import { lucia } from "./configs/authentication.ts";
import { Google } from "arctic";

type Auth = {
	lucia: typeof lucia;
	google: Google;
};

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
