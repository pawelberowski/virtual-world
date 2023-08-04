export class Tile {
  constructor(tileId) {
    this.organism = null;
    this.tileDiv = document.getElementById(tileId);
  }

  setOrganism(organism) {
    this.organism = organism;
    this.tileDiv.classList.add(this.organism.cssClass);
  }

  removeOrganism() {
    this.organism = null;
  }
}
