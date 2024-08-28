import type { FastifyInstance } from "fastify";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
