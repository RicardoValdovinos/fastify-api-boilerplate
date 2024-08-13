import type { FastifyServerOptions } from "fastify";
import path from "node:path";
import { getRootDirectory } from "../common/utils.js";

type LoggerOptions = NonNullable<FastifyServerOptions["logger"]>;

const options: LoggerOptions = {}; // eslint-disable-line @typescript-eslint/no-unused-vars

type LoggerTransportOptions = (typeof options)["transport"];
type LoggerTransportSingleOptions = Extract<
	LoggerTransportOptions,
	{ target: string }
>;

const logsDirectory = path.join(getRootDirectory(), "logs");
const logFileName = new Date().toISOString();

const fileTransport: LoggerTransportSingleOptions = {
	target: "pino/file",
	options: {
		destination: `${logsDirectory}/${logFileName}`,
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

const getLoggerForEnvironment = (environment: string): LoggerOptions => {
	if (environment === "development") {
		const developmentLogger: LoggerOptions = {
			transport: {
				targets: [pinoPrettyTransport],
			},
		};
		return developmentLogger;
	}

	if (environment === "production") {
		const productionLogger: LoggerOptions = {
			timestamp: () => `",timestamp":"${new Date(Date.now()).toISOString()}"`,
			transport: {
				targets: [fileTransport],
			},
		};
		return productionLogger;
	}

	return false;
};

export const logger: LoggerOptions = getLoggerForEnvironment(
	process.env.NODE_ENV.toLowerCase()
);
