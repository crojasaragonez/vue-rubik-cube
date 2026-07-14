import { describe, it, expect, beforeAll } from "vitest";
import { Cube } from "@/models";
import { Color, Direction } from "@/enums";
import {
  sideColors,
  paintSide,
  TRACKING_PATTERN,
  rotatePatternLeft,
  rotatePatternRight
} from "../helper";

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
          describe("move right", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.top, TRACKING_PATTERN);
              cube.move(cube.sides.front, 0, 0, Direction.Right);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).toEqual([
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("top side", () => {
              it("rotates the cells to the left", () => {
                expect(sideColors(cube.sides.top)).toEqual(rotatePatternLeft(TRACKING_PATTERN));
              });
            });
          });

          describe("move left", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.top, TRACKING_PATTERN);
              cube.move(cube.sides.front, 0, 0, Direction.Left);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).toEqual([
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("top side", () => {
              it("rotates the cells to the right", () => {
                expect(sideColors(cube.sides.top)).toEqual(rotatePatternRight(TRACKING_PATTERN));
              });
            });
          });
        });

        describe("second row", () => {
          describe("move right", () => {
            beforeAll(() => {
              cube = new Cube();
              cube.move(cube.sides.front, 1, 0, Direction.Right);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).toEqual([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).toEqual([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });
          });

          describe("move left", () => {
            beforeAll(() => {
              cube = new Cube();
              cube.move(cube.sides.front, 1, 0, Direction.Left);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).toEqual([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).toEqual([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });
          });
        });

        describe("third row", () => {
          describe("move right", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.bottom, TRACKING_PATTERN);
              cube.move(cube.sides.front, 2, 0, Direction.Right);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).toEqual([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).toEqual([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("bottom side", () => {
              it("rotates the cells to the left", () => {
                expect(sideColors(cube.sides.bottom)).toEqual(rotatePatternLeft(TRACKING_PATTERN));
              });
            });
          });

          describe("move left", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.bottom, TRACKING_PATTERN);
              cube.move(cube.sides.front, 2, 0, Direction.Left);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Yellow, Color.Yellow, Color.Yellow],
                  [Color.Blue, Color.Blue, Color.Blue]
                ]);
              });
            });

            describe("left side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.left)).toEqual([
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Green, Color.Green, Color.Green],
                  [Color.Yellow, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.White, Color.White],
                  [Color.White, Color.White, Color.White],
                  [Color.Green, Color.Green, Color.Green]
                ]);
              });
            });

            describe("right side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.right)).toEqual([
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.Blue, Color.Blue, Color.Blue],
                  [Color.White, Color.White, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("rotates the cells to the right", () => {
                expect(sideColors(cube.sides.bottom)).toEqual(rotatePatternRight(TRACKING_PATTERN));
              });
            });
          });
        });
      });

      describe("vertical moves", () => {
        describe("first column", () => {
          describe("move up", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.left, TRACKING_PATTERN);
              cube.move(cube.sides.front, 0, 0, Direction.Up);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Orange, Color.Yellow, Color.Yellow],
                  [Color.Orange, Color.Yellow, Color.Yellow],
                  [Color.Orange, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).toEqual([
                  [Color.Yellow, Color.Red, Color.Red],
                  [Color.Yellow, Color.Red, Color.Red],
                  [Color.Yellow, Color.Red, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.Red, Color.White, Color.White],
                  [Color.Red, Color.White, Color.White],
                  [Color.Red, Color.White, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).toEqual([
                  [Color.White, Color.Orange, Color.Orange],
                  [Color.White, Color.Orange, Color.Orange],
                  [Color.White, Color.Orange, Color.Orange]
                ]);
              });
            });

            describe("left side", () => {
              it("rotates the cells to the left", () => {
                expect(sideColors(cube.sides.left)).toEqual(rotatePatternLeft(TRACKING_PATTERN));
              });
            });
          });

          describe("move down", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.left, TRACKING_PATTERN);
              cube.move(cube.sides.front, 0, 0, Direction.Down);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Red, Color.Yellow, Color.Yellow],
                  [Color.Red, Color.Yellow, Color.Yellow],
                  [Color.Red, Color.Yellow, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).toEqual([
                  [Color.White, Color.Red, Color.Red],
                  [Color.White, Color.Red, Color.Red],
                  [Color.White, Color.Red, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.Orange, Color.White, Color.White],
                  [Color.Orange, Color.White, Color.White],
                  [Color.Orange, Color.White, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).toEqual([
                  [Color.Yellow, Color.Orange, Color.Orange],
                  [Color.Yellow, Color.Orange, Color.Orange],
                  [Color.Yellow, Color.Orange, Color.Orange]
                ]);
              });
            });

            describe("left side", () => {
              it("rotates the cells to the left", () => {
                expect(sideColors(cube.sides.left)).toEqual(rotatePatternRight(TRACKING_PATTERN));
              });
            });
          });
        });

        describe("second column", () => {
          describe("move up", () => {
            beforeAll(() => {
              cube = new Cube();
              cube.move(cube.sides.front, 0, 1, Direction.Up);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Orange, Color.Yellow],
                  [Color.Yellow, Color.Orange, Color.Yellow],
                  [Color.Yellow, Color.Orange, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).toEqual([
                  [Color.Red, Color.Yellow, Color.Red],
                  [Color.Red, Color.Yellow, Color.Red],
                  [Color.Red, Color.Yellow, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.Red, Color.White],
                  [Color.White, Color.Red, Color.White],
                  [Color.White, Color.Red, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).toEqual([
                  [Color.Orange, Color.White, Color.Orange],
                  [Color.Orange, Color.White, Color.Orange],
                  [Color.Orange, Color.White, Color.Orange]
                ]);
              });
            });
          });

          describe("move down", () => {
            beforeAll(() => {
              cube = new Cube();
              cube.move(cube.sides.front, 0, 1, Direction.Down);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Red, Color.Yellow],
                  [Color.Yellow, Color.Red, Color.Yellow],
                  [Color.Yellow, Color.Red, Color.Yellow]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).toEqual([
                  [Color.Red, Color.White, Color.Red],
                  [Color.Red, Color.White, Color.Red],
                  [Color.Red, Color.White, Color.Red]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.Orange, Color.White],
                  [Color.White, Color.Orange, Color.White],
                  [Color.White, Color.Orange, Color.White]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).toEqual([
                  [Color.Orange, Color.Yellow, Color.Orange],
                  [Color.Orange, Color.Yellow, Color.Orange],
                  [Color.Orange, Color.Yellow, Color.Orange]
                ]);
              });
            });
          });
        });

        describe("third column", () => {
          describe("move up", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.right, TRACKING_PATTERN);
              cube.move(cube.sides.front, 0, 2, Direction.Up);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Orange],
                  [Color.Yellow, Color.Yellow, Color.Orange],
                  [Color.Yellow, Color.Yellow, Color.Orange]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).toEqual([
                  [Color.Red, Color.Red, Color.Yellow],
                  [Color.Red, Color.Red, Color.Yellow],
                  [Color.Red, Color.Red, Color.Yellow]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.White, Color.Red],
                  [Color.White, Color.White, Color.Red],
                  [Color.White, Color.White, Color.Red]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).toEqual([
                  [Color.Orange, Color.Orange, Color.White],
                  [Color.Orange, Color.Orange, Color.White],
                  [Color.Orange, Color.Orange, Color.White]
                ]);
              });
            });

            describe("right side", () => {
              it("rotates the cells to the right", () => {
                expect(sideColors(cube.sides.right)).toEqual(rotatePatternRight(TRACKING_PATTERN));
              });
            });
          });

          describe("move down", () => {
            beforeAll(() => {
              cube = new Cube();
              paintSide(cube.sides.right, TRACKING_PATTERN);
              cube.move(cube.sides.front, 0, 2, Direction.Down);
            });
            describe("front side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.front)).toEqual([
                  [Color.Yellow, Color.Yellow, Color.Red],
                  [Color.Yellow, Color.Yellow, Color.Red],
                  [Color.Yellow, Color.Yellow, Color.Red]
                ]);
              });
            });

            describe("top side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.top)).toEqual([
                  [Color.Red, Color.Red, Color.White],
                  [Color.Red, Color.Red, Color.White],
                  [Color.Red, Color.Red, Color.White]
                ]);
              });
            });

            describe("back side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.back)).toEqual([
                  [Color.White, Color.White, Color.Orange],
                  [Color.White, Color.White, Color.Orange],
                  [Color.White, Color.White, Color.Orange]
                ]);
              });
            });

            describe("bottom side", () => {
              it("contains the correct cell colors", () => {
                expect(sideColors(cube.sides.bottom)).toEqual([
                  [Color.Orange, Color.Orange, Color.Yellow],
                  [Color.Orange, Color.Orange, Color.Yellow],
                  [Color.Orange, Color.Orange, Color.Yellow]
                ]);
              });
            });

            describe("right side", () => {
              it("rotates the cells to the left", () => {
                expect(sideColors(cube.sides.right)).toEqual(rotatePatternLeft(TRACKING_PATTERN));
              });
            });
          });
        });
      });
    });
  });
});
