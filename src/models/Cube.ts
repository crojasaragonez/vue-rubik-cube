import { SidePosition, Color, Direction } from "@/enums";
import { Side, Cell, CubeCells, CubeSides } from "@/models";

export class Cube {
  sides: CubeSides;
  constructor() {
    this.sides = {
      front: new Side(Color.Yellow, SidePosition.Front),
      top: new Side(Color.Red, SidePosition.Top),
      bottom: new Side(Color.Orange, SidePosition.Bottom),
      left: new Side(Color.Green, SidePosition.Left),
      right: new Side(Color.Blue, SidePosition.Right),
      back: new Side(Color.White, SidePosition.Back)
    };
  }

  public get allSides(): Side[] {
    return [
      this.sides.front,
      this.sides.top,
      this.sides.bottom,
      this.sides.left,
      this.sides.right,
      this.sides.back
    ];
  }

  public move(side: Side, cell: Cell, direction: Direction) {
    [Direction.Right, Direction.Left].includes(direction)
      ? this.horizontalMove(side, cell, direction)
      : this.verticalMove(side, cell, direction);
  }

  private updateColors() {
    this.sides.front.cells = [...this.sides.front.cells];
    this.sides.top.cells = [...this.sides.top.cells];
    this.sides.left.cells = [...this.sides.left.cells];
    this.sides.right.cells = [...this.sides.right.cells];
    this.sides.back.cells = [...this.sides.back.cells];
    this.sides.bottom.cells = [...this.sides.bottom.cells];
  }

  private horizontalMove(side: Side, cell: Cell, direction: Direction) {
    const original: CubeCells = {
      front: this.sides.front.xCells(cell.x),
      right: this.sides.right.xCells(cell.x),
      back: this.sides.back.xCells(cell.x),
      left: this.sides.left.xCells(cell.x),
      top: this.sides.top.xCells(cell.x),
      bottom: this.sides.bottom.xCells(cell.x)
    };
    if (cell.isFirstRow) {
      direction == Direction.Right
        ? this.sides.top.rotateLeft()
        : this.sides.top.rotateRight();
    } else if (cell.isLastRow) {
      direction == Direction.Right
        ? this.sides.bottom.rotateLeft()
        : this.sides.bottom.rotateRight();
    }
    //rotates the cube in x position 4 times
    Array.from({ length: 4 }, () => {
      const nextSide = side.next(direction);
      side.cells[cell.x] = original[nextSide];
      side = this.sides[nextSide];
    });
    this.updateColors();
  }

  private verticalMove(side: Side, cell: Cell, direction: Direction) {
    const original: CubeCells = {
      front: this.sides.front.yCells(cell.y),
      right: this.sides.right.yCells(cell.y),
      back: this.sides.back.yCells(cell.y),
      left: this.sides.left.yCells(cell.y),
      top: this.sides.top.yCells(cell.y),
      bottom: this.sides.bottom.yCells(cell.y)
    };
    if (cell.isFirstColumn) {
      const sideToRotate = this.sides[side.next(Direction.Right)];
      direction == Direction.Up
        ? sideToRotate.rotateLeft()
        : sideToRotate.rotateRight();
    } else if (cell.isLastColumn) {
      const sideToRotate = this.sides[side.next(Direction.Left)];
      direction == Direction.Up
        ? sideToRotate.rotateRight()
        : sideToRotate.rotateLeft();
    }
    //rotates the cube in y position 4 times
    Array.from({ length: 4 }, () => {
      const nextSide = side.next(direction);
      [0, 1, 2].forEach(i => (side.cells[i][cell.y] = original[nextSide][i]));
      side = this.sides[nextSide];
    });
    this.updateColors();
  }
}
