import Sensible from '@fastify/sensible';
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * Fastify is an extremely lightweight framework, it does very little for you.
 * Every feature you might need, such as cookies or database coonnectors
 * is provided by external plugins.
 * See the list of recognized plugins  by the core team! https://fastify.dev/docs/latest/Guides/Ecosystem/
 * `fastify-sensible` adds many  small utilities, such as nice http errors.
 */
const sensible: FastifyPluginAsyncTypebox = async (
    instance: FastifyInstance,
): Promise<void> => {
    await instance.register(Sensible)
};

export default fp(sensible, {
    name: "sensible",
});