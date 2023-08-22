import { Sheep } from './Sheep';

export class AddOrganismPopup {
  constructor(board) {
    this.board = board;
    this.container = document.querySelector('.add-organism-popup');
    this.targetTileDiv = null;
    this.targetOrganism = null;
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
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
          return;
        }
        thisPopup.targetOrganism = event.target.innerText;
        thisPopup.addOrganismToBoard();
        thisPopup.hide();
      },
      { once: true },
    );
  }

  getTargetTileDiv(targetDiv) {
    this.targetTileDiv = targetDiv;
  }

  getOrganismConstructor() {
    if (this.targetOrganism === 'Sheep') {
      return Sheep;
    }
  }

  addOrganismToBoard() {
    const xCoordinate = this.targetTileDiv.id.split(',')[0];
    const yCoordinate = this.targetTileDiv.id.split(',')[1];
    this.board.addOrganism(
      xCoordinate,
      yCoordinate,
      this.getOrganismConstructor(),
    );
  }

  generatePopup(targetDiv) {
    this.getTargetTileDiv(targetDiv);
    this.addListeners();
    this.display();
  }
}
