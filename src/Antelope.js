import { Animal } from './Animal';

export class Antelope extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 4;
    this.initiative = 4;
    this.cssClass = 'antelope';
  }

  getTilesForAntelope(currentTile) {
    const tilesAround = this.board.getTilesAround(currentTile);
    const tilesForAntelope = [];
    tilesAround.forEach((tile) => {
      const tilesAround = this.board.getTilesAround(tile);
      tilesAround.forEach((tile) => {
        if (!tilesForAntelope.includes(tile)) {
          tilesForAntelope.push(tile);
        }
      });
    });
    return tilesForAntelope;
  }

  getEmptyTilesForAntelope(tile) {
    return this.getTilesForAntelope(tile).filter((tile) => {
      return tile.organism === null;
    });
  }

  findTileToMove() {
    const newTiles = this.getTilesForAntelope(this.tile);
    if (!newTiles.length) {
      return;
    }
    return this.board.getRandomTile(newTiles);
  }
}
