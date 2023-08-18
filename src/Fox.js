import { Animal } from './Animal';

export class Fox extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 4;
    this.initiative = 7;
    this.cssClass = 'fox';
  }

  getTilesForFox(currentTile) {
    return this.board.getTilesAround(currentTile).filter((newTile) => {
      return (
        newTile.organism === null ||
        newTile.organism.strength <= currentTile.organism.strength
      );
    });
  }

  findTileToMove() {
    const newTiles = this.getTilesForFox(this.tile);
    if (!newTiles.length) {
      return;
    }
    return this.board.getRandomTile(newTiles);
  }
}
