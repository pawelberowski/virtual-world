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
        if (event.code === 'Numpad1' || event.code === 'KeyZ') {
          resolve('sw');
        }
        if (event.code === 'Numpad2' || event.code === 'KeyX') {
          resolve('s');
        }
        if (event.code === 'Numpad3' || event.code === 'KeyC') {
          resolve('se');
        }
        if (event.code === 'Numpad4' || event.code === 'KeyA') {
          resolve('w');
        }
        if (event.code === 'Numpad5' || event.code === 'KeyS') {
          resolve('skipTurn');
        }
        if (event.code === 'Numpad6' || event.code === 'KeyD') {
          resolve('e');
        }
        if (event.code === 'Numpad7' || event.code === 'KeyQ') {
          resolve('nw');
        }
        if (event.code === 'Numpad8' || event.code === 'KeyW') {
          resolve('n');
        }
        if (event.code === 'Numpad9' || event.code === 'KeyE') {
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
