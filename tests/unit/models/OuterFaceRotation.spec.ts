import { describe, it, expect } from "vitest";
import { Cube, Side } from "@/models";
import { Color, Direction } from "@/enums";
import {
  paintSide,
  sideColors,
  TRACKING_PATTERN,
  rotatePatternLeft,
  rotatePatternRight
} from "../helper";

function paintAllFaces(cube: Cube) {
  const centers = [
    Color.Red,
    Color.Orange,
    Color.Yellow,
    Color.Green,
    Color.Blue,
    Color.White
  ];
  cube.allSides.forEach((side, index) => {
    paintSide(side, TRACKING_PATTERN);
    // Make each face's middle row unique so belt cycles are observable.
    side.cells[1][0].color = centers[index];
    side.cells[1][1].color = centers[index];
    side.cells[1][2].color = centers[index];
  });
}

function faceSnapshot(side: Side) {
  return JSON.stringify(sideColors(side));
}

describe("Outer face rotation (phase 3)", () => {
  it("rotates the top face on an outer Y-layer turn", () => {
    const cube = new Cube();
    paintSide(cube.sides.top, TRACKING_PATTERN);
    cube.move(cube.sides.front, 0, 1, Direction.Right);
    expect(sideColors(cube.sides.top)).toEqual(
      rotatePatternLeft(TRACKING_PATTERN)
    );
  });

  it("rotates the bottom face on an outer Y-layer turn", () => {
    const cube = new Cube();
    paintSide(cube.sides.bottom, TRACKING_PATTERN);
    cube.move(cube.sides.front, 2, 1, Direction.Right);
    expect(sideColors(cube.sides.bottom)).toEqual(
      rotatePatternLeft(TRACKING_PATTERN)
    );
  });

  it("rotates the left face on an outer X-layer turn", () => {
    const cube = new Cube();
    paintSide(cube.sides.left, TRACKING_PATTERN);
    cube.move(cube.sides.front, 1, 0, Direction.Up);
    expect(sideColors(cube.sides.left)).toEqual(
      rotatePatternLeft(TRACKING_PATTERN)
    );
  });

  it("rotates the right face on an outer X-layer turn", () => {
    const cube = new Cube();
    paintSide(cube.sides.right, TRACKING_PATTERN);
    cube.move(cube.sides.front, 1, 2, Direction.Up);
    expect(sideColors(cube.sides.right)).toEqual(
      rotatePatternRight(TRACKING_PATTERN)
    );
  });

  it("rotates the front face on an outer Z-layer turn", () => {
    const cube = new Cube();
    paintSide(cube.sides.front, TRACKING_PATTERN);
    // Top row 2 Right => turnZ(layer 0) clockwise
    cube.move(cube.sides.top, 2, 1, Direction.Right);
    expect(sideColors(cube.sides.front)).toEqual(
      rotatePatternRight(TRACKING_PATTERN)
    );
  });

  it("rotates the back face on an outer Z-layer turn", () => {
    const cube = new Cube();
    paintSide(cube.sides.back, TRACKING_PATTERN);
    // Top row 0 Right => turnZ(layer 2)
    cube.move(cube.sides.top, 0, 1, Direction.Right);
    expect(sideColors(cube.sides.back)).toEqual(
      rotatePatternLeft(TRACKING_PATTERN)
    );
  });

  it("does not rotate top/bottom on a middle Y-layer turn", () => {
    const cube = new Cube();
    paintAllFaces(cube);
    const topBefore = faceSnapshot(cube.sides.top);
    const bottomBefore = faceSnapshot(cube.sides.bottom);
    const frontMiddleBefore = sideColors(cube.sides.front)[1];

    cube.move(cube.sides.front, 1, 0, Direction.Right);

    // Outer faces on this axis stay untouched (no face spin, no belt).
    expect(faceSnapshot(cube.sides.top)).toBe(topBefore);
    expect(faceSnapshot(cube.sides.bottom)).toBe(bottomBefore);
    // Belt did move.
    expect(sideColors(cube.sides.front)[1]).not.toEqual(frontMiddleBefore);
  });

  it("does not rotate any face on a middle X-layer turn", () => {
    const cube = new Cube();
    paintAllFaces(cube);
    const leftBefore = faceSnapshot(cube.sides.left);
    const rightBefore = faceSnapshot(cube.sides.right);
    cube.move(cube.sides.front, 0, 1, Direction.Up);
    expect(faceSnapshot(cube.sides.left)).toBe(leftBefore);
    expect(faceSnapshot(cube.sides.right)).toBe(rightBefore);
  });

  it("does not rotate front/back on a middle Z-layer turn", () => {
    const cube = new Cube();
    paintAllFaces(cube);
    const frontBefore = faceSnapshot(cube.sides.front);
    const backBefore = faceSnapshot(cube.sides.back);
    // Top middle row Right => turnZ(layer 1)
    cube.move(cube.sides.top, 1, 0, Direction.Right);
    expect(faceSnapshot(cube.sides.front)).toBe(frontBefore);
    expect(faceSnapshot(cube.sides.back)).toBe(backBefore);
  });
});
