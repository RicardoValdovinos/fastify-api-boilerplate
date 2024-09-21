import type { Kysely, Sql } from "kysely";
import type { envSchemaType } from "./configs/env.ts";
import type { lucia } from "./configs/authentication.ts";
import type { Google } from "arctic";
import type { DB } from "./common/types.ts";
import type dayjs from "dayjs";

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
		dayjs: typeof dayjs;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends envSchemaType {}
	}
}
