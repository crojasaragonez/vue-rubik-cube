import { defineStore } from "pinia";
import { reactive } from "vue";
import { Cube, Cell, Side } from "@/models";
import { Direction } from "@/enums";

export const useCubeStore = defineStore("cube", () => {
  const cube = reactive(new Cube()) as Cube;

  function move(side: Side, cell: Cell, direction: Direction) {
    cube.move(side, cell, direction);
  }

  return { cube, move };
});
