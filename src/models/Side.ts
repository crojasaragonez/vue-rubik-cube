import { Cell } from "@/models";
import { SidePosition, Color } from "@/enums";

export class Side {
  public cells: Cell[][];

  constructor(public color: Color, public position: SidePosition) {
    this.cells = [
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)]
    ];
  }

  public row(row: number): Cell[] {
    if (row > 2 || row < 0) {
      return [];
    }
    return this.cells[row];
  }

  public column(col: number): Cell[] {
    if (col > 2 || col < 0) {
      return [];
    }
    return [this.cells[0][col], this.cells[1][col], this.cells[2][col]];
  }

  rotateRight() {
    this.cells = [
      [this.cells[2][0], this.cells[1][0], this.cells[0][0]],
      [this.cells[2][1], this.cells[1][1], this.cells[0][1]],
      [this.cells[2][2], this.cells[1][2], this.cells[0][2]]
    ];
  }

  rotateLeft() {
    this.cells = [
      [this.cells[0][2], this.cells[1][2], this.cells[2][2]],
      [this.cells[0][1], this.cells[1][1], this.cells[2][1]],
      [this.cells[0][0], this.cells[1][0], this.cells[2][0]]
    ];
  }
}
