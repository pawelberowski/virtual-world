export class Board {
  generateBoard() {
    const board = document.createElement('div');
    board.classList.add('board-container');
    for (let i = 0; i < 400; i++) {
      const tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      tileElement.id = i.toString();
      board.append(tileElement);
    }
    document.body.append(board);
  }
}
