import { Animal } from './Animal';

export class Wolf extends Animal {
  constructor() {
    super();
    this.strength = 9;
    this.initiative = 5;
    this.image = './images/wolf.png';
  }
}
