import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import type { DB } from "../common/types.js";

export const sqlite = new SQLite("db.sqlite");

const dialect = new SqliteDialect({
	database: sqlite,
});

export const kysely = new Kysely<DB>({ dialect });
