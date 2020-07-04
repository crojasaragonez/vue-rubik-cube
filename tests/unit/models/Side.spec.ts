import { expect } from "chai";
import { Side } from "@/models";
import { Color, SidePosition, Direction } from "@/enums";

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

  describe("#rotateRight", () => {
    context("side is rotated once", () => {
      it("rotates the cells to the right", () => {
        const side = new Side(Color.Yellow, SidePosition.Front);
        side.rotateRight();
        expect(
          side.cells.map(row => {
            return row.map(cell => {
              return `${cell.x}${cell.y}`;
            });
          })
        ).to.eql([
          ["20", "10", "00"],
          ["21", "11", "01"],
          ["22", "12", "02"]
        ]);
      });
    });

    context("side is rotated 4 times", () => {
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
        ).to.eql([
          ["00", "01", "02"],
          ["10", "11", "12"],
          ["20", "21", "22"]
        ]);
      });
    });
  });

  describe("#rotateLeft", () => {
    context("side is rotated once", () => {
      it("rotates the cells to the right", () => {
        const side = new Side(Color.Yellow, SidePosition.Front);
        side.rotateLeft();
        expect(
          side.cells.map(row => {
            return row.map(cell => {
              return `${cell.x}${cell.y}`;
            });
          })
        ).to.eql([
          ["02", "12", "22"],
          ["01", "11", "21"],
          ["00", "10", "20"]
        ]);
      });
    });

    context("side is rotated 4 times", () => {
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
        ).to.eql([
          ["00", "01", "02"],
          ["10", "11", "12"],
          ["20", "21", "22"]
        ]);
      });
    });
  });

  describe("#xCells", () => {
    context("when x is between the 0-2 range", () => {
      it("picks the right cells", () => {
        expect(side.xCells(0).map(c => [c.x, c.y])).to.eql([
          [0, 0],
          [0, 1],
          [0, 2]
        ]);
      });
    });

    context("when x is > 2", () => {
      it("returns an empty array", () => {
        expect(side.xCells(3).map(c => [c.x, c.y])).to.eql([]);
      });
    });

    context("when x is < 0", () => {
      it("returns an empty array", () => {
        expect(side.xCells(-1).map(c => [c.x, c.y])).to.eql([]);
      });
    });
  });

  describe("#yCells", () => {
    context("when y is between the 0-2 range", () => {
      it("picks the right cells", () => {
        expect(side.yCells(0).map(c => [c.x, c.y])).to.eql([
          [0, 0],
          [1, 0],
          [2, 0]
        ]);
      });
    });

    context("when y is > 2", () => {
      it("returns an empty array", () => {
        expect(side.yCells(3).map(c => [c.x, c.y])).to.eql([]);
      });
    });

    context("when y is < 0", () => {
      it("returns an empty array", () => {
        expect(side.yCells(-1).map(c => [c.x, c.y])).to.eql([]);
      });
    });
  });

  describe("#next", () => {
    context("front side", () => {
      const side = new Side(Color.Yellow, SidePosition.Front);
      context("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).to.eql(SidePosition.Left);
        });
      });
      context("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).to.eql(SidePosition.Right);
        });
      });
      context("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).to.eql(SidePosition.Bottom);
        });
      });
      context("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).to.eql(SidePosition.Top);
        });
      });
    });

    context("right side", () => {
      const side = new Side(Color.Blue, SidePosition.Right);
      context("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).to.eql(SidePosition.Front);
        });
      });
      context("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).to.eql(SidePosition.Back);
        });
      });
      context("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).to.eql(SidePosition.Bottom);
        });
      });
      context("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).to.eql(SidePosition.Top);
        });
      });
    });

    context("back side", () => {
      const side = new Side(Color.White, SidePosition.Back);
      context("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).to.eql(SidePosition.Right);
        });
      });
      context("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).to.eql(SidePosition.Left);
        });
      });
      context("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).to.eql(SidePosition.Top);
        });
      });
      context("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).to.eql(SidePosition.Bottom);
        });
      });
    });

    context("left side", () => {
      const side = new Side(Color.Green, SidePosition.Left);
      context("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).to.eql(SidePosition.Back);
        });
      });
      context("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).to.eql(SidePosition.Front);
        });
      });
      context("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).to.eql(SidePosition.Bottom);
        });
      });
      context("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).to.eql(SidePosition.Top);
        });
      });
    });

    context("top side", () => {
      const side = new Side(Color.Red, SidePosition.Top);
      context("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).to.eql(SidePosition.Right);
        });
      });
      context("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).to.eql(SidePosition.Left);
        });
      });
      context("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).to.eql(SidePosition.Front);
        });
      });
      context("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).to.eql(SidePosition.Back);
        });
      });
    });

    context("bottom side", () => {
      const side = new Side(Color.Orange, SidePosition.Bottom);
      context("when Direction is right", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Right)).to.eql(SidePosition.Right);
        });
      });
      context("when Direction is left", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Left)).to.eql(SidePosition.Left);
        });
      });
      context("when Direction is up", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Up)).to.eql(SidePosition.Back);
        });
      });
      context("when Direction is down", () => {
        it("returns the correct next move", () => {
          expect(side.next(Direction.Down)).to.eql(SidePosition.Front);
        });
      });
    });
  });
});
