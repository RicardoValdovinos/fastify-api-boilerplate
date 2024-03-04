import { type Static, Type } from "@fastify/type-provider-typebox";
import type { FastifySchema } from "fastify";

const GetExamplesResponse = Type.Object({
	hello: Type.String(),
});
export type GetExamplesResponeType = Static<typeof GetExamplesResponse>;
export const getExamplesSchema = {
	response: {
		200: {
			type: "object",
			properties: {
				hello: { type: "string" },
			},
		},
	},
} satisfies FastifySchema;

const GetExampleByIdResponse = Type.Object({
	hello: Type.String(),
});
export type GetExampleByIdResponeType = Static<typeof GetExampleByIdResponse>;
export const GetExampleByIdSchema = {
	params: Type.Object({
		id: Type.String(),
	}),
	response: {
		200: Type.Object({
			hello: Type.String(),
		}),
	},
} satisfies FastifySchema;
