import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { FastifyInstanceTypebox } from "../../../common/types.js";
import { addPerson, addPet, addSpecies, deletePerson, deletePet, deleteSpecies, getPersonById, getPersons, getPetById, getPets, getPetsByPerson, getPetsBySpecies, getSpecies, getSpeciesById, updatePerson, updatePet, updateSpecies } from "./example.handler.js";

export const exampleInstance: FastifyPluginAsyncTypebox = async (
	instance: FastifyInstanceTypebox
) => {
	instance.get("/person", getPersons);
	instance.get("/person/:id", getPersonById);
	instance.get("/species/", getSpecies);
	instance.get("/species/:id", getSpeciesById);
	instance.get("/pet/", getPets);
	instance.get("/pet/:id", getPetById);
	instance.get("/pet/person/:id", getPetsByPerson);
	instance.get("/pet/species/:id", getPetsBySpecies);

	instance.post("/person", addPerson);
	instance.post("/species", addSpecies);
	instance.post("/pet", addPet);

	instance.put("/person/:id", updatePerson);
	instance.put("/species/:id", updateSpecies);
	instance.put("/pet/:id", updatePet);
	
	instance.delete("/person/:id", deletePerson);
	instance.delete("/species/:id", deleteSpecies);
	instance.delete("/pet/:id", deletePet);
};
