<template>
  <div class="cube">
    <table>
      <tbody>
        <tr>
          <td></td>
          <td>
            <SideComponent
              :key="cube.sides.top.position"
              :side="cube.sides.top"
              :class="cube.sides.top.position"
              @move="onMove"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <SideComponent
              :key="cube.sides.left.position"
              :side="cube.sides.left"
              :class="cube.sides.left.position"
              @move="onMove"
            />
          </td>
          <td>
            <SideComponent
              :key="cube.sides.front.position"
              :side="cube.sides.front"
              :class="cube.sides.front.position"
              @move="onMove"
            />
          </td>
          <td>
            <SideComponent
              :key="cube.sides.right.position"
              :side="cube.sides.right"
              :class="cube.sides.right.position"
              @move="onMove"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <SideComponent
              :key="cube.sides.bottom.position"
              :side="cube.sides.bottom"
              :class="cube.sides.bottom.position"
              @move="onMove"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <SideComponent
              :key="cube.sides.back.position"
              :side="cube.sides.back"
              :class="cube.sides.back.position"
              @move="onMove"
            />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SideComponent from "./SideComponent.vue";
import { Side } from "@/models";
import { Direction } from "@/enums";
import { useCubeStore } from "@/store";

const store = useCubeStore();
const cube = computed(() => store.cube);

function onMove(row: number, col: number, direction: Direction, side: Side) {
  store.move(side, row, col, direction);
}
</script>

<style scoped lang="css">
.top,
.left,
.front,
.right,
.bottom,
.back {
  width: 10vw;
  height: 10vw;
}
</style>
