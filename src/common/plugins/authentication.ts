import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { auth } from "../../configs/authentication.js";

const authentication: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	instance.decorate("auth", auth);
};

export default fp(authentication, {
	name: "authentication",
});
