import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { exampleInstance } from "../routes/example.js";

const routePluginWrapper: FastifyPluginAsync = async (instance) => {
	await instance.register(exampleInstance, { prefix: "/api" });
};

export const exampleRoutes = fp(routePluginWrapper, { name: "example-routes" });
