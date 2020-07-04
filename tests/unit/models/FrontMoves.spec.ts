import { expect } from "chai";
import { Cube } from "@/models";
import { Color, SidePosition, Direction } from "@/enums";
import { sideColors, sidePositions } from "../helper";

describe("Front Side Moves", () => {
  let cube = new Cube();

  /*
    here we need to test every single move the yellow side (12 possible moves)
    horizontal moves
      - first row ->
      - first row <-
      - second row ->
      - second row <-
      - third row ->
      - third row <-
    vertical moves
      - first row ->
      - first row <-
      - second row ->
      - second row <-
      - third row ->
      - third row <-
  */

  describe("#move", () => {
    describe("front side", () => {
      describe("horizontal moves", () => {
        describe("first row", () => {
          context("move right", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][0],
                Direction.Right
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).to.eql([
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("top side", () => {
              it("rotates the cells to the left", () => {
                expect(sidePositions(cube.sides.top)).to.eql([
                  ["02", "12", "22"],
                  ["01", "11", "21"],
                  ["00", "10", "20"]
                ]);
              });
            });

            describe("bottom side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.bottom)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });

          context("move left", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][0],
                Direction.Left
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).to.eql([
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("top side", () => {
              it("rotates the cells to the right", () => {
                expect(sidePositions(cube.sides.top)).to.eql([
                  ["20", "10", "00"],
                  ["21", "11", "01"],
                  ["22", "12", "02"]
                ]);
              });
            });

            describe("bottom side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.bottom)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });
        });

        describe("second row", () => {
          context("move right", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[1][0],
                Direction.Right
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).to.eql([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).to.eql([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("top side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.top)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("bottom side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.bottom)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });

          context("move left", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[1][0],
                Direction.Left
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).to.eql([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).to.eql([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("top side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.top)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("bottom side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.bottom)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });
        });

        describe("third row", () => {
          context("move right", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[2][0],
                Direction.Right
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).to.eql([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).to.eql([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.top)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("bottom side", () => {
              it("rotates the cells to the left", () => {
                expect(sidePositions(cube.sides.bottom)).to.eql([
                  ["02", "12", "22"],
                  ["01", "11", "21"],
                  ["00", "10", "20"]
                ]);
              });
            });
          });

          context("move left", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[2][0],
                Direction.Left
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).to.eql([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).to.eql([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("top side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.top)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("bottom side", () => {
              it("rotates the cells to the right", () => {
                expect(sidePositions(cube.sides.bottom)).to.eql([
                  ["20", "10", "00"],
                  ["21", "11", "01"],
                  ["22", "12", "02"]
                ]);
              });
            });
          });
        });
      });

      describe("vertical moves", () => {
        describe("first column", () => {
          context("move up", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][0],
                Direction.Up
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Orange, Color.Yellow, Color.Yellow],
                  [Color.Orange, Color.Yellow, Color.Yellow],
                  [Color.Orange, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).to.eql([
                  [Color.Yellow, Color.Red, Color.Red],
                  [Color.Yellow, Color.Red, Color.Red],
                  [Color.Yellow, Color.Red, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.Red, Color.White, Color.White],
                  [Color.Red, Color.White, Color.White],
                  [Color.Red, Color.White, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).to.eql([
                  [Color.White, Color.Orange, Color.Orange],
                  [Color.White, Color.Orange, Color.Orange],
                  [Color.White, Color.Orange, Color.Orange]
                ]);
              });
            });

            describe("left side", () => {
              it("rotates the cells to the left", () => {
                expect(sidePositions(cube.sides.left)).to.eql([
                  ["02", "12", "22"],
                  ["01", "11", "21"],
                  ["00", "10", "20"]
                ]);
              });
            });

            describe("right side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.right)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });

          context("move down", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][0],
                Direction.Down
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Red, Color.Yellow, Color.Yellow],
                  [Color.Red, Color.Yellow, Color.Yellow],
                  [Color.Red, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).to.eql([
                  [Color.White, Color.Red, Color.Red],
                  [Color.White, Color.Red, Color.Red],
                  [Color.White, Color.Red, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.Orange, Color.White, Color.White],
                  [Color.Orange, Color.White, Color.White],
                  [Color.Orange, Color.White, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).to.eql([
                  [Color.Yellow, Color.Orange, Color.Orange],
                  [Color.Yellow, Color.Orange, Color.Orange],
                  [Color.Yellow, Color.Orange, Color.Orange]
                ]);
              });
            });

            describe("left side", () => {
              it("rotates the cells to the left", () => {
                expect(sidePositions(cube.sides.left)).to.eql([
                  ["20", "10", "00"],
                  ["21", "11", "01"],
                  ["22", "12", "02"]
                ]);
              });
            });

            describe("right side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.right)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });
        });

        describe("second column", () => {
          context("move up", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][1],
                Direction.Up
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Orange, Color.Yellow],
                  [Color.Yellow, Color.Orange, Color.Yellow],
                  [Color.Yellow, Color.Orange, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).to.eql([
                  [Color.Red, Color.Yellow, Color.Red],
                  [Color.Red, Color.Yellow, Color.Red],
                  [Color.Red, Color.Yellow, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.Red, Color.White],
                  [Color.White, Color.Red, Color.White],
                  [Color.White, Color.Red, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).to.eql([
                  [Color.Orange, Color.White, Color.Orange],
                  [Color.Orange, Color.White, Color.Orange],
                  [Color.Orange, Color.White, Color.Orange]
                ]);
              });
            });

            describe("left side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.left)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("right side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.right)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });

          context("move down", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][1],
                Direction.Down
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Red, Color.Yellow],
                  [Color.Yellow, Color.Red, Color.Yellow],
                  [Color.Yellow, Color.Red, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).to.eql([
                  [Color.Red, Color.White, Color.Red],
                  [Color.Red, Color.White, Color.Red],
                  [Color.Red, Color.White, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.Orange, Color.White],
                  [Color.White, Color.Orange, Color.White],
                  [Color.White, Color.Orange, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).to.eql([
                  [Color.Orange, Color.Yellow, Color.Orange],
                  [Color.Orange, Color.Yellow, Color.Orange],
                  [Color.Orange, Color.Yellow, Color.Orange]
                ]);
              });
            });

            describe("left side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.left)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("right side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.right)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });
          });
        });

        describe("third column", () => {
          context("move up", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][2],
                Direction.Up
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Orange],
                  [Color.Yellow, Color.Yellow, Color.Orange],
                  [Color.Yellow, Color.Yellow, Color.Orange]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).to.eql([
                  [Color.Red, Color.Red, Color.Yellow],
                  [Color.Red, Color.Red, Color.Yellow],
                  [Color.Red, Color.Red, Color.Yellow]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.White, Color.Red],
                  [Color.White, Color.White, Color.Red],
                  [Color.White, Color.White, Color.Red]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).to.eql([
                  [Color.Orange, Color.Orange, Color.White],
                  [Color.Orange, Color.Orange, Color.White],
                  [Color.Orange, Color.Orange, Color.White]
                ]);
              });
            });

            describe("left side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.left)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("right side", () => {
              it("rotates the cells to the right", () => {
                expect(sidePositions(cube.sides.right)).to.eql([
                  ["20", "10", "00"],
                  ["21", "11", "01"],
                  ["22", "12", "02"]
                ]);
              });
            });
          });

          context("move down", () => {
            before(() => {
              cube = new Cube();
              cube.move(
                cube.sides.front,
                cube.sides.front.cells[0][2],
                Direction.Down
              );
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).to.eql([
                  [Color.Yellow, Color.Yellow, Color.Red],
                  [Color.Yellow, Color.Yellow, Color.Red],
                  [Color.Yellow, Color.Yellow, Color.Red]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).to.eql([
                  [Color.Red, Color.Red, Color.White],
                  [Color.Red, Color.Red, Color.White],
                  [Color.Red, Color.Red, Color.White]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).to.eql([
                  [Color.White, Color.White, Color.Orange],
                  [Color.White, Color.White, Color.Orange],
                  [Color.White, Color.White, Color.Orange]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).to.eql([
                  [Color.Orange, Color.Orange, Color.Yellow],
                  [Color.Orange, Color.Orange, Color.Yellow],
                  [Color.Orange, Color.Orange, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("leaves the cells in the original position", () => {
                expect(sidePositions(cube.sides.left)).to.eql([
                  ["00", "01", "02"],
                  ["10", "11", "12"],
                  ["20", "21", "22"]
                ]);
              });
            });

            describe("right side", () => {
              it("rotates the cells to the left", () => {
                expect(sidePositions(cube.sides.right)).to.eql([
                  ["02", "12", "22"],
                  ["01", "11", "21"],
                  ["00", "10", "20"]
                ]);
              });
            });
          });
        });
      });
    });
  });
});
