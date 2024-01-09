import { Schema, model } from 'mongoose';

const pokemonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    types: {
      type: [String],
      required: true,
    },
    parentIds: {
      type: [Number],
      required: true,
    },
    stats: {
      attack: {
        type: Number,
        required: true,
        min: 1,
      },
      defense: {
        type: Number,
        required: true,
        min: 1,
      },
      hp: {
        type: Number,
        required: true,
        min: 1,
      },
      speed: {
        type: Number,
        required: true,
        min: 1,
      },
      spAttack: {
        type: Number,
        required: true,
        min: 1,
      },
      spDefense: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  },
  { timestamps: true }
);

export default model('Pokemon', pokemonSchema);
