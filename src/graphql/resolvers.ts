import validator from "validator";

import Pokemon from "../models/pokemon";
import { Pokemon as IPokemon } from "../interfaces/pokemon";
import { CustomError } from "../interfaces/error";

type RequestBody = {
  pokemonInput: Pick<IPokemon, "name" | "types" | "stats" | "parentIds">;
};

export default {
  pokemons: async function () {
    const pokemons = await Pokemon.find().sort({ createdAt: -1 });
    return {
      pokemons: pokemons.map((pokemon) => ({
        ...(pokemon as any)._doc,
        _id: pokemon._id.toString(),
        createdAt: pokemon.createdAt.toISOString(),
        updatedAt: pokemon.updatedAt.toISOString(),
      })),
    };
  },
  createPokemon: async function ({ pokemonInput }: RequestBody) {
    const errors = [];
    if (
      validator.isEmpty(pokemonInput.name) ||
      !validator.isLength(pokemonInput.name, { min: 5 })
    ) {
      errors.push({ message: "Name is invalid." });
    }
    if (!pokemonInput.types.length || pokemonInput.types.length > 2) {
      errors.push({ message: "Type is invalid." });
    }
    if (
      pokemonInput.parentIds.length !== 2 ||
      pokemonInput.parentIds[0] < 1 ||
      pokemonInput.parentIds[1] < 1 ||
      pokemonInput.parentIds[0] === pokemonInput.parentIds[1]
    ) {
      errors.push({ message: "Only 2 different species can be mixed." });
    }
    if (Object.values(pokemonInput.stats).find((stat) => stat <= 0)) {
      errors.push({ message: "Some stats are invalid." });
    }
    if (errors.length > 0) {
      const error: CustomError = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const pokemon = new Pokemon({
      name: pokemonInput.name,
      types: pokemonInput.types,
      stats: pokemonInput.stats,
      parentIds: pokemonInput.parentIds,
    });
    const createdPokemon = await pokemon.save();
    return {
      ...(createdPokemon as any)._doc,
      _id: createdPokemon._id.toString(),
      createdAt: createdPokemon.createdAt.toISOString(),
      updatedAt: createdPokemon.updatedAt.toISOString(),
    };
  },
};
