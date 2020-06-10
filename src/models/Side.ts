import { Cell } from './Cell';
import { SidePosition, Color } from '../enums';

class Side {
  cells: Cell[][];
  constructor(color: Color, public position: SidePosition) {
    this.cells = [
      [new Cell(color, 0, 0), new Cell(color, 0, 1), new Cell(color, 0, 2)],
      [new Cell(color, 1, 0), new Cell(color, 1, 1), new Cell(color, 1, 2)],
      [new Cell(color, 2, 0), new Cell(color, 2, 1), new Cell(color, 2, 2)],
    ];
  }

  rotateLeft() {
    this.cells = [
      [this.cells[2][0], this.cells[1][0], this.cells[0][0]],
      [this.cells[2][1], this.cells[1][1], this.cells[0][1]],
      [this.cells[2][2], this.cells[1][2], this.cells[0][2]]
    ];
  }

  rotateRight() {
    this.cells = [
      [this.cells[0][2], this.cells[1][2], this.cells[2][2]],
      [this.cells[0][1], this.cells[1][1], this.cells[2][1]],
      [this.cells[0][0], this.cells[1][0], this.cells[2][0]]
    ];
  }
}
