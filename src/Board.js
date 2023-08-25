import { Tile } from './Tile';
import { AddOrganismPopup } from './AddOrganismPopup';
import { Player } from './Player';
import { Sheep } from './Sheep';
import { Wolf } from './Wolf';
import { Fox } from './Fox';
import { Antelope } from './Antelope';
import { Turtle } from './Turtle';
import { Grass } from './Grass';
import { Guarana } from './Guarana';
import { PoisonBerry } from './PoisonBerry';
import { SowThistle } from './SowThistle';

export class Board {
  constructor() {
    this.heigth = 20;
    this.width = 20;
    this.tileArray = [];
    this.orderedOrganisms = [];
    this.initialPopulationPercentage = 10;
    this.organismTypes = [
      Sheep,
      Wolf,
      Fox,
      Antelope,
      Turtle,
      Grass,
      Guarana,
      PoisonBerry,
      SowThistle,
    ];
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
    const addOrganismPopup = new AddOrganismPopup(this);
    board.addEventListener('click', function (event) {
      if (event.target.className === 'tile') {
        console.log(event.target);
        addOrganismPopup.generatePopup(event.target);
      }
    });
  }

  getPopulationNumber() {
    const tilesNumber = this.heigth * this.width;
    const organismsNumber = Math.floor(
      (tilesNumber * this.initialPopulationPercentage) / 100,
    );
    if (organismsNumber === tilesNumber) {
      // Leaving room for the player
      return organismsNumber - 1;
    }
    return organismsNumber;
  }

  getRandomOrganismType() {
    return this.organismTypes[
      Math.floor(Math.random() * this.organismTypes.length)
    ];
  }

  getRandomTileFromMatrix(tileArray) {
    const randomRow = Math.floor(Math.random() * tileArray.length);
    const randomColumn = Math.floor(
      Math.random() * tileArray[randomRow].length,
    );
    if (this.tileArray[randomRow][randomColumn].organism) {
      console.log('tile occupied');
      return this.getRandomTileFromMatrix(tileArray);
    }
    return tileArray[randomRow][randomColumn];
  }

  populateBoard() {
    const populationNumber = this.getPopulationNumber();
    let tileArrayCopy = [...this.tileArray];
    const organismsToCreate = [Player];
    for (let i = 0; i < populationNumber; i++) {
      const organismType = this.getRandomOrganismType();
      organismsToCreate.push(organismType);
    }
    organismsToCreate.forEach((organismType) => {
      const randomTile = this.getRandomTileFromMatrix(tileArrayCopy);
      this.addOrganism(
        randomTile.xCoordinate,
        randomTile.yCoordinate,
        organismType,
      );
      // const indexToRemove = tileArrayCopy[randomTile.xCoordinate].indexOf(randomTile);
      // tileArrayCopy[randomTile.xCoordinate].splice(indexToRemove, 1);
      // console.log(tileArrayCopy);
    });
    //create a clone array of tiles and remove a randomly selected one when picking
    //iterate over array of organisms
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

  removeOrganism(organism) {
    this.orderedOrganisms.splice(this.orderedOrganisms.indexOf(organism), 1);
    organism.tile.removeOrganism();
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
