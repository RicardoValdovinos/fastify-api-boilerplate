import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
