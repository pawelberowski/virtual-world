import { Plant } from './Plant';

export class SowThistle extends Plant {
  constructor(tile, board) {
    super(tile, board);
    this.cssClass = 'sow-thistle';
    this.chanceToSpread = 0.3;
  }
}
