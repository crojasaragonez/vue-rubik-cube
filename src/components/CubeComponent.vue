<template>
  <div class="cube-container">
    <div
      class="cube"
      :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }"
    >
      <SideComponent
        v-for="side in cube.allSides"
        :key="side.position"
        class="face"
        :side="side"
        :class="side.position"
        @move="onMove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideComponent from "./SideComponent.vue";
import { useCubeMove } from "@/composables/useCubeMove";

defineProps<{
  rotateX: number;
  rotateY: number;
}>();

const { cube, onMove } = useCubeMove();
</script>

<style scoped lang="css">
.cube-container {
  perspective: 1000px;
  width: var(--cube-size);
  height: var(--cube-size);
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

/*
  Standard CSS cube placement: rotate into place, then push out on local Z.
  Transform origin is the face center (= cube center when faces fill the box).
*/
.face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.1), 0 0 50px rgba(0, 0, 0, 0.3);
}

.front {
  transform: rotateY(0deg) translateZ(var(--side-size));
}

.back {
  transform: rotateY(180deg) translateZ(var(--side-size));
}

.right {
  transform: rotateY(90deg) translateZ(var(--side-size));
}

.left {
  transform: rotateY(-90deg) translateZ(var(--side-size));
}

.top {
  transform: rotateX(90deg) translateZ(var(--side-size));
}

.bottom {
  transform: rotateX(-90deg) translateZ(var(--side-size));
}
</style>
