<template>
  <div class="cube-container">
    <div
      class="cube"
      :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }"
    >
      <SideComponent
        v-for="side in cube.allSides"
        :key="side.position"
        class="side"
        :side="side"
        :class="side.position"
        @move="onMove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SideComponent from "./SideComponent.vue";
import { Side } from "@/models";
import { Direction } from "@/enums";
import { useCubeStore } from "@/store";

defineProps<{
  rotateX: number;
  rotateY: number;
}>();

const store = useCubeStore();
const cube = computed(() => store.cube);

function onMove(row: number, col: number, direction: Direction, side: Side) {
  store.move(side, row, col, direction);
}
</script>

<style scoped lang="css">
.cube-container {
  perspective: 1000px;
  width: var(--cube-size);
  height: var(--cube-size);
}
.cube {
  height: 100%;
  transform-style: preserve-3d;
}

.side {
  position: absolute;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.1), 0 0 50px rgba(0, 0, 0, 0.3);
  opacity: 1;
  width: 100%;
  height: 100%;
}

.front {
  transform: translate3d(0, 0, var(--side-size));
}

.top {
  transform: rotateX(90deg) translate3d(0, 0, var(--side-size));
}

.bottom {
  transform: rotateX(-90deg) translate3d(0, 0, var(--side-size));
}

.left {
  left: 50%;
  margin-left: var(--side-size-opposite);
  transform: rotateY(-90deg) translate3d(0, 0, var(--side-size));
}

.right {
  left: 50%;
  margin-left: var(--side-size-opposite);
  transform: rotateY(90deg) translate3d(0, 0, var(--side-size));
}

.back {
  transform: rotateX(180deg) translate3d(0, 0, var(--side-size));
}
</style>
