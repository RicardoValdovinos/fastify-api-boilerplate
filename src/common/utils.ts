import type { FastifyInstance } from "fastify";
import { dirname } from "node:path";

export const runOnlyInDevelopment = (
	instance: FastifyInstance,
	callback: () => void
): void => {
	if (instance.config.NODE_ENV.toLowerCase() !== "production") {
		callback();
	}
};

export const runOnlyInDevelopmentAsync = async (
	instance: FastifyInstance,
	callback: () => Promise<void>
): Promise<void> => {
	if (instance.config.NODE_ENV.toLowerCase() !== "production") {
		await callback();
	}
};

export const getRootDirectory = (): string => {
	const currentWorkingDirectory = dirname(import.meta.dirname ?? "")
	const root = currentWorkingDirectory.substring(0, currentWorkingDirectory.lastIndexOf("/src"))
	return root
}
