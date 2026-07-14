import { Side, Cell } from "@/models";
import { Color } from "@/enums";

export function sideColors(side: Side) {
  return side.cells.map(row => row.map(cell => cell.color));
}

/** Visual grid indices — always match array position. */
export function sidePositions(side: Side) {
  return side.cells.map((row, x) => row.map((_, y) => `${x}${y}`));
}

/** Paint a side with a unique color pattern so rotations are observable. */
export function paintSide(side: Side, pattern: Color[][]) {
  side.cells = pattern.map(row => row.map(color => new Cell(color)));
}

export const TRACKING_PATTERN: Color[][] = [
  [Color.Red, Color.Orange, Color.Yellow],
  [Color.Green, Color.Blue, Color.White],
  [Color.Yellow, Color.Green, Color.Orange]
];

export function rotatePatternLeft(pattern: Color[][]): Color[][] {
  return [
    [pattern[0][2], pattern[1][2], pattern[2][2]],
    [pattern[0][1], pattern[1][1], pattern[2][1]],
    [pattern[0][0], pattern[1][0], pattern[2][0]]
  ];
}

export function rotatePatternRight(pattern: Color[][]): Color[][] {
  return [
    [pattern[2][0], pattern[1][0], pattern[0][0]],
    [pattern[2][1], pattern[1][1], pattern[0][1]],
    [pattern[2][2], pattern[1][2], pattern[0][2]]
  ];
}

export function colorSnapshot(sides: {
  front: Side;
  top: Side;
  bottom: Side;
  left: Side;
  right: Side;
  back: Side;
}) {
  return JSON.stringify({
    front: sideColors(sides.front),
    top: sideColors(sides.top),
    bottom: sideColors(sides.bottom),
    left: sideColors(sides.left),
    right: sideColors(sides.right),
    back: sideColors(sides.back)
  });
}
