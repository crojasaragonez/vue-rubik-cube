import { Cell } from "@/models";
import { SidePosition, Color } from "@/enums";

export class Side {
  public cells: Cell[][];

  constructor(public color: Color, public position: SidePosition) {
    this.cells = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => new Cell(color))
    );
  }

  public row(row: number): Cell[] {
    return row >= 0 && row <= 2 ? this.cells[row] : [];
  }

  public column(col: number): Cell[] {
    if (col < 0 || col > 2) {
      return [];
    }
    return [this.cells[0][col], this.cells[1][col], this.cells[2][col]];
  }

  /** Clockwise face turn (as drawn in the 2D/3D face grid). */
  rotate(clockwise: boolean) {
    const c = this.cells;
    this.cells = clockwise
      ? [
          [c[2][0], c[1][0], c[0][0]],
          [c[2][1], c[1][1], c[0][1]],
          [c[2][2], c[1][2], c[0][2]]
        ]
      : [
          [c[0][2], c[1][2], c[2][2]],
          [c[0][1], c[1][1], c[2][1]],
          [c[0][0], c[1][0], c[2][0]]
        ];
  }

  rotateRight() {
    this.rotate(true);
  }

  rotateLeft() {
    this.rotate(false);
  }
}
