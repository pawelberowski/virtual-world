import { Organism } from './Organism';
import { Plant } from './Plant';

export class Animal extends Organism {
  constructor(tile, board) {
    super(tile, board);
  }

  fight(newTile) {
    console.log(this, 'Attacked!', newTile.organism);
    const organismToFightWith = newTile.organism;
    if (!organismToFightWith) {
      return;
    }
    if (this.strength > organismToFightWith.strength) {
      if (this.strength < 5 && organismToFightWith.cssClass === 'turtle') {
        console.log('turtle defended itself');
        return;
      }
      this.board.removeOrganism(organismToFightWith);
      if (organismToFightWith instanceof Plant) {
        organismToFightWith.getEaten(this);
      }
      if (this.tile.organism) {
        this.board.moveOrganism(this.tile, newTile);
      }
      return;
    }
    if (this.strength < organismToFightWith.strength) {
      this.board.orderedOrganisms.splice(
        this.board.orderedOrganisms.indexOf(this),
        1,
      );
      this.tile.removeOrganism();
    }
  }

  mate() {
    console.log('Love is in the air');
    const emptyTiles = this.board.getEmptyTilesAround(this.tile);
    if (!emptyTiles.length) {
      return;
    }
    const emptyTile = this.board.getRandomTile(emptyTiles);
    this.board.addOrganism(
      emptyTile.xCoordinate,
      emptyTile.yCoordinate,
      this.constructor,
    );
  }

  findTileToMove() {
    const newTile = this.board.probeForNewTile(
      this.board.getRandomDirection(),
      this.tile,
    );
    if (!newTile) {
      return this.findTileToMove();
    }
    return newTile;
  }

  action() {
    return new Promise((resolve) => {
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
      return resolve();
    });
  }
}
