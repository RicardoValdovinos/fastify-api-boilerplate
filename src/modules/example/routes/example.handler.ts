import type { Static, TSchema } from "@sinclair/typebox";
import type { RouteHandlerMethodTypebox } from "../../../common/types.js";
import type {
	addPersonSchema,
	addPetsSchema,
	addSpeciesSchema,
	deleteSchema,
	getPersonByIdSchema,
	getPersonsSchema,
	getPetsByIdSchema,
	getPetsByPersonSchema,
	getPetsBySpeciesSchema,
	getPetsSchema,
	getSpeciesByIdSchema,
	getSpeciesSchema,
	updatePersonSchema,
	updatePetsSchema,
	updateSpeciesSchema,
} from "./example.schema.js";

type RouteHandlerMethodTypeboxReturn<T extends TSchema> = Promise<Static<T>>;

type GetPersonsType = typeof getPersonsSchema;
export const getPersons: RouteHandlerMethodTypebox<GetPersonsType> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetPersonsType["response"]["2xx"]> => {
	reply.header("Content-Type", "application/json; charset=utf-8");

	const { database } = request.server;
	const result = await database.selectFrom("person").selectAll().execute();

	return reply.send(result);
};

type GetPersonByIdType = typeof getPersonByIdSchema;
export const getPersonById: RouteHandlerMethodTypebox<
	GetPersonByIdType
> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetPersonByIdType["response"]["2xx"]> => {
	reply.header("Content-Type", "application/json; charset=utf-8");
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.selectFrom("person")
		.where("id", "=", id)
		.selectAll()
		.executeTakeFirst();

	if (!result) {
		return reply.notFound();
	}

	return reply.send(result);
};

type GetSpeciesType = typeof getSpeciesSchema;
export const getSpecies: RouteHandlerMethodTypebox<GetSpeciesType> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetSpeciesType["response"]["2xx"]> => {
	reply.header("Content-Type", "application/json; charset=utf-8");

	const { database } = request.server;
	const result = await database.selectFrom("species").selectAll().execute();

	return reply.send(result);
};

type GetSpeciesByIdType = typeof getSpeciesByIdSchema;
export const getSpeciesById: RouteHandlerMethodTypebox<
	GetSpeciesByIdType
> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetSpeciesByIdType["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.selectFrom("species")
		.where("id", "=", id)
		.selectAll()
		.executeTakeFirst();

	if (!result) {
		return reply.notFound();
	}

	return reply.send(result);
};

type GetPetsType = typeof getPetsSchema;
export const getPets: RouteHandlerMethodTypebox<GetPetsType> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetPetsType["response"]["2xx"]> => {
	reply.header("Content-Type", "application/json; charset=utf-8");

	const { database } = request.server;
	const result = await database.selectFrom("pet").selectAll().execute();

	return reply.send(result);
};

type GetPetsByIdType = typeof getPetsByIdSchema;
export const getPetById: RouteHandlerMethodTypebox<GetPetsByIdType> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetPetsByIdType["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.selectFrom("pet")
		.where("pet.id", "=", id)
		.selectAll()
		.executeTakeFirst();

	if (!result) {
		return reply.notFound();
	}

	return reply.send(result);
};

type GetPetsByPersonType = typeof getPetsByPersonSchema;
export const getPetsByPerson: RouteHandlerMethodTypebox<
	GetPetsByPersonType
> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetPetsByPersonType["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.selectFrom("pet")
		.innerJoin("person", "pet.personId", "person.id")
		.where("person.id", "=", id)
		.selectAll()
		.execute();

	return reply.send(result);
};

type GetPetsBySpeciesType = typeof getPetsBySpeciesSchema;
export const getPetsBySpecies: RouteHandlerMethodTypebox<
	GetPetsBySpeciesType
> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<GetPetsBySpeciesType["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.selectFrom("pet")
		.innerJoin("species", "pet.speciesId", "species.id")
		.where("species.id", "=", id)
		.selectAll()
		.execute();

	return reply.send(result);
};

