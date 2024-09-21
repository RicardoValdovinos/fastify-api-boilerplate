import { Type } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";

const personSchema = Type.Object({
	address: Type.Union([Type.String(), Type.Null()]),
	dateAdded: Type.String(),
	email: Type.String(),
	firstName: Type.String(),
	id: Type.Number(),
	lastName: Type.String(),
	phone: Type.Union([Type.String(), Type.Null()]),
});

const speciesSchema = Type.Object({
	id: Type.Number(),
	name: Type.String(),
});

const petsSchema = Type.Object({
	dateAdded: Type.String(),
	id: Type.Number(),
	age: Type.Union([Type.Number(), Type.Null()]),
	name: Type.String(),
	personId: Type.Number(),
	speciesId: Type.Number(),
});

export const getPersonsSchema = {
	response: {
		"2xx": Type.Array(personSchema),
	},
} satisfies FastifySchema;

export const getPersonByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: {
		"2xx": personSchema,
	},
} satisfies FastifySchema;

export const getSpeciesSchema = {
	response: {
		"2xx": Type.Array(speciesSchema),
	},
} satisfies FastifySchema;

export const getSpeciesByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: {
		"2xx": speciesSchema,
	},
} satisfies FastifySchema;

export const getPetsSchema = {
	response: {
		"2xx": Type.Array(petsSchema),
	},
} satisfies FastifySchema;

export const getPetsByIdSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: {
		"2xx": petsSchema,
	},
} satisfies FastifySchema;

export const getPetsByPersonSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: {
		"2xx": Type.Array(petsSchema),
	},
} satisfies FastifySchema;

export const getPetsBySpeciesSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: {
		"2xx": Type.Array(petsSchema),
	},
} satisfies FastifySchema;

export const addPersonSchema = {
	body: personSchema,
	response: {
		"2xx": personSchema,
	},
} satisfies FastifySchema;

export const addSpeciesSchema = {
	body: speciesSchema,
	response: {
		"2xx": speciesSchema,
	},
} satisfies FastifySchema;

export const addPetsSchema = {
	body: petsSchema,
	response: {
		"2xx": petsSchema,
	},
} satisfies FastifySchema;

export const updatePersonSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	body: personSchema,
	response: {
		"2xx": personSchema,
	},
} satisfies FastifySchema;

export const updateSpeciesSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	body: speciesSchema,
	response: {
		"2xx": speciesSchema,
	},
} satisfies FastifySchema;

export const updatePetsSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	body: petsSchema,
	response: {
		"2xx": petsSchema,
	},
} satisfies FastifySchema;

export const deleteSchema = {
	params: Type.Object({
		id: Type.Number(),
	}),
	response: { "2xx": Type.Object({}) },
} satisfies FastifySchema;
