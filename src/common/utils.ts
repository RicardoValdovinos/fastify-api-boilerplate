import type { FastifyInstance } from "fastify";
import { dirname } from "node:path";

export const runOnlyInDevelopment = (
	environment: FastifyInstance["config"]["NODE_ENV"],
	callback: () => void
): void => {
	if (environment.toLowerCase() !== "production") {
		callback();
	}
};

export const runOnlyInDevelopmentAsync = async (
	environment: FastifyInstance["config"]["NODE_ENV"],
	callback: () => Promise<void>
): Promise<void> => {
	if (environment.toLowerCase() !== "production") {
		await callback();
	}
};

export const getRootDirectory = (): string => {
	const currentWorkingDirectory = dirname(import.meta.dirname ?? "");
	const root = currentWorkingDirectory.substring(
		0,
		currentWorkingDirectory.lastIndexOf("/src")
	);
	return root;
};
