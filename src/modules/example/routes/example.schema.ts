import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";

export const getPersonsSchema = {
	response: Type.Array(
		Type.Object({
			address: Type.Union([Type.String(), Type.Null()]),
			dateAdded: Type.String(),
			email: Type.String(),
			firstName: Type.String(),
			id: Type.Number(),
			lastName: Type.String(),
			phone: Type.Union([Type.String(), Type.Null()]),
		})
	),
} satisfies FastifySchema;

export const getPersonByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: Type.Object({
		address: Type.Union([Type.String(), Type.Null()]),
		dateAdded: Type.String(),
		email: Type.String(),
		firstName: Type.String(),
		id: Type.Number(),
		lastName: Type.String(),
		phone: Type.Union([Type.String(), Type.Null()]),
	}),
} satisfies FastifySchema;

export const getSpeciesSchema = {
	response: Type.Array(
		Type.Object({
			id: Type.Number(),
			name: Type.String(),
		})
	),
} satisfies FastifySchema;

export const getSpeciesByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: Type.Object({
		id: Type.Number(),
		name: Type.String(),
	}),
} satisfies FastifySchema;

export const getPetsSchema = {
	response: Type.Array(
		Type.Object({
			dateAdded: Type.String(),
			id: Type.Number(),
			age: Type.Union([Type.Number(), Type.Null()]),
			name: Type.String(),
			personId: Type.Number(),
			speciesId: Type.Number(),
		})
	),
} satisfies FastifySchema;

export const getPetsByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: Type.Object({
		dateAdded: Type.String(),
		id: Type.Number(),
		age: Type.Union([Type.Number(), Type.Null()]),
		name: Type.String(),
		personId: Type.Number(),
		speciesId: Type.Number(),
	}),
} satisfies FastifySchema;

export const getPetsByPersonSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: Type.Array(
		Type.Object({
			dateAdded: Type.String(),
			id: Type.Number(),
			age: Type.Union([Type.Number(), Type.Null()]),
			name: Type.String(),
			personId: Type.Number(),
			speciesId: Type.Number(),
		})
	),
} satisfies FastifySchema;

export const getPetsBySpeciesSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: Type.Array(
		Type.Object({
			dateAdded: Type.String(),
			id: Type.Number(),
			age: Type.Union([Type.Number(), Type.Null()]),
			name: Type.String(),
			personId: Type.Number(),
			speciesId: Type.Number(),
		})
	),
} satisfies FastifySchema;

export const addPersonSchema = {
	body: Type.Object({
		address: Type.Union([Type.String(), Type.Null()]),
		dateAdded: Type.String(),
		email: Type.String(),
		firstName: Type.String(),
		id: Type.Number(),
		lastName: Type.String(),
		phone: Type.Union([Type.String(), Type.Null()]),
	}),
	response: Type.Object({
		address: Type.Union([Type.String(), Type.Null()]),
		dateAdded: Type.String(),
		email: Type.String(),
		firstName: Type.String(),
		id: Type.Number(),
		lastName: Type.String(),
		phone: Type.Union([Type.String(), Type.Null()]),
	}),
} satisfies FastifySchema;

export const addSpeciesSchema = {
	body: Type.Object({
		id: Type.Number(),
		name: Type.String(),
	}),
	response: Type.Object({
		id: Type.Number(),
		name: Type.String(),
	}),
} satisfies FastifySchema;

export const addPetsSchema = {
	body: Type.Object({
		dateAdded: Type.String(),
		id: Type.Number(),
		age: Type.Union([Type.Number(), Type.Null()]),
		name: Type.String(),
		personId: Type.Number(),
		speciesId: Type.Number(),
	}),
	response: Type.Object({
		dateAdded: Type.String(),
		id: Type.Number(),
		age: Type.Union([Type.Number(), Type.Null()]),
		name: Type.String(),
		personId: Type.Number(),
		speciesId: Type.Number(),
	}),
} satisfies FastifySchema;

export const updatePersonSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	body: Type.Object({
		address: Type.Union([Type.String(), Type.Null()]),
		dateAdded: Type.String(),
		email: Type.String(),
		firstName: Type.String(),
		id: Type.Number(),
		lastName: Type.String(),
		phone: Type.Union([Type.String(), Type.Null()]),
	}),
	response: Type.Object({
		address: Type.Union([Type.String(), Type.Null()]),
		dateAdded: Type.String(),
		email: Type.String(),
		firstName: Type.String(),
		id: Type.Number(),
		lastName: Type.String(),
		phone: Type.Union([Type.String(), Type.Null()]),
	}),
} satisfies FastifySchema;

export const updateSpeciesSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	body: Type.Object({
		id: Type.Number(),
		name: Type.String(),
	}),
	response: Type.Object({
		id: Type.Number(),
		name: Type.String(),
	}),
} satisfies FastifySchema;

export const updatePetsSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	body: Type.Object({
		dateAdded: Type.String(),
		id: Type.Number(),
		age: Type.Union([Type.Number(), Type.Null()]),
		name: Type.String(),
		personId: Type.Number(),
		speciesId: Type.Number(),
	}),
	response: Type.Object({
		dateAdded: Type.String(),
		id: Type.Number(),
		age: Type.Union([Type.Number(), Type.Null()]),
		name: Type.String(),
		personId: Type.Number(),
		speciesId: Type.Number(),
	}),
} satisfies FastifySchema;

export const deleteSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: Type.Object({}),
} satisfies FastifySchema;
