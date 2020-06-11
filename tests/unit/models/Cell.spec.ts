import { expect } from "chai";
import { Cell } from "@/models";
import { Color } from "@/enums";

describe("Cell.ts", () => {
  const cell = new Cell(Color.Red, 0, 0);
  it("builds a valid instance", () => {
    expect(cell.color).to.eq(Color.Red);
    expect(cell.x).to.eq(0);
    expect(cell.y).to.eq(0);
  });

  describe("#key", () => {
    it("returns an empty array", () => {
      expect(cell.key).to.eql("red-0-0");
    });
  });
});
