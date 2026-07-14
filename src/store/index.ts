import { defineStore } from "pinia";
import { reactive } from "vue";
import { Cube } from "@/models";
import type { Side } from "@/models";
import type { Direction } from "@/enums";

/** Thin store: all cube geometry lives in `Cube`. */
export const useCubeStore = defineStore("cube", () => {
  const cube = reactive(new Cube()) as Cube;

  function move(side: Side, row: number, col: number, direction: Direction) {
    cube.move(side, row, col, direction);
  }

  return { cube, move };
});
