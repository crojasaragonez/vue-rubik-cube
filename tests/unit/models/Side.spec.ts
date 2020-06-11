import { expect } from "chai";
import { Side } from "@/models";
import { Color, SidePosition } from "@/enums";

describe("Side.ts", () => {
  const side = new Side(Color.Red, SidePosition.Front);
  it("builds a valid instance", () => {
    expect(side.color).to.eq(Color.Red);
    expect(side.position).to.eq(SidePosition.Front);
  });

  it("builds the cells with the right number of rows", () => {
    expect(side.cells.length).to.eq(3);
  });

  it("builds the cells with the right number of columns", () => {
    expect(side.cells[0].length).to.eq(3);
  });

  it("builds the cell matrix with the right x and y indexes", () => {
    expect(
      side.cells.map(row => {
        return row.map(cell => {
          return `${cell.x}${cell.y}`;
        });
      })
    ).to.eql([
      ["00", "01", "02"],
      ["10", "11", "12"],
      ["20", "21", "22"]
    ]);
  });
});
