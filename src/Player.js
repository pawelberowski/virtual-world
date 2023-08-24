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
        const movementCodes = {
          Numpad1: 'sw',
          KeyZ: 'sw',
          Numpad2: 's',
          KeyX: 's',
          Numpad3: 'se',
          KeyC: 'se',
          Numpad4: 'w',
          KeyA: 'w',
          Numpad5: 'skipTurn',
          KeyS: 'skipTurn',
          Numpad6: 'e',
          KeyD: 'e',
          Numpad7: 'nw',
          KeyQ: 'nw',
          Numpad8: 'n',
          KeyW: 'n',
          Numpad9: 'ne',
          KeyE: 'ne',
        };
        resolve(movementCodes[event.code]);
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
