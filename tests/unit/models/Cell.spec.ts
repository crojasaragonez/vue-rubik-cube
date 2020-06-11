import { expect } from "chai";
import { Cell } from "@/models";
import { Color } from "@/enums";

describe("Cell.ts", () => {
  it("builds a valid instance", () => {
    const cell = new Cell(Color.Red, 0, 0);
    expect(cell.color).to.eq(Color.Red);
    expect(cell.x).to.eq(0);
    expect(cell.y).to.eq(0);
  });
});
