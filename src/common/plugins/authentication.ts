import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Google } from "arctic";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { lucia } from "../../configs/authentication.js";

/**
 * https://github.com/lucia-auth/lucia
 * https://github.com/pilcrowonpaper/arctic
 */
const authentication: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const google = new Google(
		instance.config.GOOGLE_CLIENT_ID,
		instance.config.GOOGLE_CLIENT_SECRET,
		instance.config.GOOGLE_REDIRECT_URI
	);

	const auth = {
		lucia,
		google,
	};

	instance.decorate("auth", auth);
};

export default fp(authentication, {
	name: "authentication",
	dependencies: ["env"],
});
