import './styles.css';
import { Board } from './Board';
import { Wolf } from './Wolf';
import { Sheep } from './Sheep';
import { Fox } from './Fox';
import { Antelope } from './Antelope';
import { Turtle } from './Turtle';
import { Player } from './Player';

const board = new Board();
board.generateBoard();
console.log(board.tileArray);

board.addOrganism(0, 14, Wolf);
board.addOrganism(0, 12, Sheep);
board.addOrganism(0, 10, Fox);
board.addOrganism(0, 8, Antelope);
board.addOrganism(0, 6, Turtle);
board.addOrganism(0, 4, Player);

board.runGame();