type AddPersonSchema = typeof addPersonSchema;
export const addPerson: RouteHandlerMethodTypebox<AddPersonSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<AddPersonSchema["response"]["2xx"]> => {
	const { id, email, firstName, lastName, address, phone, dateAdded } =
		request.body;

	const { database } = request.server;
	const result = await database
		.insertInto("person")
		.values({ id, email, firstName, lastName, address, phone, dateAdded })
		.outputAll("inserted")
		.executeTakeFirst();

	if (!result) {
		return reply.internalServerError();
	}

	reply.status(201);
	return reply.send(result);
};

type AddSpeciesSchema = typeof addSpeciesSchema;
export const addSpecies: RouteHandlerMethodTypebox<AddSpeciesSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<AddSpeciesSchema["response"]["2xx"]> => {
	const { id, name } = request.body;

	const { database } = request.server;
	const result = await database
		.insertInto("species")
		.values({ id, name })
		.outputAll("inserted")
		.executeTakeFirst();

	if (!result) {
		return reply.internalServerError();
	}

	reply.status(201);
	return reply.send(result);
};

type AddPetsSchema = typeof addPetsSchema;
export const addPet: RouteHandlerMethodTypebox<AddPetsSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<AddPetsSchema["response"]["2xx"]> => {
	const { id, name, age, personId, speciesId, dateAdded } = request.body;

	const { database } = request.server;
	const result = await database
		.insertInto("pet")
		.values({ id, name, age, personId, speciesId, dateAdded })
		.outputAll("inserted")
		.executeTakeFirst();

	if (!result) {
		return reply.internalServerError();
	}

	reply.status(201);
	return reply.send(result);
};

type UpdatePersonSchema = typeof updatePersonSchema;
export const updatePerson: RouteHandlerMethodTypebox<
	UpdatePersonSchema
> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<UpdatePersonSchema["response"]["2xx"]> => {
	const {
		id: bodyId,
		email,
		firstName,
		lastName,
		address,
		phone,
		dateAdded,
	} = request.body;
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.updateTable("person")
		.set({ id: bodyId, email, firstName, lastName, address, phone, dateAdded })
		.outputAll("inserted")
		.where("person.id", "=", id)
		.executeTakeFirst();

	if (!result) {
		return reply.internalServerError();
	}

	reply.status(201);
	return reply.send(result);
};

type UpdateSpeciesSchema = typeof updateSpeciesSchema;
export const updateSpecies: RouteHandlerMethodTypebox<
	UpdateSpeciesSchema
> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<UpdateSpeciesSchema["response"]["2xx"]> => {
	const { id: bodyId, name } = request.body;
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.updateTable("species")
		.set({ id: bodyId, name })
		.outputAll("inserted")
		.where("species.id", "=", id)
		.executeTakeFirst();

	if (!result) {
		return reply.internalServerError();
	}

	reply.status(201);
	return reply.send(result);
};

type UpdatePetSchema = typeof updatePetsSchema;
export const updatePet: RouteHandlerMethodTypebox<UpdatePetSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<UpdatePetSchema["response"]["2xx"]> => {
	const {
		id: bodyId,
		name,
		age,
		personId,
		speciesId,
		dateAdded,
	} = request.body;
	const { id } = request.params;

	const { database } = request.server;
	const result = await database
		.updateTable("pet")
		.set({ id: bodyId, name, age, personId, speciesId, dateAdded })
		.outputAll("inserted")
		.where("pet.id", "=", id)
		.executeTakeFirst();

	if (!result) {
		return reply.internalServerError();
	}

	reply.status(201);
	return reply.send(result);
};

type DeleteSchema = typeof deleteSchema;

export const deletePerson: RouteHandlerMethodTypebox<DeleteSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<DeleteSchema["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	await database.deleteFrom("person").where("person.id", "=", id).execute();

	reply.status(204);
	return reply.send({});
};

export const deletePet: RouteHandlerMethodTypebox<DeleteSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<DeleteSchema["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	await database.deleteFrom("pet").where("pet.id", "=", id).execute();

	reply.status(204);
	return reply.send({});
};

export const deleteSpecies: RouteHandlerMethodTypebox<DeleteSchema> = async (
	request,
	reply
): RouteHandlerMethodTypeboxReturn<DeleteSchema["response"]["2xx"]> => {
	const { id } = request.params;

	const { database } = request.server;
	await database.deleteFrom("species").where("species.id", "=", id).execute();

	reply.status(204);
	return reply.send({});
};
