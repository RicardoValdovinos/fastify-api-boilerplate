import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import fp from "fastify-plugin";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { exampleInstance } from "../routes/example.route.js";
import { validateRequestSession } from "../../../common/hooks/validate-request-session.js";

const routePluginWrapper: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
): Promise<void> => {
	const innerPlugin: FastifyPluginAsyncTypebox = async (
		innerInstance: FastifyInstanceTypebox
	): Promise<void> => {
		innerInstance.addHook("preHandler", validateRequestSession);

		await innerInstance.register(exampleInstance, { prefix: "/api/example" });
	};

	instance.register(innerPlugin);
};

export default fp(routePluginWrapper, { name: "example-routes" });
