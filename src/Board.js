import { Tile } from './Tile';

export class Board {
  constructor() {
    this.tileArray = [];
  }
  generateBoard() {
    const board = document.querySelector('.board-container');
    for (let i = 0; i < 400; i++) {
      const tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      tileElement.id = `tile${i}`;
      board.append(tileElement);
      this.tileArray.push(new Tile(tileElement.id));
    }
  }
}
