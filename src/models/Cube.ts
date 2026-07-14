import { SidePosition, Color, Direction } from "@/enums";
import { Side, Cell } from "@/models";
import type { CubeSides } from "@/models";

type Axis = "x" | "y" | "z";

/**
 * Face coordinates are always as seen from outside that face:
 * row 0 = top edge, col 0 = left edge.
 *
 * Face orientation relative to the cube:
 * - Front: up=Top, down=Bottom, left=Left, right=Right
 * - Back:  up=Top, down=Bottom, left=Right, right=Left
 * - Left:  up=Top, down=Bottom, left=Back, right=Front
 * - Right: up=Top, down=Bottom, left=Front, right=Back
 * - Top:   up=Back, down=Front, left=Left, right=Right
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
        return horizontal
          ? {
              axis: "y",
              layer: row,
              // Back is mirrored left/right relative to front.
              clockwise: direction === Direction.Left
            }
          : {
              axis: "x",
              layer: 2 - col,
              clockwise: direction === Direction.Down
            };
      case SidePosition.Left:
        return horizontal
          ? {
              axis: "y",
              layer: row,
              clockwise: direction === Direction.Right
            }
          : {
              // Looking at left: col 0 = Back, col 2 = Front
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
              // Looking at right: col 0 = Front, col 2 = Back
              axis: "z",
              layer: col,
              clockwise: direction === Direction.Down
            };
      case SidePosition.Top:
        return horizontal
          ? {
              // Looking down: row 0 = Back, row 2 = Front
              axis: "z",
              layer: 2 - row,
              clockwise: direction === Direction.Right
            }
          : {
              axis: "x",
              layer: col,
              clockwise: direction === Direction.Up
            };
      case SidePosition.Bottom:
        return horizontal
          ? {
              // Looking at bottom: row 0 = Front, row 2 = Back
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

    // Phase 3: only outer layers spin the face 3×3; middle slices are belt-only.
    if (layer === 0 || layer === 2) {
      this.rotateOuterFace(axis, layer, clockwise);
    }
  }

  /**
   * Rotate the outer face that belongs to this axis/layer.
   * Sense is chosen so CW matches the belt cycle for that axis.
   */
  private rotateOuterFace(axis: Axis, layer: number, clockwise: boolean) {
    const { front, back, left, right, top, bottom } = this.sides;

    if (axis === "x") {
      const face = layer === 0 ? left : right;
      // From +X: CW belt matches left.rotateRight / right.rotateLeft
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
      // Matches legacy front-row turns: CW => face.rotateLeft
      if (clockwise) {
        face.rotateLeft();
      } else {
        face.rotateRight();
      }
      return;
    }

    // axis === "z"
    const face = layer === 0 ? front : back;
    if (layer === 0) {
      if (clockwise) {
        face.rotateRight();
      } else {
        face.rotateLeft();
      }
    } else if (clockwise) {
      // Back is viewed from the opposite side of the Z axis.
      face.rotateLeft();
    } else {
      face.rotateRight();
    }
  }

  /**
   * Rotate around the left-right axis.
   * layer 0 = Left face, layer 2 = Right face.
   * clockwise when looking from Right toward Left.
   *
   * Matches legacy front vertical moves when inverted via resolveTurn:
   * front Up => turnX(col, clockwise=false).
   */
  private turnX(layer: number, clockwise: boolean) {
    const { front, top, back, bottom } = this.sides;
    const f = this.colorsOfColumn(front, layer);
    const t = this.colorsOfColumn(top, layer);
    const b = this.colorsOfColumn(back, layer);
    const d = this.colorsOfColumn(bottom, layer);

    if (clockwise) {
      // Looking from +X (right): Front → Bottom → Back → Top → Front
      this.setColumnColors(front, layer, t);
      this.setColumnColors(bottom, layer, f);
      this.setColumnColors(back, layer, d);
      this.setColumnColors(top, layer, b);
    } else {
      // Front → Top → Back → Bottom → Front (legacy front Up)
      this.setColumnColors(front, layer, d);
      this.setColumnColors(bottom, layer, b);
      this.setColumnColors(back, layer, t);
      this.setColumnColors(top, layer, f);
    }
  }

  /**
   * Rotate around the top-bottom axis.
   * layer 0 = Top face, layer 2 = Bottom face.
   * clockwise when looking from Top toward Bottom.
   *
   * Matches legacy front horizontal Right when clockwise=true.
   */
  private turnY(layer: number, clockwise: boolean) {
    const { front, right, back, left } = this.sides;
    const f = this.colorsOfRow(front, layer);
    const r = this.colorsOfRow(right, layer);
    const b = this.colorsOfRow(back, layer);
    const l = this.colorsOfRow(left, layer);

    if (clockwise) {
      // Front → Right → Back → Left → Front
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
   * layer 0 = Front face, layer 2 = Back face.
   * clockwise when looking from Front toward Back.
   * Belt only — outer face spin is handled by rotateOuterFace.
   */
  private turnZ(layer: number, clockwise: boolean) {
    const { top, bottom, left, right } = this.sides;

    if (layer === 0) {
      // Ring around Front: Top.row2, Right.col0, Bottom.row0, Left.col2
      const u = this.colorsOfRow(top, 2);
      const r = this.colorsOfColumn(right, 0);
      const d = this.colorsOfRow(bottom, 0);
      const l = this.colorsOfColumn(left, 2);

      if (clockwise) {
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
      // Ring around Back: Top.row0, Left.col0, Bottom.row2, Right.col2
      const u = this.colorsOfRow(top, 0);
      const l = this.colorsOfColumn(left, 0);
      const d = this.colorsOfRow(bottom, 2);
      const r = this.colorsOfColumn(right, 2);

      if (clockwise) {
        this.setRowColors(top, 0, r);
        this.setColumnColors(right, 2, this.reverse(d));
        this.setRowColors(bottom, 2, l);
        this.setColumnColors(left, 0, this.reverse(u));
      } else {
        this.setRowColors(top, 0, this.reverse(l));
        this.setColumnColors(left, 0, d);
        this.setRowColors(bottom, 2, this.reverse(r));
        this.setColumnColors(right, 2, u);
      }
      return;
    }

    // Middle slice S (between front and back) — belt only
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
