import { describe, it, expect } from "vitest";
import { Cube } from "@/models";
import { Color, Direction } from "@/enums";

/** Paint a column with three distinct colors (row0 → row2). */
function paintColumn(
  cube: Cube,
  face: "front" | "top" | "back" | "bottom",
  col: number,
  colors: [Color, Color, Color]
) {
  colors.forEach((color, row) => {
    cube.sides[face].cells[row][col].color = color;
  });
}

function columnColors(
  cube: Cube,
  face: "front" | "top" | "back" | "bottom",
  col: number
) {
  return [0, 1, 2].map(row => cube.sides[face].cells[row][col].color);
}

describe("Face strip remaps", () => {
  it("Front Up remaps Top/Back/Bottom with correct reverses", () => {
    const cube = new Cube();
    // Left layer: Front/Top/Bottom col 0 pair with Back col 2
    paintColumn(cube, "front", 0, [Color.Red, Color.Orange, Color.Yellow]);
    paintColumn(cube, "top", 0, [Color.Green, Color.Blue, Color.White]);
    paintColumn(cube, "back", 2, [Color.Yellow, Color.Green, Color.Blue]);
    paintColumn(cube, "bottom", 0, [Color.White, Color.Red, Color.Orange]);

    cube.move(cube.sides.front, 0, 0, Direction.Up);

    // F' = rev(D), U' = rev(F), B' = rev(U), D' = rev(B)
    expect(columnColors(cube, "front", 0)).toEqual([
      Color.Orange,
      Color.Red,
      Color.White
    ]);
    expect(columnColors(cube, "top", 0)).toEqual([
      Color.Yellow,
      Color.Orange,
      Color.Red
    ]);
    expect(columnColors(cube, "back", 2)).toEqual([
      Color.White,
      Color.Blue,
      Color.Green
    ]);
    expect(columnColors(cube, "bottom", 0)).toEqual([
      Color.Blue,
      Color.Green,
      Color.Yellow
    ]);
  });

  it("Front Down is the inverse of Front Up", () => {
    const cube = new Cube();
    paintColumn(cube, "front", 1, [Color.Red, Color.Orange, Color.Yellow]);
    paintColumn(cube, "top", 1, [Color.Green, Color.Blue, Color.White]);
    paintColumn(cube, "back", 1, [Color.Yellow, Color.Green, Color.Blue]);
    paintColumn(cube, "bottom", 1, [Color.White, Color.Red, Color.Orange]);

    const before = {
      f: columnColors(cube, "front", 1),
      u: columnColors(cube, "top", 1),
      b: columnColors(cube, "back", 1),
      d: columnColors(cube, "bottom", 1)
    };

    cube.move(cube.sides.front, 0, 1, Direction.Up);
    cube.move(cube.sides.front, 0, 1, Direction.Down);

    expect(columnColors(cube, "front", 1)).toEqual(before.f);
    expect(columnColors(cube, "top", 1)).toEqual(before.u);
    expect(columnColors(cube, "back", 1)).toEqual(before.b);
    expect(columnColors(cube, "bottom", 1)).toEqual(before.d);
  });

  it("Back face (0,0) Up turns the right-hand slice (outside view)", () => {
    const cube = new Cube();
    paintColumn(cube, "front", 2, [Color.Red, Color.Orange, Color.Yellow]);
    paintColumn(cube, "top", 2, [Color.Green, Color.Blue, Color.White]);
    // Back col0 is the physical right edge
    paintColumn(cube, "back", 0, [Color.Yellow, Color.Green, Color.Blue]);
    paintColumn(cube, "bottom", 2, [Color.White, Color.Red, Color.Orange]);
    paintColumn(cube, "front", 0, [Color.Blue, Color.Blue, Color.Blue]);

    const leftFrontBefore = columnColors(cube, "front", 0);
    cube.move(cube.sides.back, 0, 0, Direction.Up);

    // Right slice moves; left does not
    expect(columnColors(cube, "front", 0)).toEqual(leftFrontBefore);
    // Front Down on col 2: U' = rev(B) with B from back col 0
    expect(columnColors(cube, "top", 2)).toEqual([
      Color.Blue,
      Color.Green,
      Color.Yellow
    ]);
  });

  it("Top face Up moves stickers toward Back (same sense as Front Up)", () => {
    const cube = new Cube();
    paintColumn(cube, "front", 0, [Color.Red, Color.Orange, Color.Yellow]);
    paintColumn(cube, "top", 0, [Color.Green, Color.Blue, Color.White]);
    paintColumn(cube, "back", 2, [Color.Yellow, Color.Green, Color.Blue]);
    paintColumn(cube, "bottom", 0, [Color.White, Color.Red, Color.Orange]);

    // Cell (2,0) Up on Top must match Front Up, not Front Down
    cube.move(cube.sides.top, 2, 0, Direction.Up);

    expect(columnColors(cube, "top", 0)).toEqual([
      Color.Yellow,
      Color.Orange,
      Color.Red
    ]);
  });

  it("Front Right cycles F/R/B/L rows with Back L/R reversed", () => {
    const cube = new Cube();
    const mark = (face: keyof Cube["sides"], row: number, colors: Color[]) => {
      colors.forEach((color, col) => {
        cube.sides[face].cells[row][col].color = color;
      });
    };
    const rowOf = (face: keyof Cube["sides"], row: number) =>
      cube.sides[face].cells[row].map(c => c.color);

    mark("front", 0, [Color.Red, Color.Orange, Color.Yellow]);
    mark("right", 0, [Color.Green, Color.Blue, Color.White]);
    mark("back", 0, [Color.Yellow, Color.Green, Color.Blue]);
    mark("left", 0, [Color.White, Color.Red, Color.Orange]);

    cube.move(cube.sides.front, 0, 0, Direction.Right);

    // F' = L, L' = rev(B), B' = rev(R), R' = F
    expect(rowOf("front", 0)).toEqual([Color.White, Color.Red, Color.Orange]);
    expect(rowOf("left", 0)).toEqual([Color.Blue, Color.Green, Color.Yellow]);
    expect(rowOf("back", 0)).toEqual([Color.White, Color.Blue, Color.Green]);
    expect(rowOf("right", 0)).toEqual([Color.Red, Color.Orange, Color.Yellow]);
  });
});
