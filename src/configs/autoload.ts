import type { AutoloadPluginOptions } from "@fastify/autoload";
import path from "path";
import { getRootDirectory } from "../common/utils.js";

export const moduleAutoloadOptions: AutoloadPluginOptions = {
	dir: path.join(getRootDirectory(), "src/modules/"),
	matchFilter: "plugins",
};

export const commonAutoloadOptions: AutoloadPluginOptions = {
	dir: path.join(getRootDirectory(), "src/common/plugins"),
};