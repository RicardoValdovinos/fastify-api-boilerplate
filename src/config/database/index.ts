import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DatabaseSchema } from "./schema.js";

const dialect = new PostgresDialect({
	pool: new Pool({
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		port: process.env.DATABASE_PORT,
		max: 10,
	}),
});

export const database = new Kysely<DatabaseSchema>({
	dialect,
});

export type Database = typeof database;
