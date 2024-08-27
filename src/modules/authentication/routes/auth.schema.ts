import { Type } from "@fastify/type-provider-typebox";
import type { FastifySchema } from "fastify";

export const refererQueryString = {
	querystring: Type.Object({
		referer: Type.String(),
	}),
} satisfies FastifySchema;

export const stateAndCodeQueryString = {
	querystring: Type.Object({
		state: Type.String(),
		code: Type.String(),
	}),
} satisfies FastifySchema;