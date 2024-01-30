# SCHEMA

## QUERIES

### RootQuery

#### Fields
pokemons: PokemonData!

### PokemonData

#### Fields
pokemons: [Pokemon]!

### Pokemon*

#### Fields
- _id: ID!
- name: String!
- types: [String!]!
- parentIds: [Int!]!
- stats: Stats!
- createdAt: String!
- updatedAt: String!


### Stats

#### Fields
- attack: Int!
- defense: Int!
- spAttack: Int!
- spDefense: Int!
- speed: Int!
- hp: Int!

## MUTATIONS

### RootMutation

#### Fields
createPokemon(pokemonInput: PostPokemonData!): Pokemon!

### PostPokemonData

#### Fields
- name: String!
- types: [String!]!
- stats: InputStats!
- parentIds: [Int!]!

### InputStats

#### Fields
- attack: Int!
- defense: Int!
- spAttack: Int!
- spDefense: Int!
- speed: Int!
- hp: Int!