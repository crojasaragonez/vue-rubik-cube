import { defineStore } from "pinia";
import { reactive } from "vue";
import { Cube, Side } from "@/models";
import { Direction } from "@/enums";

export const useCubeStore = defineStore("cube", () => {
  const cube = reactive(new Cube()) as Cube;

  function move(side: Side, row: number, col: number, direction: Direction) {
    cube.move(side, row, col, direction);
  }

  return { cube, move };
});
