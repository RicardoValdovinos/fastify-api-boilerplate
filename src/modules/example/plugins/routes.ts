import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { hello, root } from "../routes/index.js";

const exampleInstance: FastifyPluginAsync = async (instance) => {
	instance.get("/", root);
	instance.get("/hello", hello);
};

export const exampleRoutes = fp(exampleInstance);
