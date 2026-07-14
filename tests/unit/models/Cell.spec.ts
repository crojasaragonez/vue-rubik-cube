import { describe, it, expect } from "vitest";
import { Cell } from "@/models";
import { Color } from "@/enums";

describe("Cell.ts", () => {
  it("builds a valid instance", () => {
    const cell = new Cell(Color.Red);
    expect(cell.color).toBe(Color.Red);
  });
});
