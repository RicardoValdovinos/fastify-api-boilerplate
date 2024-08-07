import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { getExampleById, getExamples } from "./example.handler.js";
import { GetExampleByIdSchema, getExamplesSchema } from "./example.schema.js";

export const exampleInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/example", { schema: getExamplesSchema }, getExamples);
	instance.get(
		"/example/:id",
		{ schema: GetExampleByIdSchema },
		getExampleById
	);
};