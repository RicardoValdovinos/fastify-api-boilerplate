import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://day.js.org/en/
 *
 * Extend dayjs functionality via plugins: https://day.js.org/docs/en/plugin/plugin
 *
 */
const day: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	instance.decorate("dayjs", dayjs);
};

export default fp(day, {
	name: "day",
});
