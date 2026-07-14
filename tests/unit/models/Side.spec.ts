import { describe, it, expect } from "vitest";
import { Side } from "@/models";
import { Color, SidePosition, Direction } from "@/enums";

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

  it("builds the cell matrix with the right x and y indexes", () => {
    expect(
      side.cells.map(row => {
        return row.map(cell => {
          return `${cell.x}${cell.y}`;
        });
      })
    ).toEqual([
      ["00", "01", "02"],
      ["10", "11", "12"],
      ["20", "21", "22"]
    ]);
  });

  describe("#rotateRight", () => {
    describe("side is rotated once", () => {
      it("rotates the cells to the right", () => {
        const side = new Side(Color.Yellow, SidePosition.Front);
        side.rotateRight();
        expect(
          side.cells.map(row => {
            return row.map(cell => {
              return `${cell.x}${cell.y}`;
            });
          })
        ).toEqual([
          ["20", "10", "00"],
          ["21", "11", "01"],
          ["22", "12", "02"]
        ]);
      });
    });

    describe("side is rotated 4 times", () => {
      it("leaves the cells in the original position", () => {
        const side = new Side(Color.Yellow, SidePosition.Front);
        Array.from({ length: 4 }, () => {
          side.rotateRight();
        });
        expect(
          side.cells.map(row => {
            return row.map(cell => {
              return `${cell.x}${cell.y}`;
            });
          })
        ).toEqual([
          ["00", "01", "02"],
          ["10", "11", "12"],
          ["20", "21", "22"]
        ]);
      });
    });
  });

  describe("#rotateLeft", () => {
    describe("side is rotated once", () => {
      it("rotates the cells to the right", () => {
        const side = new Side(Color.Yellow, SidePosition.Front);
        side.rotateLeft();
        expect(
          side.cells.map(row => {
            return row.map(cell => {
              return `${cell.x}${cell.y}`;
            });
          })
        ).toEqual([
          ["02", "12", "22"],
          ["01", "11", "21"],
          ["00", "10", "20"]
        ]);
      });
    });

    describe("side is rotated 4 times", () => {
      it("leaves the cells in the original position", () => {
        const side = new Side(Color.Yellow, SidePosition.Front);
        Array.from({ length: 4 }, () => {
          side.rotateLeft();
        });
        expect(
          side.cells.map(row => {
            return row.map(cell => {
              return `${cell.x}${cell.y}`;
            });
          })
        ).toEqual([
          ["00", "01", "02"],
          ["10", "11", "12"],
          ["20", "21", "22"]
        ]);
      });
    });
  });

  describe("#xCells", () => {
    describe("when x is between the 0-2 range", () => {
      it("picks the right cells", () => {
        expect(side.xCells(0).map(c => [c.x, c.y])).toEqual([
          [0, 0],
          [0, 1],
          [0, 2]
        ]);
      });
    });

    describe("when x is > 2", () => {
      it("returns an empty array", () => {
        expect(side.xCells(3).map(c => [c.x, c.y])).toEqual([]);
      });
    });

    describe("when x is < 0", () => {
      it("returns an empty array", () => {
        expect(side.xCells(-1).map(c => [c.x, c.y])).toEqual([]);
      });
    });
  });

  describe("#yCells", () => {
    describe("when y is between the 0-2 range", () => {
      it("picks the right cells", () => {
        expect(side.yCells(0).map(c => [c.x, c.y])).toEqual([
          [0, 0],
          [1, 0],
          [2, 0]
        ]);
      });
    });

    describe("when y is > 2", () => {
      it("returns an empty array", () => {
        expect(side.yCells(3).map(c => [c.x, c.y])).toEqual([]);
      });
    });

    describe("when y is < 0", () => {
      it("returns an empty array", () => {
        expect(side.yCells(-1).map(c => [c.x, c.y])).toEqual([]);
      });
    });
  });

  describe("#next", () => {
    describe("front side", () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      describe("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).toEqual(SidePosition.Left);
        });
      });
      describe("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).toEqual(SidePosition.Right);
        });
      });
      describe("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).toEqual(SidePosition.Bottom);
        });
      });
      describe("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).toEqual(SidePosition.Top);
        });
      });
    });

    describe("right side", () => {
      const side = new Side(Color.Blue, SidePosition.Right);
      describe("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).toEqual(SidePosition.Front);
        });
      });
      describe("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).toEqual(SidePosition.Back);
        });
      });
      describe("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).toEqual(SidePosition.Bottom);
        });
      });
      describe("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).toEqual(SidePosition.Top);
        });
      });
    });

    describe("back side", () => {
      const side = new Side(Color.White, SidePosition.Back);
      describe("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).toEqual(SidePosition.Right);
        });
      });
      describe("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).toEqual(SidePosition.Left);
        });
      });
      describe("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).toEqual(SidePosition.Top);
        });
      });
      describe("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).toEqual(SidePosition.Bottom);
        });
      });
    });

    describe("left side", () => {
      const side = new Side(Color.Green, SidePosition.Left);
      describe("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).toEqual(SidePosition.Back);
        });
      });
      describe("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).toEqual(SidePosition.Front);
        });
      });
      describe("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).toEqual(SidePosition.Bottom);
        });
      });
      describe("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).toEqual(SidePosition.Top);
        });
      });
    });

    describe("top side", () => {
      const side = new Side(Color.Red, SidePosition.Top);
      describe("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).toEqual(SidePosition.Left);
        });
      });
      describe("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).toEqual(SidePosition.Right);
        });
      });
      describe("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).toEqual(SidePosition.Front);
        });
      });
      describe("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).toEqual(SidePosition.Back);
        });
      });
    });

    describe("bottom side", () => {
      const side = new Side(Color.Orange, SidePosition.Bottom);
      describe("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).toEqual(SidePosition.Right);
        });
      });
      describe("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).toEqual(SidePosition.Left);
        });
      });
      describe("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).toEqual(SidePosition.Back);
        });
      });
      describe("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).toEqual(SidePosition.Front);
        });
      });
    });
  });
});
