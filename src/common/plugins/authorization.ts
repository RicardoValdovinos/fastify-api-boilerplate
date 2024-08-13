import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type {
  FastifyInstance,
  FastifyPluginOptions
} from "fastify";
import fp from "fastify-plugin";

const authorization: FastifyPluginAsyncTypebox = async (
  instance: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> => {
  instance.log.info({ version: instance.version, options })
};

export default fp(authorization, {
  name: "authorization",
});