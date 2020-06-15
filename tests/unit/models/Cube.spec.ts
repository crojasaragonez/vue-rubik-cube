import { expect } from "chai";
import { Cube, Side } from "@/models";
import { Color, SidePosition, Direction } from "@/enums";

function randomHorizontalSide(cube: Cube) {
  const possibleSides = cube.allSides.filter(s =>
    [
      SidePosition.Front,
      SidePosition.Right,
      SidePosition.Back,
      SidePosition.Left
    ].includes(s.position)
  );
  return possibleSides[Math.floor(Math.random() * possibleSides.length)];
}

function randomVerticalSide(cube: Cube) {
  const possibleSides = cube.allSides.filter(s =>
    [
      SidePosition.Front,
      SidePosition.Top,
      SidePosition.Back,
      SidePosition.Bottom
    ].includes(s.position)
  );
  return possibleSides[Math.floor(Math.random() * possibleSides.length)];
}

describe("Cube.ts", () => {
  let cube = new Cube();

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
      expect(cube.allSides.map(side => side.position)).to.eql([
        SidePosition.Front,
        SidePosition.Top,
        SidePosition.Bottom,
        SidePosition.Left,
        SidePosition.Right,
        SidePosition.Back
      ]);
    });
  });

  describe("#move", () => {
    const x = Math.floor(Math.random() * Math.floor(3));
    const y = Math.floor(Math.random() * Math.floor(3));
    let side: Side;

    context(`when cell ${x},${y} was moved in Direction.Right`, () => {
      beforeEach(() => {
        cube = new Cube();
        side = randomHorizontalSide(cube);
        cube.move(side, side.cells[x][y], Direction.Right);
      });

      it("moves the yellow cells from the front side to the right side", () => {
        expect(cube.sides.right.xCells(x).map(cell => cell.color)).to.eql([
          Color.Yellow,
          Color.Yellow,
          Color.Yellow
        ]);
      });

      it("moves the green cells from the left side to the front side", () => {
        expect(cube.sides.front.xCells(x).map(cell => cell.color)).to.eql([
          Color.Green,
          Color.Green,
          Color.Green
        ]);
      });

      it("moves the white cells from the back side to the left side", () => {
        expect(cube.sides.left.xCells(x).map(cell => cell.color)).to.eql([
          Color.White,
          Color.White,
          Color.White
        ]);
      });

      it("moves the blue cells from the right side to the back side", () => {
        expect(cube.sides.back.xCells(x).map(cell => cell.color)).to.eql([
          Color.Blue,
          Color.Blue,
          Color.Blue
        ]);
      });
    });

    context(`when cell ${x},${y} was moved in Direction.Left`, () => {
      beforeEach(() => {
        cube = new Cube();
        const side = randomHorizontalSide(cube);
        cube.move(side, side.cells[x][y], Direction.Left);
      });

      it("moves the white cells from the back side to the right side", () => {
        expect(cube.sides.right.xCells(x).map(cell => cell.color)).to.eql([
          Color.White,
          Color.White,
          Color.White
        ]);
      });

      it("moves the blue cells from the right side to the front side", () => {
        expect(cube.sides.front.xCells(x).map(cell => cell.color)).to.eql([
          Color.Blue,
          Color.Blue,
          Color.Blue
        ]);
      });

      it("moves the yellow cells from the front side to the left side", () => {
        expect(cube.sides.left.xCells(x).map(cell => cell.color)).to.eql([
          Color.Yellow,
          Color.Yellow,
          Color.Yellow
        ]);
      });

      it("moves the green cells from the left side to the back side", () => {
        expect(cube.sides.back.xCells(x).map(cell => cell.color)).to.eql([
          Color.Green,
          Color.Green,
          Color.Green
        ]);
      });
    });

    context(`when cell ${x},${y} was moved in Direction.Up`, () => {
      beforeEach(() => {
        cube = new Cube();
        const side = randomVerticalSide(cube);
        cube.move(side, side.cells[x][y], Direction.Up);
      });

      it("moves the white cells from the back side to the botton side", () => {
        expect(cube.sides.bottom.yCells(y).map(cell => cell.color)).to.eql([
          Color.White,
          Color.White,
          Color.White
        ]);
      });

      it("moves the red cells from the top side to the back side", () => {
        expect(cube.sides.back.yCells(y).map(cell => cell.color)).to.eql([
          Color.Red,
          Color.Red,
          Color.Red
        ]);
      });

      it("moves the yellow cells from the front side to the top side", () => {
        expect(cube.sides.top.yCells(y).map(cell => cell.color)).to.eql([
          Color.Yellow,
          Color.Yellow,
          Color.Yellow
        ]);
      });

      it("moves the orange cells from the bottom side to the front side", () => {
        expect(cube.sides.front.yCells(y).map(cell => cell.color)).to.eql([
          Color.Orange,
          Color.Orange,
          Color.Orange
        ]);
      });
    });

    context(`when cell ${x},${y} was moved in Direction.Down`, () => {
      beforeEach(() => {
        cube = new Cube();
        const side = randomVerticalSide(cube);
        cube.move(side, side.cells[x][y], Direction.Down);
      });

      it("moves the white cells from the back side to the top side", () => {
        expect(cube.sides.top.yCells(y).map(cell => cell.color)).to.eql([
          Color.White,
          Color.White,
          Color.White
        ]);
      });

      it("moves the red cells from the top side to the front side", () => {
        expect(cube.sides.front.yCells(y).map(cell => cell.color)).to.eql([
          Color.Red,
          Color.Red,
          Color.Red
        ]);
      });

      it("moves the yellow cells from the front side to the bottom side", () => {
        expect(cube.sides.bottom.yCells(y).map(cell => cell.color)).to.eql([
          Color.Yellow,
          Color.Yellow,
          Color.Yellow
        ]);
      });

      it("moves the orange cells from the bottom side to the back side", () => {
        expect(cube.sides.back.yCells(y).map(cell => cell.color)).to.eql([
          Color.Orange,
          Color.Orange,
          Color.Orange
        ]);
      });
    });
  });
});
