import fp from "fastify-plugin";
import OAuth from "@fastify/oauth2";
import Cookie from "@fastify/cookie";
import Csrf from "@fastify/csrf-protection";
import { Client } from "undici";
import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  RouteHandlerMethod,
} from "fastify";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

/**
 * Authentication is a core component of virtually every application.
 * Fastify does not come with a prebuilt authentication solution, but it offers
 * many plugins instead, so you can choose the one that fits your needs.
 * In this application we want our users to login via GitHub and then share the
 * access token with the frontend via signed cookies.
 */
const authorization: FastifyPluginAsyncTypebox = async (
  instance: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> => {
  const { httpErrors, config } = instance;

  // We don't want every github user to access our application,
  // so we configure an allow list of emails that we accept.
  const allowedUsers = config.ALLOWED_USERS.split(",");

  // Undici is an http client for Node.js extremely optimized
  // to achieve the best performances possible. Is very well
  // suited if you need to send all the request to the same endpoint.
  const client = new Client("https://api.github.com");

  // `fastify-oauth2` is a plugin that helps you handle oauth2 flows.
  // It comes with preconfigured settings for the major oauth providers.
  // Are you using Auth0? See https://npm.im/fastify-auth0-verify
  await instance.register(OAuth, {
    name: "github",
    credentials: {
      client: {
        id: config.GITHUB_APP_ID,
        secret: config.GITHUB_APP_SECRET,
      },
      auth: OAuth.fastifyOauth2.GITHUB_CONFIGURATION,
    },
    startRedirectPath: "/_app/login/github",
    // TODO: this url should change if we are in prod
    callbackUri: "http://localhost:3000/_app/login/github/callback",
    scope: ["user:email"],
  });

  // `fastify-cookie` adds everything you need to work with cookies
  await instance.register(Cookie, {
    secret: config.COOKIE_SECRET,
  });

  // When using sessions with cookies, it's always recommended to use CSRF.
  // `fastify-csrf` will help you better protect your application.
  // Don't know what CSRF is? Take a look at https://github.com/pillarjs/understanding-csrf.
  await instance.register(Csrf, {
    sessionPlugin: "@fastify/cookie",
    cookieOpts: { signed: true },
  });

  // A good pattern to follow is to always expose utilities that interact with
  // the request/response lifecycle as functions with the hook signature.
  // See https://fastify.dev/docs/latest/Reference/Hooks/
  // By exposing the authorization function with the hook signature, we can
  // use it everywhere in our application by adding a plugin or a route level
  // hook that uses it.
  // One of the unwritten core principles with Fastify is "keep things boring",
  // it will help you keep the complexity low, scale well in heterogeneous teams
  // and lower the barrier of entry.
  //
  // The authorization hook will look at the cookies and extract the session
  // cookie, in this case `user_session`. If it is not present, throws an error
  // with `httpErrors.unauthorized`, a utility added by `fastify-sensible`.
  // If the cookie is present it will try to unsign it and finally
  // verify with the OAuth provider if the provided token is valid
  // and is part of the allowed users list.
  // If the user is accepeted, it will update the `request.user` property
  // with the mail address of the user.
  const authorize: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const { user_session } = request.cookies;
    if (!user_session) {
      throw httpErrors.unauthorized("Missing session cookie");
    }

    const cookie = request.unsignCookie(user_session);
    if (!cookie.valid) {
      throw httpErrors.unauthorized("Invalid cookie signature");
    }

    let mail;
    try {
      mail = await instance.isUserAllowed(cookie.value);
    } catch (err) {
      const error = err as Error
      request.log.warn(
        `Invalid user tried to authenticate: ${JSON.stringify(error.user)}`
      );
      // Let's clear the cookie as well in case of errors,
      // in this way if a user retries the request we'll save
      // an additional http request to GitHub.
      reply.clearCookie("user_session", { path: "/_app" });
      throw error;
    }

    // You can add any property to the request/reply objects,
    // but it's important you declare them in advance with decorators.
    // If you don't, your code will likely be deoptimized by V8.
    request.user = { mail };
  }

  const isUserAllowed = async (token: string): Promise<string> => {
    const response = await client.request({
      method: "GET",
      path: "/user/emails",
      headers: {
        "User-Agent": "fastify-example",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode >= 400) {
      throw httpErrors.unauthorized("Authenticate again");
    }

    let payload = "";
    response.body.setEncoding("utf8");
    for await (const chunk of response.body) {
      payload += chunk;
    }
    payload = JSON.parse(payload);

    const isAllowed = payload.some((ele) => allowedUsers.includes(ele.email));
    if (!isAllowed) {
      const err = httpErrors.forbidden("You are not allowed to access this");
      // let's store the user info so we can log them later
      err.user = payload;
      throw err;
    }

    for (const ele of payload) {
      if (ele.primary) return ele.email;
    }
    throw httpErrors.badRequest("The user does not have a primary email");
  }

  // Mocks are double edges swords. The main issue with mocks
  // is that usually you only test for the success case.
  // You should test for the bad case as well, so if you are
  // writing a mock be sure to handle the failure cases as well.
  async function isUserAllowedMock(token) {
    if (token === "invalid") {
      throw httpErrors.forbidden("You are not allowed to access this");
    }
    return allowedUsers[0];
  }

  // Decorators are the "Fastify way" of sharing code across your application.
  // When using the `decorate` API, the first parameter is the decorator name,
  // while the second the actual decorator (it can be any js value).
  // You can then access your decorator with `fastify.nameOfTheDecorator`.
  // See https://www.fastify.io/docs/latest/Decorators/
  // Testing authentication flow is hard, especially if you are using OAuth flow.
  // As workarond we are using mocks instead of the production authorization utilities.
  instance.decorate("authorize", authorize);
  instance.decorate(
    "isUserAllowed",
    options.testing ? isUserAllowedMock : isUserAllowed
  );
  // `decorateRequest` works in the same way of `decorate`, but it changes
  // the Fastify request object instead. It's very useful if you know you need
  // to add properties to the request object, as behind the scenes Fastify will
  // optimize the code for you.
  instance.decorateRequest("user", null);
};

// When exporting a plugin that exposes a utility that will need to be used
// in other parts of your application, use `fastify-plugin` to tell Fastify that
// this plugin should not be encapsulated. See https://www.fastify.io/docs/latest/Encapsulation/.
export default fp(authorization, {
  // Protip: if you name your plugins, the stack trace in case of errors
  //         will be easier to read and other plugins can declare their dependency
  //         on this one. `fastify-autoload` will take care of loading the plugins
  //         in the correct order.
  name: "authorization",
});
