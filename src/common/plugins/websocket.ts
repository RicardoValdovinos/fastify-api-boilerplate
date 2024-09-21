import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import FastifyWebsocket, {
	type WebsocketPluginOptions,
} from "@fastify/websocket";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * https://github.com/fastify/fastify-websocket
 */
const websocket: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstance
): Promise<void> => {
	const options: WebsocketPluginOptions["options"] = {
		backlog: 511,
		clientTracking: true,
		handleProtocols: undefined,
		host: undefined,
		maxPayload: 104857600,
		noServer: false,
		perMessageDeflate: true,
		// port: undefined, // One and only one of the "port", "server", or "noServer" options must be specified
		// server: undefined, // One and only one of the "port", "server", or "noServer" options must be specified
		skipUTF8Validation: false,
		verifyClient: undefined,
		// WebSocket,
	};

	const defaultWebsocketOptions: WebsocketPluginOptions = {
		errorHandler: undefined,
		options,
		preClose: undefined,
	};

	await instance.register(FastifyWebsocket, defaultWebsocketOptions);
};

export default fp(websocket, {
	name: "rate-limit",
	dependencies: ["env"],
});
