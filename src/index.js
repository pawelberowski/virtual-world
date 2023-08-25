import './styles.css';
import './popup.css';
import { Board } from './Board';

const board = new Board();
board.generateBoard();
board.populateBoard();
console.log(board.tileArray);

board.runGame();
