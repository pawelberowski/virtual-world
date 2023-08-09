import { Animal } from './Animal';

export class Antelope extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 4;
    this.initiative = 4;
    this.cssClass = 'antelope';
  }
}
