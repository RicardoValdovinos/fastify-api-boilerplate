import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { getExampleById, getExamples } from "./example.handler.js";

export const exampleInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/example", getExamples);
	instance.get("/example/:id", getExampleById);
};
