import { describe, it, expect } from "vitest";
import { Cube, Side } from "@/models";
import { Color, Direction, SidePosition } from "@/enums";
import { colorSnapshot } from "../helper";

const faces = [
  SidePosition.Front,
  SidePosition.Back,
  SidePosition.Left,
  SidePosition.Right,
  SidePosition.Top,
  SidePosition.Bottom
];

const directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right
];

const opposite: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left
};

type Move = {
  face: SidePosition;
  row: number;
  col: number;
  direction: Direction;
};

function sideByPosition(cube: Cube, position: SidePosition): Side {
  return cube.allSides.find(side => side.position === position)!;
}

function colorCounts(cube: Cube): Record<Color, number> {
  const counts = {
    [Color.Red]: 0,
    [Color.Orange]: 0,
    [Color.Green]: 0,
    [Color.Blue]: 0,
    [Color.Yellow]: 0,
    [Color.White]: 0
  };
  for (const side of cube.allSides) {
    for (const row of side.cells) {
      for (const cell of row) {
        counts[cell.color]++;
      }
    }
  }
  return counts;
}

function expectNineOfEachColor(cube: Cube) {
  const counts = colorCounts(cube);
  for (const color of Object.values(Color)) {
    expect(counts[color], `${color} count`).toBe(9);
  }
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomMove(rng: () => number): Move {
  return {
    face: faces[Math.floor(rng() * faces.length)],
    row: Math.floor(rng() * 3),
    col: Math.floor(rng() * 3),
    direction: directions[Math.floor(rng() * directions.length)]
  };
}

function apply(cube: Cube, move: Move) {
  cube.move(sideByPosition(cube, move.face), move.row, move.col, move.direction);
}

describe("Random movements", () => {
  it("keeps nine stickers of each color after many random moves", () => {
    const rng = mulberry32(0xc0ffee);
    const cube = new Cube();
    expectNineOfEachColor(cube);

    for (let i = 0; i < 500; i++) {
      apply(cube, randomMove(rng));
      expectNineOfEachColor(cube);
    }
  });

  it("restores a scramble by applying the inverse move sequence", () => {
    const seeds = [1, 42, 99, 123456, 0xdeadbeef];

    for (const seed of seeds) {
      const rng = mulberry32(seed);
      const cube = new Cube();
      const start = colorSnapshot(cube.sides);
      const moves: Move[] = [];

      for (let i = 0; i < 100; i++) {
        const move = randomMove(rng);
        moves.push(move);
        apply(cube, move);
        expectNineOfEachColor(cube);
      }

      expect(colorSnapshot(cube.sides)).not.toBe(start);

      for (let i = moves.length - 1; i >= 0; i--) {
        const move = moves[i];
        apply(cube, {
          ...move,
          direction: opposite[move.direction]
        });
      }

      expect(colorSnapshot(cube.sides), `seed ${seed}`).toBe(start);
      expectNineOfEachColor(cube);
    }
  });

  it("survives interleaved undos during a long random session", () => {
    const rng = mulberry32(7);
    const cube = new Cube();
    const start = colorSnapshot(cube.sides);
    const stack: Move[] = [];

    for (let i = 0; i < 300; i++) {
      if (stack.length > 0 && rng() < 0.3) {
        const last = stack.pop()!;
        apply(cube, { ...last, direction: opposite[last.direction] });
      } else {
        const move = randomMove(rng);
        stack.push(move);
        apply(cube, move);
      }
      expectNineOfEachColor(cube);
    }

    while (stack.length) {
      const last = stack.pop()!;
      apply(cube, { ...last, direction: opposite[last.direction] });
    }

    expect(colorSnapshot(cube.sides)).toBe(start);
  });

  it("keeps order-4 for random face/cell/direction samples", () => {
    const rng = mulberry32(2026);
    for (let i = 0; i < 80; i++) {
      const move = randomMove(rng);
      const cube = new Cube();
      const start = colorSnapshot(cube.sides);
      for (let n = 0; n < 4; n++) {
        apply(cube, move);
      }
      expect(
        colorSnapshot(cube.sides),
        `${move.face} (${move.row},${move.col}) ${move.direction}`
      ).toBe(start);
    }
  });
});
