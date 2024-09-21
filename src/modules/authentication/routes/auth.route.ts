import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import {
	authGoogle,
	authGoogleCallback,
	logout,
	verify,
} from "./auth.handler.js";
import {
	refererQueryStringSchema,
	stateAndCodeQueryStringSchema,
} from "./auth.schema.js";

export const authInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/google", { schema: refererQueryStringSchema }, authGoogle);
	instance.get(
		"/google/callback",
		{ schema: stateAndCodeQueryStringSchema },
		authGoogleCallback
	);
	instance.get("/logout", { schema: refererQueryStringSchema }, logout);
	instance.get("/verify", { schema: refererQueryStringSchema }, verify);
};
