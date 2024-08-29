import type { FastifyServerOptions } from "fastify";
import path, { normalize } from "node:path";
import { fileURLToPath } from "node:url";

type LoggerOptions = NonNullable<FastifyServerOptions["logger"]>;

const options: LoggerOptions = {}; // eslint-disable-line @typescript-eslint/no-unused-vars

type LoggerTransportOptions = (typeof options)["transport"];
type LoggerTransportSingleOptions = Extract<
	LoggerTransportOptions,
	{ target: string }
>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDirectory = path.join(__dirname, "logs");
const logFileName = new Date().toISOString();
const logPath = normalize(path.join(logsDirectory, logFileName));

const fileTransport: LoggerTransportSingleOptions = {
	target: "pino/file",
	options: {
		destination: logPath,
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
