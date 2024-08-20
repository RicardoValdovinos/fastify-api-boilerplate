import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { Kysely, SqliteDialect } from "kysely";
import { sqlite } from "../../configs/database.js";
import type { DB } from "../types.js";

const database: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance,
	_options: FastifyPluginOptions
): Promise<void> => {
	const dialect = new SqliteDialect({
		database: sqlite,
	});

	const database = new Kysely<DB>({ dialect });

	instance.decorate("database", database);
};

export default fp(database, {
	name: "database",
	dependencies: ["env"],
});
