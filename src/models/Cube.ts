import { SidePosition, Color, Direction } from "@/enums";
import { Side, Cell } from "@/models";
import type { CubeSides } from "@/models";

type Axis = "x" | "y" | "z";
type LayerKey = "row" | "col" | "2-row" | "2-col";
type Strip = { get: () => Color[]; set: (colors: Color[]) => void };

const TURN: Record<
  SidePosition,
  {
    h: { axis: Axis; layer: LayerKey; cw: Direction };
    v: { axis: Axis; layer: LayerKey; cw: Direction };
  }
> = {
  [SidePosition.Front]: {
    h: { axis: "y", layer: "row", cw: Direction.Right },
    v: { axis: "x", layer: "col", cw: Direction.Down }
  },
  [SidePosition.Back]: {
    h: { axis: "y", layer: "row", cw: Direction.Left },
    v: { axis: "x", layer: "2-col", cw: Direction.Up }
  },
  [SidePosition.Left]: {
    h: { axis: "y", layer: "row", cw: Direction.Right },
    v: { axis: "z", layer: "2-col", cw: Direction.Up }
  },
  [SidePosition.Right]: {
    h: { axis: "y", layer: "row", cw: Direction.Right },
    v: { axis: "z", layer: "col", cw: Direction.Down }
  },
  [SidePosition.Top]: {
    h: { axis: "z", layer: "2-row", cw: Direction.Right },
    v: { axis: "x", layer: "col", cw: Direction.Down }
  },
  [SidePosition.Bottom]: {
    h: { axis: "z", layer: "row", cw: Direction.Right },
    v: { axis: "x", layer: "col", cw: Direction.Down }
  }
};

function layerIndex(key: LayerKey, row: number, col: number): number {
  switch (key) {
    case "row":
      return row;
    case "col":
      return col;
    case "2-row":
      return 2 - row;
    case "2-col":
      return 2 - col;
  }
}

function reverse(colors: Color[]): Color[] {
  return [...colors].reverse();
}

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
    const { front, top, bottom, left, right, back } = this.sides;
    return [front, top, bottom, left, right, back];
  }

  public move(side: Side, row: number, col: number, direction: Direction) {
    const horizontal =
      direction === Direction.Left || direction === Direction.Right;
    const spec = TURN[side.position][horizontal ? "h" : "v"];
    this.turn(spec.axis, layerIndex(spec.layer, row, col), direction === spec.cw);
  }

  private turn(axis: Axis, layer: number, clockwise: boolean) {
    const { front, top, bottom, left, right, back } = this.sides;

    if (axis === "x") {
      // Looking from Right: Front → Bottom → Back → Top. Back col is mirrored.
      this.cycle(
        [
          this.col(front, layer),
          this.col(bottom, layer),
          this.col(back, 2 - layer),
          this.col(top, layer)
        ],
        clockwise,
        [true, true, true, true]
      );
    } else if (axis === "y") {
      // Looking down: Front → Right → Back → Left. Reverse to/from Back.
      this.cycle(
        [
          this.row(front, layer),
          this.row(right, layer),
          this.row(back, layer),
          this.row(left, layer)
        ],
        clockwise,
        clockwise ? [false, false, true, true] : [false, true, true, false]
      );
    } else {
      // Looking from Front: Top → Right → Bottom → Left.
      const evenFlips = [true, false, true, false];
      const flips =
        (layer === 2) === clockwise
          ? evenFlips.map(f => !f)
          : evenFlips;
      this.cycle(
        [
          this.row(top, 2 - layer),
          this.col(right, layer),
          this.row(bottom, layer),
          this.col(left, 2 - layer)
        ],
        clockwise,
        flips
      );
    }

    if (layer === 0 || layer === 2) {
      this.rotateOuterFace(axis, layer, clockwise);
    }
  }

  /** Cycle 4 strips; `flips[i]` reverses colors written into strip i. */
  private cycle(strips: Strip[], clockwise: boolean, flips: boolean[]) {
    const src = strips.map(s => s.get());
    for (let i = 0; i < 4; i++) {
      const from = clockwise ? (i + 3) % 4 : (i + 1) % 4;
      const colors = flips[i] ? reverse(src[from]) : src[from];
      strips[i].set(colors);
    }
  }

  private rotateOuterFace(axis: Axis, layer: number, clockwise: boolean) {
    const { front, back, left, right, top, bottom } = this.sides;
    const face =
      axis === "x"
        ? layer === 0
          ? left
          : right
        : axis === "y"
          ? layer === 0
            ? top
            : bottom
          : layer === 0
            ? front
            : back;

    // Outer faces on the far side of an axis (and both Y faces) are mirrored.
    const mirrored =
      axis === "y" || (axis === "x" && layer === 2) || (axis === "z" && layer === 2);
    face.rotate(mirrored ? !clockwise : clockwise);
  }

  private row(side: Side, index: number): Strip {
    return {
      get: () => side.cells[index].map(cell => cell.color),
      set: colors => {
        side.cells[index] = colors.map(color => new Cell(color));
      }
    };
  }

  private col(side: Side, index: number): Strip {
    return {
      get: () => [0, 1, 2].map(r => side.cells[r][index].color),
      set: colors => {
        for (let r = 0; r < 3; r++) {
          side.cells[r][index] = new Cell(colors[r]);
        }
      }
    };
  }
}
