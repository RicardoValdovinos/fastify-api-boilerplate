import type { FastifyServerOptions } from "fastify";
import type { PinoLoggerOptions } from "fastify/types/logger.js";
import path from "path";
import { getRootDirectory } from "../common/utils.js";

type LoggerOptions = FastifyServerOptions["logger"];

type LoggerTransportOptions = PinoLoggerOptions["transport"];
type LoggerTransportSingleOptions = Extract<
	LoggerTransportOptions,
	{ target: string }
>;

const fileTransport: LoggerTransportSingleOptions = {
	target: "pino/file",
	options: {
		destination: `${path.join(getRootDirectory(), "logs")}-${new Date().toISOString()}`,
		mkdir: true,
	},
};

const pinoPrettyTransport: LoggerTransportSingleOptions = {
	target: "pino-pretty",
	options: {
		translateTime: "HH:MM:ss Z",
		ignore: "pid,hostname",
	},
};

export const logger: LoggerOptions = {
	transport: {
		targets: [fileTransport, pinoPrettyTransport],
	},
};
