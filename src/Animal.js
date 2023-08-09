import { Organism } from './Organism';

export class Animal extends Organism {
  constructor(tile, board) {
    super();
    this.tile = tile;
    this.board = board;
  }

  action(direction) {
    this.board.moveOrganism(
      direction,
      this.tile.xCoordinate,
      this.tile.yCoordinate,
    );
  }
}
