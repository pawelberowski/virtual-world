import { Animal } from './Animal';

export class Turtle extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 2;
    this.initiative = 1;
    this.cssClass = 'turtle';
  }
}
