import { type Static, Type } from "@fastify/type-provider-typebox";
import type { FastifySchema } from "fastify";

const GetExamplesResponse = Type.Object({
	hello: Type.String(),
});
export type GetExamplesResponeType = Static<typeof GetExamplesResponse>;
export const getExamplesSchema = {
	response: {
		200: GetExamplesResponse,
	},
} satisfies FastifySchema;

const GetExampleByIdResponse = Type.Object({
	hello: Type.String(),
});
export type GetExampleByIdResponeType = Static<typeof GetExampleByIdResponse>;
export const GetExampleByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: {
		200: GetExampleByIdResponse,
	},
} satisfies FastifySchema;
