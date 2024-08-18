import type { RouteHandlerMethodTypebox } from "../../../common/types.js";
import type {
	GetExampleByIdResponeType,
	GetExampleByIdSchema,
	GetExamplesResponeType,
	getExamplesSchema,
} from "./example.schema.js";

export const getExamples: RouteHandlerMethodTypebox<
	typeof getExamplesSchema
> = async (_request, reply): Promise<GetExamplesResponeType> => {
	reply.header("Content-Type", "application/json; charset=utf-8");
	reply.status(200);

	return { hello: "world" };
};

export const getExampleById: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	reply.header("Content-Type", "application/json; charset=utf-8");
	reply.status(200);

	return { hello: `Your id is ${id}` };
};
