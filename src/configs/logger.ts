import type { FastifyServerOptions } from "fastify";

type LoggerOptions = FastifyServerOptions["logger"];

export const logger: LoggerOptions = {
	transport: {
		target: "pino-pretty",
		options: {
			translateTime: "HH:MM:ss Z",
			ignore: "pid,hostname",
		},
	},
};
