import { describe, it, expect } from "vitest";
import { Cube } from "@/models";
import { Color, SidePosition } from "@/enums";

describe("Cube.ts", () => {
  const cube = new Cube();

  describe("initial position and color for each cube side", () => {
    it("sets the correct color and position to the front side", () => {
      expect(cube.sides.front.color).toBe(Color.Yellow);
      expect(cube.sides.front.position).toBe(SidePosition.Front);
    });

    it("sets the correct color and position to the top side", () => {
      expect(cube.sides.top.color).toBe(Color.Red);
      expect(cube.sides.top.position).toBe(SidePosition.Top);
    });

    it("sets the correct color and position to the bottom side", () => {
      expect(cube.sides.bottom.color).toBe(Color.Orange);
      expect(cube.sides.bottom.position).toBe(SidePosition.Bottom);
    });

    it("sets the correct color and position to the left side", () => {
      expect(cube.sides.left.color).toBe(Color.Green);
      expect(cube.sides.left.position).toBe(SidePosition.Left);
    });

    it("sets the correct color and position to the right side", () => {
      expect(cube.sides.right.color).toBe(Color.Blue);
      expect(cube.sides.right.position).toBe(SidePosition.Right);
    });

    it("sets the correct color and position to the back side", () => {
      expect(cube.sides.back.color).toBe(Color.White);
      expect(cube.sides.back.position).toBe(SidePosition.Back);
    });
  });

  describe("#allSides", () => {
    it("returns the sides in the right order", () => {
      expect(cube.allSides.map(side => side.position)).toEqual([
        SidePosition.Front,
        SidePosition.Top,
        SidePosition.Bottom,
        SidePosition.Left,
        SidePosition.Right,
        SidePosition.Back
      ]);
    });
  });
});
