import { Organism } from './Organism';

export class Plant extends Organism {
  constructor(tile, board) {
    super(tile, board);
    this.initiative = 0;
    this.strength = 0;
    this.chanceToSpread = 0.1;
  }

  spread() {
    const emptyTiles = this.board.getEmptyTilesAround(this.tile);
    if (!emptyTiles.length) {
      return;
    }
    const emptyTile = this.board.getRandomTile(emptyTiles);
    this.board.addOrganism(
      emptyTile.xCoordinate,
      emptyTile.yCoordinate,
      this.constructor,
    );
  }

  action() {
    return new Promise((resolve) => {
      if (Math.random() <= this.chanceToSpread) {
        this.spread();
      }
      return resolve();
    });
  }
}
