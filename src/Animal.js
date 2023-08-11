import { Organism } from './Organism';

export class Animal extends Organism {
  constructor(tile, board) {
    super(tile, board);
  }

  fight(newTile) {
    console.log(this, 'Attacked!', newTile.organism);
    console.log(this.board.orderedOrganisms);
    if (this.strength > newTile.organism.strength) {
      this.board.orderedOrganisms.splice(
        this.board.orderedOrganisms.indexOf(newTile.organism),
        1,
      );
      newTile.removeOrganism();
      console.log(this.board.orderedOrganisms);
      this.board.moveOrganism(this.tile, newTile);
      return;
    }
    if (this.strength < newTile.organism.strength) {
      this.board.orderedOrganisms.splice(
        this.board.orderedOrganisms.indexOf(this),
        1,
      );
      this.tile.removeOrganism();
      delete this;
      console.log(this.board.orderedOrganisms);
    }
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
        this.fight(newTile);
        return;
      }
    }
    this.board.moveOrganism(this.tile, newTile);
  }
}
