import './styles.css';
import { Board } from './Board';
import { Wolf } from './Wolf';

const board = new Board();
board.generateBoard();
console.log(board.tileArray);
const testWolf = new Wolf(board.tileArray[9][14], board);
board.tileArray[9][14].setOrganism(testWolf);
testWolf.action();
