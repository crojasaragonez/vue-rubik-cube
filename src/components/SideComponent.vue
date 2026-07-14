<template>
  <div class="side">
    <template v-for="(row, rowIndex) in side.cells" :key="rowIndex">
      <CellComponent
        v-for="cell in row"
        :key="cell.key"
        :cell="cell"
        :class="side.position"
        @move="onMove"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import CellComponent from "./CellComponent.vue";
import { Side, Cell } from "@/models";
import { Direction } from "@/enums";

const props = defineProps<{
  side: Side;
}>();

const emit = defineEmits<{
  move: [cell: Cell, direction: Direction, side: Side];
}>();

function onMove(cell: Cell, direction: Direction) {
  emit("move", cell, direction, props.side);
}
</script>

<style scoped lang="scss">
.side {
  display: flex;
  flex-wrap: wrap;
}
</style>
