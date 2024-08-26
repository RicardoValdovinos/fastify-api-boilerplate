import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import {
	authGoogle,
	authGoogleCallback,
	logout,
	verify,
} from "./auth.handler.js";

export const authInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/google", authGoogle);
	instance.get("/google/callback", authGoogleCallback);
	instance.get("/logout", logout);
	instance.get("/verify", verify);
};
