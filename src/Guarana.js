import { Plant } from './Plant';

export class Guarana extends Plant {
  constructor(tile, board) {
    super(tile, board);
    this.cssClass = 'guarana';
  }

  getEaten(eatingOrganism) {
    eatingOrganism.strength += 3;
  }
}
