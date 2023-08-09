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
const testWolf = new Wolf(board.tileArray[0][14], board);
const testSheep = new Sheep(board.tileArray[0][12], board);
const testFox = new Fox(board.tileArray[0][10], board);
const testAntelope = new Antelope(board.tileArray[0][8], board);
const testTurtle = new Turtle(board.tileArray[0][6], board);
const testPlayer = new Player(board.tileArray[0][4], board);

board.tileArray[0][14].setOrganism(testWolf);
board.tileArray[0][12].setOrganism(testSheep);
board.tileArray[0][10].setOrganism(testFox);
board.tileArray[0][8].setOrganism(testAntelope);
board.tileArray[0][6].setOrganism(testTurtle);
board.tileArray[0][4].setOrganism(testPlayer);

testWolf.action('s');
testWolf.action('se');
testWolf.action('se');
testSheep.action('e');
testSheep.action('e');
