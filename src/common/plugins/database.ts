import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { sql } from "kysely";
import { kysely } from "../../configs/database.js";

/**
 * https://github.com/kysely-org/kysely
 */
const database: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	instance.decorate("database", kysely);
	instance.decorate("sql", sql);
};

export default fp(database, {
	name: "database",
	dependencies: ["env"],
});
