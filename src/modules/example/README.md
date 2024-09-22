# src/modules/example

## Overview

This example module provides 3 directories. One for tests. Another for api routes definitions. And lastly a directory for plugin registrations.

## plugins

The `plugins` directory, like `src/common`, is setup to automatically register plugins via [fastify-autoload](https://github.com/fastify/fastify-autoload). In the case of this example it automatically registers the routes plugin containing route endpoints and route validation schemas for each given endpoint.

## routes

The routes directory contains 3 files. A file for the route definitions, `example.route.ts`. A file for the functions that handle the incoming request for a given route definition, `example.handler.ts`. And finally, a file for the schemas for each route definition, `example.shema.ts`.

### Additional routes Information

`example.route.ts` uses shorthand declarations for each route.

- `fastify.get(url, options, handler)` vs `fastify.route({ method, url, options, handler })`

`example.handler.ts` handlers are defined using a custom `RouteHandlerMethod` found in `src/common/types.ts` to enable the use of TypeBox to define schemas and validate against request parameters, querystrings, body objects, response objects and more.

`example.schema.ts` defines schemas that are not only used for data/type validation but also IDE autocomplete and swagger documentation generation. To say that schemas are important, when using fastify, would be an understatement.

For more information visit the [Fastify Routes Documentation](https://fastify.dev/docs/latest/Reference/Routes/)
