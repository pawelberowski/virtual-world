import { Animal } from './Animal';

export class Wolf extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 9;
    this.initiative = 5;
    this.cssClass = 'wolf';
  }
}
