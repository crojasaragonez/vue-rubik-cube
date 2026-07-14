import { computed } from "vue";
import { useCubeStore } from "@/store";
import type { Side } from "@/models";
import type { Direction } from "@/enums";

/** Shared store wiring so cube components stay presentation-only. */
export function useCubeMove() {
  const store = useCubeStore();
  const cube = computed(() => store.cube);

  function onMove(row: number, col: number, direction: Direction, side: Side) {
    store.move(side, row, col, direction);
  }

  return { cube, onMove };
}
