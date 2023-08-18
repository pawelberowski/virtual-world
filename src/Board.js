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

  getRandomDirection() {
    const directionsArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    return directionsArray[Math.floor(Math.random() * directionsArray.length)];
  }

  getTileWithCoordinates(xCoordinate, yCoordinate) {
    return this.tileArray[xCoordinate]?.[yCoordinate];
  }

  probeForNewTile(direction, tile) {
    if (direction === 'e') {
      return this.getTileWithCoordinates(
        tile.xCoordinate + 1,
        tile.yCoordinate,
      );
    }
    if (direction === 'se') {
      return this.getTileWithCoordinates(
        tile.xCoordinate + 1,
        tile.yCoordinate + 1,
      );
    }
    if (direction === 's') {
      return this.getTileWithCoordinates(
        tile.xCoordinate,
        tile.yCoordinate + 1,
      );
    }
    if (direction === 'sw') {
      return this.getTileWithCoordinates(
        tile.xCoordinate - 1,
        tile.yCoordinate + 1,
      );
    }
    if (direction === 'w') {
      return this.getTileWithCoordinates(
        tile.xCoordinate - 1,
        tile.yCoordinate,
      );
    }
    if (direction === 'nw') {
      return this.getTileWithCoordinates(
        tile.xCoordinate - 1,
        tile.yCoordinate - 1,
      );
    }
    if (direction === 'n') {
      return this.getTileWithCoordinates(
        tile.xCoordinate,
        tile.yCoordinate - 1,
      );
    }
    if (direction === 'ne') {
      return this.getTileWithCoordinates(
        tile.xCoordinate + 1,
        tile.yCoordinate - 1,
      );
    }
  }

  getTilesAround(tile) {
    const directionsArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    return directionsArray.reduce((result, direction) => {
      const newTile = this.probeForNewTile(direction, tile);
      if (newTile) {
        result.push(newTile);
      }
      return result;
    }, []);
  }

  getEmptyTilesAround(tile) {
    return this.getTilesAround(tile).filter((tile) => {
      return tile.organism === null;
    });
  }

  getRandomTile(tilesArray) {
    return tilesArray[Math.floor(Math.random() * tilesArray.length)];
  }

  addOrganism(xCoordinate, yCoordinate, organismConstructor) {
    const tile = this.tileArray[xCoordinate][yCoordinate];
    const organism = new organismConstructor(tile, this);
    tile.setOrganism(organism);
    this.orderedOrganisms.push(organism);
  }

  runActions = (currentIndex = 0) => {
    if (currentIndex >= this.orderedOrganisms.length) {
      return Promise.resolve(); // Base case: All actions completed
    }

    const organism = this.orderedOrganisms[currentIndex];

    return organism.action().then(() => {
      return this.runActions(currentIndex + 1); // Recursively move to the next action
    });
  };

  playTurn = () => {
    this.orderedOrganisms.sort(function (organismOne, organismTwo) {
      return organismTwo.initiative - organismOne.initiative;
    });
    return this.runActions();
  };

  runGame() {
    this.playTurn()
      .then(() => {
        return new Promise((resolve) => setTimeout(resolve, 1000));
      })
      .then(() => {
        return this.runGame();
      });
  }

  moveOrganism(currentTile, newTile) {
    newTile.setOrganism(currentTile.organism);
    currentTile.organism.tile = newTile;
    currentTile.removeOrganism();
  }
}
