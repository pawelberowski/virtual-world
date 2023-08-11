import { Organism } from './Organism';

export class Animal extends Organism {
  constructor(tile, board) {
    super(tile, board);
  }

  fight() {
    console.log('Fight!');
  }

  mate() {
    console.log('Love is in the air');
  }

  action() {
    const newTile = this.probeForNewTile(this.getRandomDirection());
    if (newTile.organism !== null) {
      if (newTile.organism.cssClass === this.cssClass) {
        this.mate();
      } else {
        this.fight();
      }
    }
    this.board.moveOrganism(this.tile, newTile);
  }
}
