import { Tile } from './Tile';

export class Board {
  constructor() {
    this.heigth = 20;
    this.width = 20;
    this.tileArray = [];
    this.orderedOrganisms = [];
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

  addOrganism(xCoordinate, yCoordinate, organismConstructor) {
    const tile = this.tileArray[xCoordinate][yCoordinate];
    const organism = new organismConstructor(tile, this);
    tile.setOrganism(organism);
    this.orderedOrganisms.push(organism);
  }

  playTurn = () => {
    this.orderedOrganisms.sort(function (organismOne, organismTwo) {
      return organismTwo.initiative - organismOne.initiative;
    });
    this.orderedOrganisms.forEach(function (organism) {
      organism.action();
    });
  };

  runGame() {
    setInterval(this.playTurn, 1000);
  }

  moveOrganism(currentTile, newTile) {
    newTile.setOrganism(currentTile.organism);
    currentTile.organism.tile = newTile;
    currentTile.removeOrganism();
  }
}
