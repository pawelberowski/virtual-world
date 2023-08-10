import { Organism } from './Organism';

export class Animal extends Organism {
  constructor(tile, board) {
    super();
    this.tile = tile;
    this.board = board;
  }

  action() {
    this.board.moveOrganism('e', this.tile.xCoordinate, this.tile.yCoordinate);
  }
}
