import { SidePosition, Color, Direction } from "@/enums";
import { Side, Cell } from "@/models";
import type { CubeSides } from "@/models";

type Axis = "x" | "y" | "z";

/**
 * Facelet coordinates (as drawn on each face DOM, row0 at top / col0 at left):
 *
 * - Front:  up=Top, down=Bottom, left=Left, right=Right
 * - Back:   stored "through-cube" (same L/R as Front when looking from the front);
 *           CSS rotateY(180) shows the outside view
 * - Left:   up=Top, down=Bottom, left=Back, right=Front
 * - Right:  up=Top, down=Bottom, left=Front, right=Back
 * - Top:    up=Back, down=Front, left=Left, right=Right
 * - Bottom: up=Front, down=Back, left=Left, right=Right
 */
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

  public move(side: Side, row: number, col: number, direction: Direction) {
    const { axis, layer, clockwise } = this.resolveTurn(
      side.position,
      row,
      col,
      direction
    );
    this.turn(axis, layer, clockwise);
  }

  private resolveTurn(
    face: SidePosition,
    row: number,
    col: number,
    direction: Direction
  ): { axis: Axis; layer: number; clockwise: boolean } {
    const horizontal =
      direction === Direction.Left || direction === Direction.Right;

    switch (face) {
      case SidePosition.Front:
        return horizontal
          ? {
              axis: "y",
              layer: row,
              clockwise: direction === Direction.Right
            }
          : {
              axis: "x",
              layer: col,
              clockwise: direction === Direction.Down
            };
      case SidePosition.Back:
        // Through-storage: Back L/R matches Front; swipe directions
        // appear mirrored when viewed from behind after CSS rotateY(180).
        return horizontal
          ? {
              axis: "y",
              layer: row,
              clockwise: direction === Direction.Left
            }
          : {
              axis: "x",
              layer: col,
              clockwise: direction === Direction.Up
            };
      case SidePosition.Left:
        return horizontal
          ? {
              axis: "y",
              layer: row,
              clockwise: direction === Direction.Right
            }
          : {
              axis: "z",
              layer: 2 - col,
              clockwise: direction === Direction.Up
            };
      case SidePosition.Right:
        return horizontal
          ? {
              axis: "y",
              layer: row,
              clockwise: direction === Direction.Right
            }
          : {
              axis: "z",
              layer: col,
              clockwise: direction === Direction.Down
            };
      case SidePosition.Top:
        return horizontal
          ? {
              axis: "z",
              layer: 2 - row,
              clockwise: direction === Direction.Right
            }
          : {
              // DOM up = toward Back (row0). That matches Front Up (!clockwise).
              axis: "x",
              layer: col,
              clockwise: direction === Direction.Down
            };
      case SidePosition.Bottom:
        return horizontal
          ? {
              axis: "z",
              layer: row,
              clockwise: direction === Direction.Right
            }
          : {
              axis: "x",
              layer: col,
              clockwise: direction === Direction.Down
            };
      default:
        return { axis: "y", layer: row, clockwise: true };
    }
  }

  private turn(axis: Axis, layer: number, clockwise: boolean) {
    if (axis === "x") {
      this.turnX(layer, clockwise);
    } else if (axis === "y") {
      this.turnY(layer, clockwise);
    } else {
      this.turnZ(layer, clockwise);
    }

    if (layer === 0 || layer === 2) {
      this.rotateOuterFace(axis, layer, clockwise);
    }
  }

  private rotateOuterFace(axis: Axis, layer: number, clockwise: boolean) {
    const { front, back, left, right, top, bottom } = this.sides;

    if (axis === "x") {
      const face = layer === 0 ? left : right;
      if (layer === 0) {
        if (clockwise) {
          face.rotateRight();
        } else {
          face.rotateLeft();
        }
      } else if (clockwise) {
        face.rotateLeft();
      } else {
        face.rotateRight();
      }
      return;
    }

    if (axis === "y") {
      const face = layer === 0 ? top : bottom;
      if (clockwise) {
        face.rotateLeft();
      } else {
        face.rotateRight();
      }
      return;
    }

    const face = layer === 0 ? front : back;
    if (layer === 0) {
      if (clockwise) {
        face.rotateRight();
      } else {
        face.rotateLeft();
      }
    } else if (clockwise) {
      face.rotateLeft();
    } else {
      face.rotateRight();
    }
  }

  /**
   * Rotate around the left-right axis.
   * layer 0 = Left, layer 2 = Right.
   * clockwise = looking from Right: Front → Bottom → Back → Top.
   * !clockwise (Front Up): Front → Top → Back → Bottom with strip reverses
   * because Top.row0 faces Back and Bottom.row0 faces Front.
   */
  private turnX(layer: number, clockwise: boolean) {
    const { front, top, back, bottom } = this.sides;
    const f = this.colorsOfColumn(front, layer);
    const u = this.colorsOfColumn(top, layer);
    const b = this.colorsOfColumn(back, layer);
    const d = this.colorsOfColumn(bottom, layer);

    if (clockwise) {
      // Front Down: inverse of Front Up
      this.setColumnColors(front, layer, this.reverse(u));
      this.setColumnColors(top, layer, this.reverse(b));
      this.setColumnColors(back, layer, this.reverse(d));
      this.setColumnColors(bottom, layer, this.reverse(f));
    } else {
      // Front Up
      this.setColumnColors(front, layer, this.reverse(d));
      this.setColumnColors(top, layer, this.reverse(f));
      this.setColumnColors(back, layer, this.reverse(u));
      this.setColumnColors(bottom, layer, this.reverse(b));
    }
  }

  /**
   * Rotate around the top-bottom axis.
   * layer 0 = Top, layer 2 = Bottom.
   * clockwise (Front Right / U'): Front → Right → Back → Left.
   * Back shares L/R with Front (through-storage); no row reverse needed.
   */
  private turnY(layer: number, clockwise: boolean) {
    const { front, right, back, left } = this.sides;
    const f = this.colorsOfRow(front, layer);
    const r = this.colorsOfRow(right, layer);
    const b = this.colorsOfRow(back, layer);
    const l = this.colorsOfRow(left, layer);

    if (clockwise) {
      this.setRowColors(front, layer, l);
      this.setRowColors(left, layer, b);
      this.setRowColors(back, layer, r);
      this.setRowColors(right, layer, f);
    } else {
      this.setRowColors(front, layer, r);
      this.setRowColors(right, layer, b);
      this.setRowColors(back, layer, l);
      this.setRowColors(left, layer, f);
    }
  }

  /**
   * Rotate around the front-back axis.
   * layer 0 = Front, layer 2 = Back.
   * clockwise = looking from Front: Top → Right → Bottom → Left.
   */
  private turnZ(layer: number, clockwise: boolean) {
    const { top, bottom, left, right } = this.sides;

    if (layer === 0) {
      const u = this.colorsOfRow(top, 2);
      const r = this.colorsOfColumn(right, 0);
      const d = this.colorsOfRow(bottom, 0);
      const l = this.colorsOfColumn(left, 2);

      if (clockwise) {
        // Top.row2 ← Left.col2 (up→down becomes right→left on top)
        this.setRowColors(top, 2, this.reverse(l));
        this.setColumnColors(right, 0, u);
        this.setRowColors(bottom, 0, this.reverse(r));
        this.setColumnColors(left, 2, d);
      } else {
        this.setRowColors(top, 2, r);
        this.setColumnColors(right, 0, this.reverse(d));
        this.setRowColors(bottom, 0, l);
        this.setColumnColors(left, 2, this.reverse(u));
      }
      return;
    }

    if (layer === 2) {
      // Ring around Back (through-storage): Top.row0, Right.col2, Bottom.row2, Left.col0
      const u = this.colorsOfRow(top, 0);
      const r = this.colorsOfColumn(right, 2);
      const d = this.colorsOfRow(bottom, 2);
      const l = this.colorsOfColumn(left, 0);

      if (clockwise) {
        // Looking from Front through the cube toward Back
        this.setRowColors(top, 0, l);
        this.setColumnColors(left, 0, this.reverse(d));
        this.setRowColors(bottom, 2, r);
        this.setColumnColors(right, 2, this.reverse(u));
      } else {
        this.setRowColors(top, 0, this.reverse(r));
        this.setColumnColors(right, 2, d);
        this.setRowColors(bottom, 2, this.reverse(l));
        this.setColumnColors(left, 0, u);
      }
      return;
    }

    // Middle slice
    const u = this.colorsOfRow(top, 1);
    const r = this.colorsOfColumn(right, 1);
    const d = this.colorsOfRow(bottom, 1);
    const l = this.colorsOfColumn(left, 1);

    if (clockwise) {
      this.setRowColors(top, 1, this.reverse(l));
      this.setColumnColors(right, 1, u);
      this.setRowColors(bottom, 1, this.reverse(r));
      this.setColumnColors(left, 1, d);
    } else {
      this.setRowColors(top, 1, r);
      this.setColumnColors(right, 1, this.reverse(d));
      this.setRowColors(bottom, 1, l);
      this.setColumnColors(left, 1, this.reverse(u));
    }
  }

  private colorsOfRow(side: Side, row: number): Color[] {
    return side.row(row).map(cell => cell.color);
  }

  private colorsOfColumn(side: Side, col: number): Color[] {
    return side.column(col).map(cell => cell.color);
  }

  private setRowColors(side: Side, row: number, colors: Color[]) {
    side.cells[row] = colors.map(color => new Cell(color));
  }

  private setColumnColors(side: Side, col: number, colors: Color[]) {
    for (let row = 0; row < 3; row++) {
      side.cells[row][col] = new Cell(colors[row]);
    }
  }

  private reverse(colors: Color[]): Color[] {
    return [...colors].reverse();
  }
}
