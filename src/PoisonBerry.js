import { Plant } from './Plant';

export class PoisonBerry extends Plant {
  constructor(tile, board) {
    super(tile, board);
    this.cssClass = 'poison-berry';
  }

  getEaten(eatingOrganism) {
    this.board.removeOrganism(eatingOrganism);
  }
}
