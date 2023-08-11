export class Organism {
  constructor(tile, board) {
    this.tile = tile;
    this.board = board;
  }

  getRandomDirection() {
    const directionsArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    return directionsArray[Math.floor(Math.random() * directionsArray.length)];
  }

  probeForNewTile(direction) {
    let newTile = null;
    if (direction === 'e') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate + 1]?.[
          this.tile.yCoordinate
        ];
    }
    if (direction === 'se') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate + 1]?.[
          this.tile.yCoordinate + 1
        ];
    }
    if (direction === 's') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate]?.[
          this.tile.yCoordinate + 1
        ];
    }
    if (direction === 'sw') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate - 1]?.[
          this.tile.yCoordinate + 1
        ];
    }
    if (direction === 'w') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate - 1]?.[
          this.tile.yCoordinate
        ];
    }
    if (direction === 'nw') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate - 1]?.[
          this.tile.yCoordinate - 1
        ];
    }
    if (direction === 'n') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate]?.[
          this.tile.yCoordinate - 1
        ];
    }
    if (direction === 'ne') {
      newTile =
        this.board.tileArray[this.tile.xCoordinate + 1]?.[
          this.tile.yCoordinate - 1
        ];
    }
    if (!newTile) {
      console.log('no new tile in that direction');
      return this.probeForNewTile(this.getRandomDirection());
    }
    return newTile;
  }
}
