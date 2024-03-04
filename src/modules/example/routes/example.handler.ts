import type { RouteHandlerMethodTypebox } from "../../../common/types.js";
import type {
	GetExampleByIdResponeType,
	GetExampleByIdSchema,
	getExamplesSchema,
} from "./example.schema.js";

export const getExamples: RouteHandlerMethodTypebox<
	typeof getExamplesSchema
> = async (_request, reply) => {
	void reply.header("Content-Type", "application/json; charset=utf-8");
	void reply.status(200);

	return { hello: "world" };
};

export const getExampleById: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;
	console.log(id);

	void reply.header("Content-Type", "application/json; charset=utf-8");
	void reply.status(200);

	return { hello: "" };
};
