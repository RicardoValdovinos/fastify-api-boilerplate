import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import fp from "fastify-plugin";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { exampleInstance } from "../routes/example.route.js";

const routePluginWrapper: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
): Promise<void> => {
	await instance.register(exampleInstance, { prefix: "/api" });
};

export default fp(routePluginWrapper, { name: "example-routes" });
