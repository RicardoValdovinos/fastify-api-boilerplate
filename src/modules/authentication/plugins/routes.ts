import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import fp from "fastify-plugin";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { authInstance } from "../routes/auth.route.js";

const routePluginWrapper: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
): Promise<void> => {
	await instance.register(authInstance, { prefix: "/api" });
};

export default fp(routePluginWrapper, { name: "auth-routes" });
