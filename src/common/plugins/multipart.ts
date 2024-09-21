import FastifyMultipart, { type FastifyMultipartOptions } from "@fastify/multipart";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-multipart
 * */
const multipart: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance,
): Promise<void> => {
  const defaultMultipartOptions: FastifyMultipartOptions = {
    attachFieldsToBody: false,
    isPartAFile: undefined,
    limits: {
      fieldNameSize: 100,
      fieldSize: 1048576,   
      fields: Infinity,
      fileSize: Infinity,
      files: Infinity,
      headerPairs: 2000,
      parts: 81920
    },
    onFile: undefined,
    sharedSchemaId: undefined,
    throwFileSizeLimit: true,
  }

  await instance.register(FastifyMultipart, defaultMultipartOptions)
};

export default fp(multipart, {
	name: "rate-limit",
	dependencies: ["env"],
});
