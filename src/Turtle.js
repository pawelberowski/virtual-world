import { Animal } from './Animal';

export class Turtle extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 2;
    this.initiative = 1;
    this.cssClass = 'turtle';
    this.chanceToMove = 0.25;
  }

  action() {
    return new Promise((resolve) => {
      if (Math.random() <= this.chanceToMove) {
        const newTile = this.findTileToMove();
        if (!newTile) {
          return resolve();
        }
        if (newTile.organism !== null) {
          if (newTile.organism.cssClass === this.cssClass) {
            this.mate();
            return resolve();
          } else {
            this.fight(newTile);
            return resolve();
          }
        }
        this.board.moveOrganism(this.tile, newTile);
      }
      return resolve();
    });
  }
}
