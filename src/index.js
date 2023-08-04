import './styles.css';
import { Board } from './Board';
import { Wolf } from './Wolf';

const board = new Board();
board.generateBoard();
console.log(board.tileArray);
const testWolf = new Wolf();
board.tileArray[0].setOrganism(testWolf);
console.log(board.tileArray[0].organism);
