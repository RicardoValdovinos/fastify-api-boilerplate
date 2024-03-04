import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import fp from "fastify-plugin";
import type { FastifyTypebox } from "../../../common/types.js";
import { exampleInstance } from "../routes/example.route.js";

const routePluginWrapper: FastifyPluginAsyncTypebox = async (
	instance: FastifyTypebox
) => {
	await instance.register(exampleInstance, { prefix: "/api" });
};

export const exampleRoutes = fp(routePluginWrapper, { name: "example-routes" });
