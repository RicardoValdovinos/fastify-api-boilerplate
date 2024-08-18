import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import pg, { type PoolConfig } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "../types.js";

const database: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance,
	_options: FastifyPluginOptions
): Promise<void> => {
	const poolConfig: PoolConfig = {
		connectionString: instance.config.DATABASE_URL,
		max: 10,
	};

	const pool = new pg.Pool(poolConfig);

	const dialect = new PostgresDialect({
		pool,
	});

	const database = new Kysely<DB>({ dialect });

	instance.decorate("database", database);
};

export default fp(database, {
	name: "database",
	dependencies: ["env"],
});
