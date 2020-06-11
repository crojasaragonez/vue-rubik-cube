import { Side } from './Side';
import { SidePosition, Color } from '../enums';

export class Cube {
  sides: any
  rotateX = -18;
  rotateY = 36;
  constructor() {
    this.sides = {
      front: new Side(Color.Yellow, SidePosition.Front),
      top: new Side(Color.Red, SidePosition.Top),
      bottom: new Side(Color.Orange, SidePosition.Bottom),
      left: new Side(Color.Green, SidePosition.Left),
      right: new Side(Color.Blue, SidePosition.Right),
      back: new Side(Color.White, SidePosition.Back),
    }
  }

  allSides() {
    return [this.sides.front, this.sides.top, this.sides.bottom, this.sides.left, this.sides.right, this.sides.back];
  }
}
