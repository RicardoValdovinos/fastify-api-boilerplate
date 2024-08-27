import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type {
	ContextConfigDefault,
	FastifyBaseLogger,
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	FastifySchema,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
	RouteGenericInterface,
	RouteHandlerMethod,
} from "fastify";

export type FastifyInstanceTypebox = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression<RawServerDefault>,
	RawReplyDefaultExpression<RawServerDefault>,
	FastifyBaseLogger,
	TypeBoxTypeProvider
>;

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
	FastifyRequest<
		RouteGenericInterface,
		RawServerDefault,
		RawRequestDefaultExpression<RawServerDefault>,
		TSchema,
		TypeBoxTypeProvider
	>;

export type RouteHandlerMethodTypebox<TSchema extends FastifySchema> =
	RouteHandlerMethod<
		RawServerDefault,
		RawRequestDefaultExpression<RawServerDefault>,
		RawReplyDefaultExpression<RawServerDefault>,
		RouteGenericInterface,
		ContextConfigDefault,
		TSchema,
		TypeBoxTypeProvider
	>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	RouteGenericInterface,
	ContextConfigDefault,
	TSchema,
	TypeBoxTypeProvider
>;

export interface Session {
  expires_at: number;
  id: string;
  user_id: string;
}

export interface User {
  google_email: string;
  google_id: string;
  google_name: string;
  id: string;
}

export interface DB {
  session: Session;
  user: User;
}
