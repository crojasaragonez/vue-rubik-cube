import { expect } from "chai";
import { Cube } from "@/models";
import { Color, SidePosition } from "@/enums";

describe("Cube.ts", () => {
  const cube = new Cube();

  it("sets the correct color and position to the front side", () => {
    expect(cube.sides.front.color).to.eq(Color.Yellow);
    expect(cube.sides.front.position).to.eq(SidePosition.Front);
  });

  it("sets the correct color and position to the top side", () => {
    expect(cube.sides.top.color).to.eq(Color.Red);
    expect(cube.sides.top.position).to.eq(SidePosition.Top);
  });

  it("sets the correct color and position to the bottom side", () => {
    expect(cube.sides.bottom.color).to.eq(Color.Orange);
    expect(cube.sides.bottom.position).to.eq(SidePosition.Bottom);
  });

  it("sets the correct color and position to the left side", () => {
    expect(cube.sides.left.color).to.eq(Color.Green);
    expect(cube.sides.left.position).to.eq(SidePosition.Left);
  });

  it("sets the correct color and position to the right side", () => {
    expect(cube.sides.right.color).to.eq(Color.Blue);
    expect(cube.sides.right.position).to.eq(SidePosition.Right);
  });

  it("sets the correct color and position to the back side", () => {
    expect(cube.sides.back.color).to.eq(Color.White);
    expect(cube.sides.back.position).to.eq(SidePosition.Back);
  });

  describe("#allSides", () => {
    it("returns the sides in the right order", () => {
      const sides = cube.allSides();
      expect(sides.map(side => side.position)).to.eql([
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
