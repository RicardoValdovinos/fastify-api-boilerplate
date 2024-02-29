import type { FastifyRequest, RouteHandlerMethod } from "fastify";
import { Auth } from "@auth/core";
import type { IncomingHttpHeaders } from "node:http";

const fastifyHeadersToRequestHeaders = (
	fastifyHeaders: IncomingHttpHeaders
): HeadersInit => {
	const headers: HeadersInit = new Headers();
	for (const [key, value] of Object.entries(fastifyHeaders)) {
		if (value === undefined) {
			continue;
		}

		if (!Array.isArray(value)) {
			headers.set(key, value);
			continue;
		}

		value.forEach((v) => {
			if (headers.get(key)) {
				headers.append(key, v);
			} else {
				headers.set(key, v);
			}
		});
	}

	return headers;
};

type RequestBody = BodyInit | null | undefined;
const fastifyRequestAuthWrapper = (fastifyRequest: FastifyRequest): Request => {
	const url = fastifyRequest.url;
	const headersInit = fastifyHeadersToRequestHeaders(fastifyRequest.headers);
	const requestBody = fastifyRequest.body as RequestBody;
	const requestInit: RequestInit = {
		method: fastifyRequest.method,
		headers: headersInit,
		body: requestBody,
	};
	const request: Request = new Request(url, requestInit);
	console.log(request);
	return request;
};

export const auth: RouteHandlerMethod = async (request) => {
	console.log(fastifyRequestAuthWrapper(request));
	const response = await Auth(fastifyRequestAuthWrapper(request), {
		providers: [],
		secret: "...",
		trustHost: true,
	});
	return response;
};
