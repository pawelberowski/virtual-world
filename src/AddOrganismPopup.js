import { Sheep } from './Sheep';
import { Wolf } from './Wolf';
import { Fox } from './Fox';
import { Antelope } from './Antelope';
import { Turtle } from './Turtle';
import { Grass } from './Grass';
import { Guarana } from './Guarana';
import { PoisonBerry } from './PoisonBerry';
import { SowThistle } from './SowThistle';

export class AddOrganismPopup {
  constructor(board) {
    this.board = board;
    this.container = document.querySelector('.add-organism-popup');
    this.targetTileDiv = null;
    this.organismsObject = {
      sheep: Sheep,
      wolf: Wolf,
      fox: Fox,
      antelope: Antelope,
      turtle: Turtle,
      grass: Grass,
      guarana: Guarana,
      'poison-berry': PoisonBerry,
      'sow-thistle': SowThistle,
    };
  }

  display() {
    this.container.classList.remove('hidden');
  }

  hide() {
    this.container.classList.add('hidden');
  }

  addListeners() {
    const thisPopup = this;
    thisPopup.container.addEventListener(
      'click',
      function (event) {
        console.log(event.target);
        if (event.target.id === 'cancel-button') {
          thisPopup.hide();
          return;
        }
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
          return thisPopup.addListeners();
        }
        if (isButton) {
          const organismConstructor = thisPopup.getOrganismConstructor(
            event.target.id,
          );
          thisPopup.addOrganismToBoard(organismConstructor);
          thisPopup.hide();
        }
      },
      { once: true },
    );
  }

  getTargetTileDiv(targetDiv) {
    this.targetTileDiv = targetDiv;
  }

  getOrganismConstructor(organismName) {
    return this.organismsObject[organismName];
  }

  addOrganismToBoard(organismConstructor) {
    const xCoordinate = this.targetTileDiv.id.split(',')[0];
    const yCoordinate = this.targetTileDiv.id.split(',')[1];
    this.board.addOrganism(xCoordinate, yCoordinate, organismConstructor);
  }

  generatePopup(targetDiv) {
    this.getTargetTileDiv(targetDiv);
    this.addListeners();
    this.display();
  }
}
