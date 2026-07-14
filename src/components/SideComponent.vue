<template>
  <div class="side">
    <template v-for="(rowCells, row) in side.cells" :key="row">
      <CellComponent
        v-for="(cell, col) in rowCells"
        :key="`${side.position}-${row}-${col}`"
        :cell="cell"
        :row="row"
        :col="col"
        @move="onMove"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import CellComponent from "./CellComponent.vue";
import { Side } from "@/models";
import { Direction } from "@/enums";

const props = defineProps<{
  side: Side;
}>();

const emit = defineEmits<{
  move: [row: number, col: number, direction: Direction, side: Side];
}>();

function onMove(row: number, col: number, direction: Direction) {
  emit("move", row, col, direction, props.side);
}
</script>

<style scoped lang="scss">
.side {
  display: flex;
  flex-wrap: wrap;
}
</style>
