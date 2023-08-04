import { Tile } from './Tile';

export class Board {
  constructor() {
    this.heigth = 20;
    this.width = 20;
    this.tileArray = [];
  }

  generateBoard() {
    const board = document.querySelector('.board-container');
    for (let yCoordinate = 0; yCoordinate < this.width; yCoordinate++) {
      for (let xCoordinate = 0; xCoordinate < this.heigth; xCoordinate++) {
        const tile = new Tile(xCoordinate, yCoordinate);
        this.tileArray[xCoordinate] = this.tileArray[xCoordinate] || [];
        this.tileArray[xCoordinate][yCoordinate] = tile;
        board.append(tile.tileDiv);
      }
    }
  }

  moveOrganism(xCoordinate, yCoordinate) {
    const tile = this.tileArray[xCoordinate][yCoordinate];
    const newTile = this.tileArray[xCoordinate + 1][yCoordinate];
    newTile.setOrganism(tile.organism);
    tile.removeOrganism();
  }
}
