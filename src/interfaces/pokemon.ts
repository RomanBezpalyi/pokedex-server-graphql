export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  parentIds: number[];
  stats: {
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    spAttack: number;
    spDefense: number;
  }
}
