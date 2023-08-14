import './styles.css';
import { Board } from './Board';
import { Wolf } from './Wolf';
import { Sheep } from './Sheep';
import { Fox } from './Fox';

const board = new Board();
board.generateBoard();
console.log(board.tileArray);

board.addOrganism(10, 10, Sheep);
// board.addOrganism(0, 19, Fox);
board.addOrganism(11, 10, Sheep);
board.addOrganism(10, 11, Sheep);
board.addOrganism(9, 11, Sheep);
// board.addOrganism(0, 10, Fox);
board.addOrganism(1, 10, Fox);
// board.addOrganism(0, 8, Antelope);
// board.addOrganism(0, 6, Turtle);
// board.addOrganism(0, 4, Player);

board.runGame();
