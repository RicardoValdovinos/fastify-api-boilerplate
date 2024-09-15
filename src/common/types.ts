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

export interface Person {
  address: string | null;
  date_added: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone: string | null;
}

export interface Pet {
  age: number | null;
  date_added: string;
  id: number;
  name: string;
  person_id: number;
  species_id: number;
}

export interface Session {
  expires_at: number;
  id: string;
  user_id: string;
}

export interface Species {
  id: number;
  name: string;
}

export interface User {
  google_email: string | null;
  google_id: string | null;
  google_name: string | null;
  id: string | null;
}

export interface DB {
  person: Person;
  pet: Pet;
  session: Session;
  species: Species;
  user: User;
}

