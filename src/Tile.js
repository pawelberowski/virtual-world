export class Tile {
  constructor() {
    this.tileDiv = document.createElement('div');
    this.tileDiv.classList.add('tile');
    this.organism = null;
  }

  setOrganism(organism) {
    this.organism = organism;
    this.tileDiv.classList.add(this.organism.cssClass);
  }

  removeOrganism() {
    this.organism = null;
  }
}
