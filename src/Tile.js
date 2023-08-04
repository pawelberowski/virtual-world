export class Tile {
  constructor(xCoordinate, yCoordinate) {
    this.tileDiv = document.createElement('div');
    this.tileDiv.classList.add('tile');
    this.organism = null;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }

  setOrganism(organism) {
    this.organism = organism;
    this.tileDiv.classList.add(this.organism.cssClass);
  }

  removeOrganism() {
    this.tileDiv.classList.remove(this.organism.cssClass);
    this.organism = null;
  }
}
