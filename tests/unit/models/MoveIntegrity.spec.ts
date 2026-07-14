import { describe, it, expect } from "vitest";
import { Cube } from "@/models";
import { Direction, SidePosition } from "@/enums";
import { colorSnapshot } from "../helper";

const faces = [
  SidePosition.Front,
  SidePosition.Back,
  SidePosition.Left,
  SidePosition.Right,
  SidePosition.Top,
  SidePosition.Bottom
];

const directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right
];

function sideByPosition(cube: Cube, position: SidePosition) {
  return cube.allSides.find(side => side.position === position)!;
}

function snapshot(cube: Cube) {
  return colorSnapshot(cube.sides);
}

describe("Move integrity", () => {
  it("restores after 4 identical moves for every face, cell, and direction", () => {
    for (const face of faces) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          for (const direction of directions) {
            const cube = new Cube();
            const start = snapshot(cube);
            const side = sideByPosition(cube, face);
            for (let i = 0; i < 4; i++) {
              cube.move(side, row, col, direction);
            }
            expect(
              snapshot(cube),
              `${face} (${row},${col}) ${direction}`
            ).toBe(start);
          }
        }
      }
    }
  });

  it("undoes a move with the opposite direction", () => {
    const opposite: Record<Direction, Direction> = {
      [Direction.Up]: Direction.Down,
      [Direction.Down]: Direction.Up,
      [Direction.Left]: Direction.Right,
      [Direction.Right]: Direction.Left
    };

    for (const face of faces) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          for (const direction of directions) {
            const cube = new Cube();
            const start = snapshot(cube);
            const side = sideByPosition(cube, face);
            cube.move(side, row, col, direction);
            cube.move(side, row, col, opposite[direction]);
            expect(
              snapshot(cube),
              `${face} (${row},${col}) ${direction}`
            ).toBe(start);
          }
        }
      }
    }
  });

  it("keeps using visual grid indices after a face rotation", () => {
    const cube = new Cube();
    // Rotate top via front top-row right
    cube.move(cube.sides.front, 0, 0, Direction.Right);
    const before = snapshot(cube);
    // Clicking top visual (0,0) must turn Z-layer for top row 0, not a drifted cell.x
    cube.move(cube.sides.top, 0, 0, Direction.Right);
    expect(snapshot(cube)).not.toBe(before);
    // Opposite undoes
    cube.move(cube.sides.top, 0, 0, Direction.Left);
    expect(snapshot(cube)).toBe(before);
  });
});
