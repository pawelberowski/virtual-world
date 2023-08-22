import './styles.css';
import './popup.css';
import { Board } from './Board';
import { Player } from './Player';

const board = new Board();
board.generateBoard();
console.log(board.tileArray);

board.addOrganism(10, 10, Player);

board.runGame();
