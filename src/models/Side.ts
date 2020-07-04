import { Cell } from "@/models";
import { SidePosition, Color, Direction } from "@/enums";
import { Navigation } from "@/navigation";

export class Side {
  public cells: Cell[][];
  navigation: Navigation = new Navigation();
  constructor(public color: Color, public position: SidePosition) {
    this.cells = [
      [new Cell(color, 0, 0), new Cell(color, 0, 1), new Cell(color, 0, 2)],
      [new Cell(color, 1, 0), new Cell(color, 1, 1), new Cell(color, 1, 2)],
      [new Cell(color, 2, 0), new Cell(color, 2, 1), new Cell(color, 2, 2)]
    ];
  }

  public xCells(x: number): Cell[] {
    if (x > 2 || x < 0) {
      return [];
    }
    return this.cells[x];
  }

  public yCells(y: number): Cell[] {
    if (y > 2 || y < 0) {
      return [];
    }
    return [this.cells[0][y], this.cells[1][y], this.cells[2][y]];
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

  public next(direction: Direction) {
    return this.navigation.next(this.position, direction);
  }
}
