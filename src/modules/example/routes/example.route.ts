import type { FastifyPluginAsync } from "fastify";
import type { FastifyTypebox } from "../../../common/types.js";
import { getExampleById, getExamples } from "./example.handler.js";
import { GetExampleByIdSchema, getExamplesSchema } from "./example.schema.js";

export const exampleInstance: FastifyPluginAsync = async (
	instance: FastifyTypebox
) => {
	instance.get("/examples", { schema: getExamplesSchema }, getExamples);
	instance.get(
		"/example/:id",
		{ schema: GetExampleByIdSchema },
		getExampleById
	);
};
