import { describe, it, expect } from "vitest";
import { Cell } from "@/models";
import { Color } from "@/enums";

describe("Cell.ts", () => {
  const cell = new Cell(Color.Red, 0, 0);
  it("builds a valid instance", () => {
    expect(cell.color).toBe(Color.Red);
    expect(cell.x).toBe(0);
    expect(cell.y).toBe(0);
  });

  describe("#key", () => {
    it("returns an empty array", () => {
      expect(cell.key).toEqual("red-0-0");
    });
  });
});
