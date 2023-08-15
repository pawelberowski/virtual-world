import { Plant } from './Plant';

export class Grass extends Plant {
  constructor(tile, board) {
    super(tile, board);
    this.cssClass = 'grass';
  }
}
