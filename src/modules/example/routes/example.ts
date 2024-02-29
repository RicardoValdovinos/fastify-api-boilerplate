import type { FastifyPluginAsync } from "fastify";
import { hello, root } from "../routes/index.js";
import { auth } from "../routes/auth.js";

export const exampleInstance: FastifyPluginAsync = async (instance) => {
	instance.get("/", root);
	instance.get("/hello", hello);
	instance.get("/auth", auth);

	instance.post("/auth", auth);
};
