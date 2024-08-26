import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { kysely } from "../../configs/database.js";

const database: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance,
	_options: FastifyPluginOptions
): Promise<void> => {
	instance.decorate("database", kysely);
};

export default fp(database, {
	name: "database",
	dependencies: ["env"],
});
