import { buildSchema } from "graphql";

export default buildSchema(`
    type Pokemon {
        _id: ID!
        name: String!
        types: [String!]!
        parentIds: [Int!]!
        stats: Stats!
        createdAt: String!
        updatedAt: String!
    }

    type Stats {
        attack: Int!
        defense: Int!
        spAttack: Int!
        spDefense: Int!
        speed: Int!
        hp: Int!
    }

    type PokemonData {
        pokemons: [Pokemon!]!
    }

    input InputStats {
        attack: Int!
        defense: Int!
        spAttack: Int!
        spDefense: Int!
        speed: Int!
        hp: Int!
    }

    input PostPokemonData {
        name: String!
        types: [String!]!
        stats: InputStats!
        parentIds: [Int!]!
    }

    type RootQuery {
        pokemons: PokemonData!
    }

    type RootMutation {
        createPokemon(pokemonInput: PostPokemonData!): Pokemon!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
