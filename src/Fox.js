import { Animal } from './Animal';

export class Fox extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 4;
    this.initiative = 7;
    this.cssClass = 'fox';
  }

  findTileToMove() {
    const newTiles = this.board.getTilesForFox(this.tile);
    if (!newTiles.length) {
      return;
    }
    return this.board.getRandomTile(newTiles);
  }
}
