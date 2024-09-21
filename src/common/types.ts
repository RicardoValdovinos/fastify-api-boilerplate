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
	dateAdded: string;
	email: string;
	firstName: string;
	id: number;
	lastName: string;
	phone: string | null;
}

export interface Pet {
	age: number | null;
	dateAdded: string;
	id: number;
	name: string;
	personId: number;
	speciesId: number;
}

export interface Session {
	expiresAt: number;
	id: string;
	userId: string;
}

export interface Species {
	id: number;
	name: string;
}

export interface User {
	googleEmail: string | null;
	googleId: string | null;
	googleName: string | null;
	id: string | null;
}

export interface DB {
	person: Person;
	pet: Pet;
	session: Session;
	species: Species;
	user: User;
}
