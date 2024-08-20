import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { auth, authCallback } from "./auth.handler.js";

export const authInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/oauth", auth);
	instance.get("/oauth/callback", authCallback);
};
