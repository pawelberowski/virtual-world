import { Animal } from './Animal';

export class Player extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 5;
    this.initiative = 4;
    this.cssClass = 'player';
  }
}
