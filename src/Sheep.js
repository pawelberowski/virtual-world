import { Animal } from './Animal';

export class Sheep extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 3;
    this.initiative = 4;
    this.cssClass = 'sheep';
  }
}
