import { Cell } from "./Cell";
import { SidePosition, Color } from "../enums";

export class Side {
  public cells: Cell[][];
  constructor(public color: Color, public position: SidePosition) {
    this.cells = [
      [new Cell(color, 0, 0), new Cell(color, 0, 1), new Cell(color, 0, 2)],
      [new Cell(color, 1, 0), new Cell(color, 1, 1), new Cell(color, 1, 2)],
      [new Cell(color, 2, 0), new Cell(color, 2, 1), new Cell(color, 2, 2)]
    ];
  }
}
