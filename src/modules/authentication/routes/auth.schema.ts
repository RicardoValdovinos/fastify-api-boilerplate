import { Type } from "@fastify/type-provider-typebox";
import type { FastifySchema } from "fastify";

export const refererQueryStringSchema = {
	querystring: Type.Object({
		referer: Type.String(),
	}),
} satisfies FastifySchema;

export const stateAndCodeQueryStringSchema = {
	querystring: Type.Object({
		state: Type.String(),
		code: Type.String(),
	}),
} satisfies FastifySchema;
