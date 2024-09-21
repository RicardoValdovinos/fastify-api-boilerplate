import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { addPerson, addPet, addSpecies, deletePerson, deletePet, deleteSpecies, getPersonById, getPersons, getPetById, getPets, getPetsByPerson, getPetsBySpecies, getSpecies, getSpeciesById, updatePerson, updatePet, updateSpecies } from "./example.handler.js";
import { addPersonSchema, addPetsSchema, addSpeciesSchema, deleteSchema, getPersonByIdSchema, getPersonsSchema, getPetsByIdSchema, getPetsByPersonSchema, getPetsBySpeciesSchema, getPetsSchema, getSpeciesByIdSchema, getSpeciesSchema, updatePersonSchema, updatePetsSchema, updateSpeciesSchema } from "./example.schema.js";

export const exampleInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/person", {schema: getPersonsSchema}, getPersons);
	instance.get("/person/:id", {schema: getPersonByIdSchema}, getPersonById);
	instance.get("/species/", {schema: getSpeciesSchema}, getSpecies);
	instance.get("/species/:id", {schema: getSpeciesByIdSchema}, getSpeciesById);
	instance.get("/pet/", {schema: getPetsSchema}, getPets);
	instance.get("/pet/:id", {schema: getPetsByIdSchema}, getPetById);
	instance.get("/pet/person/:id", {schema: getPetsByPersonSchema}, getPetsByPerson);
	instance.get("/pet/species/:id", {schema: getPetsBySpeciesSchema}, getPetsBySpecies);

	instance.post("/person", {schema: addPersonSchema}, addPerson);
	instance.post("/species", {schema: addSpeciesSchema}, addSpecies);
	instance.post("/pet", {schema: addPetsSchema}, addPet);

	instance.put("/person/:id", {schema: updatePersonSchema}, updatePerson);
	instance.put("/species/:id", {schema: updateSpeciesSchema}, updateSpecies);
	instance.put("/pet/:id", {schema: updatePetsSchema}, updatePet);
	
	instance.delete("/person/:id", {schema: deleteSchema}, deletePerson);
	instance.delete("/species/:id", {schema: deleteSchema}, deleteSpecies);
	instance.delete("/pet/:id", {schema: deleteSchema}, deletePet);
};
