import { describe, it, expect } from "vitest";
import { Side } from "@/models";
import { Color, SidePosition } from "@/enums";
import {
  paintSide,
  sideColors,
  TRACKING_PATTERN,
  rotatePatternLeft,
  rotatePatternRight
} from "../helper";

describe("Side.ts", () => {
  const side = new Side(Color.Red, SidePosition.Front);

  it("builds a valid instance", () => {
    expect(side.color).toBe(Color.Red);
    expect(side.position).toBe(SidePosition.Front);
  });

  it("builds the cells with the right number of rows", () => {
    expect(side.cells.length).toBe(3);
  });

  it("builds the cells with the right number of columns", () => {
    expect(side.cells[0].length).toBe(3);
  });

  describe("#rotateRight", () => {
    it("rotates the cells to the right", () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      paintSide(side, TRACKING_PATTERN);
      side.rotateRight();
      expect(sideColors(side)).toEqual(rotatePatternRight(TRACKING_PATTERN));
    });

    it("returns to the original after 4 rotations", () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      paintSide(side, TRACKING_PATTERN);
      Array.from({ length: 4 }, () => side.rotateRight());
      expect(sideColors(side)).toEqual(TRACKING_PATTERN);
    });
  });

  describe("#rotateLeft", () => {
    it("rotates the cells to the left", () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      paintSide(side, TRACKING_PATTERN);
      side.rotateLeft();
      expect(sideColors(side)).toEqual(rotatePatternLeft(TRACKING_PATTERN));
    });

    it("returns to the original after 4 rotations", () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      paintSide(side, TRACKING_PATTERN);
      Array.from({ length: 4 }, () => side.rotateLeft());
      expect(sideColors(side)).toEqual(TRACKING_PATTERN);
    });
  });

  describe("#row", () => {
    it("picks the right cells when in range", () => {
      expect(side.row(0).map(c => c.color)).toEqual([
        Color.Red,
        Color.Red,
        Color.Red
      ]);
    });

    it("returns an empty array when out of range", () => {
      expect(side.row(3)).toEqual([]);
      expect(side.row(-1)).toEqual([]);
    });
  });

  describe("#column", () => {
    it("picks the right cells when in range", () => {
      const painted = new Side(Color.Yellow, SidePosition.Front);
      paintSide(painted, TRACKING_PATTERN);
      expect(painted.column(0).map(c => c.color)).toEqual([
        Color.Red,
        Color.Green,
        Color.Yellow
      ]);
    });

    it("returns an empty array when out of range", () => {
      expect(side.column(3)).toEqual([]);
      expect(side.column(-1)).toEqual([]);
    });
  });
});
