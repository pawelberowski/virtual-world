import { Animal } from './Animal';

export class Player extends Animal {
  constructor(tile, board) {
    super(tile, board);
    this.strength = 5;
    this.initiative = 4;
    this.cssClass = 'player';
  }

  getDirection() {
    return new Promise((resolve) => {
      document.addEventListener('keypress', (event) => {
        if (event.code === 'Numpad1') {
          resolve('sw');
        }
        if (event.code === 'Numpad2') {
          resolve('s');
        }
        if (event.code === 'Numpad3') {
          resolve('se');
        }
        if (event.code === 'Numpad4') {
          resolve('w');
        }
        if (event.code === 'Numpad5') {
          resolve('skipTurn');
        }
        if (event.code === 'Numpad6') {
          resolve('e');
        }
        if (event.code === 'Numpad7') {
          resolve('nw');
        }
        if (event.code === 'Numpad8') {
          resolve('n');
        }
        if (event.code === 'Numpad9') {
          resolve('ne');
        }
      });
    });
  }

  action() {
    return new Promise((resolve) => {
      this.getDirection().then((direction) => {
        if (direction === 'skipTurn') {
          return resolve();
        }
        const newTile = this.board.probeForNewTile(direction, this.tile);
        if (newTile.organism !== null) {
          this.fight(newTile);
          return resolve();
        }
        this.board.moveOrganism(this.tile, newTile);
        return resolve();
      });
    });
  }
}
