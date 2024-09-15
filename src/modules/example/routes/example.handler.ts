import type { RouteHandlerMethodTypebox } from "../../../common/types.js";
import type {
	GetExampleByIdResponeType,
	GetExampleByIdSchema,
	GetPersonsResponeType,
	getPersonsSchema,
} from "./example.schema.js";

export const getPersons: RouteHandlerMethodTypebox<
	typeof getPersonsSchema
> = async (request, reply): Promise<GetPersonsResponeType> => {
	reply.header("Content-Type", "application/json; charset=utf-8");
	
	const { database } = request.server
	const result = await database.selectFrom("person").selectAll().execute()

	return result;
};

export const getPersonById: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.selectFrom("person").where("id", "=", id).selectAll().executeTakeFirst()

	return result;
};

export const getSpecies: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	reply.header("Content-Type", "application/json; charset=utf-8");
	
	const { database } = request.server
	const result = await database.selectFrom("species").selectAll().execute()

	return result;
};

export const getSpeciesById: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.selectFrom("species").where("id", "=", id).selectAll().executeTakeFirst()

	return result;
};

export const getPets: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	reply.header("Content-Type", "application/json; charset=utf-8");
	
	const { database } = request.server
	const result = await database.selectFrom("pet").selectAll().execute()

	return result;
};

export const getPetById: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.selectFrom("pet").where("pet.id", "=", id).selectAll().executeTakeFirst()

	return result;
};

export const getPetsByPerson: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.selectFrom("pet").innerJoin("person", "pet.person_id", "person.id").selectAll().execute()

	return result;
};


export const getPetsBySpecies: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.selectFrom("pet").innerJoin("species", "pet.species_id", "species.id").selectAll().execute()

	return result;
};

export const addPerson: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.insertInto("person").values().execute()

	return result;
};

export const addSpecies: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.insertInto("species").values().execute()

	return result;
};

export const addPet: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.insertInto("pet").values().execute()

	return result;
};

export const updatePerson: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.updateTable("person").set().where("person.id", "=", id).execute()

	return result;
};

export const updateSpecies: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.updateTable("species").set().where("species.id", "=", id).execute()

	return result;
};

export const updatePet: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.updateTable("pet").set().where("pet.id", "=", id).execute()

	return result;
};

export const deletePerson: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.deleteFrom("person").where("person.id", "=", id).execute()

	return result;
};

export const deletePet: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.deleteFrom("pet").where("pet.id", "=", id).execute()

	return result;
};

export const deleteSpecies: RouteHandlerMethodTypebox<
	typeof GetExampleByIdSchema
> = async (request, reply): Promise<GetExampleByIdResponeType> => {
	const { id } = request.params;

	const { database } = request.server
	const result = await database.deleteFrom("species").where("species.id", "=", id).execute()

	return result;
};