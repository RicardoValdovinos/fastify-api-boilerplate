import { type Static, Type } from "@fastify/type-provider-typebox";
import type { FastifySchema } from "fastify";

const GetPersonsResponse = Type.Array(
	Type.Object({
		id: Type.Number(),
		email: Type.String(),
		"first_name": Type.String(),
		"last_name": Type.String(),
		address: Type.Union([Type.Null(), Type.String()]),
		phone: Type.Union([Type.Null(), Type.String()]),
		"date_added": Type.String(),
	})
);
export type GetPersonsResponeType = Static<typeof GetPersonsResponse>;
export const getPersonsSchema = {
	response: {
		200: GetPersonsResponse,
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
