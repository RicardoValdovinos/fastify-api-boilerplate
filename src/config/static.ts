import type { FastifyStaticOptions } from "@fastify/static";
import { __dirname } from "../common/utils.js";
import path from "node:path"

export const fastifyStaticOptions: FastifyStaticOptions = {
	root: path.join(__dirname, 'public'),
	prefix: '/public/', // optional: default '/'
	constraints: { host: 'example.com' } // optional: default {}
}
