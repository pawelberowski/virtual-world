import { Organism } from './Organism';

export class Animal extends Organism {
  constructor(tile, board) {
    super();
    this.tile = tile;
    this.board = board;
  }

  getRandomDirection() {
    const directionsArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    return directionsArray[Math.floor(Math.random() * directionsArray.length)];
  }

  action() {
    this.board.moveOrganism(
      this.getRandomDirection(),
      this.tile.xCoordinate,
      this.tile.yCoordinate,
    );
  }
}
