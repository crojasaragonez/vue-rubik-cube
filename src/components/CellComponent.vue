<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.red {
  background-color: #b71234;
}

.orange {
  background-color: #ff5800;
}

.green {
  background-color: #009b48;
}

.blue {
  background-color: #0046ad;
}

.yellow {
  background-color: #ffd500;
}

.white {
  background-color: #ffffff;
}

.cell {
  width: 33.33%;
  height: 33.33%;
  border: 3px solid;
  box-sizing: border-box;
  user-select: none;
}

.arrow-control {
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    color: #000000;
    opacity: 1;
  }
}

.top-center {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 33.33%;
}
.middle-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 33.33%;
}
.bottom-center {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 33.33%;
}
</style>
<template>
  <div class="cell" :class="cell.color">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-chevron-up top-center arrow-control"
      @click="move(up)"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
    <div class="middle-between">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left arrow-control"
        @click="move(left)"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      {{ cell.x }},{{ cell.y }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-right arrow-control"
        @click="move(right)"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-chevron-down bottom-center arrow-control"
      @click="move(down)"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Direction } from "@/enums";
import { Cell } from "@/models";

@Component
export default class CellComponent extends Vue {
  @Prop() public cell!: Cell;
  get up() {
    return Direction.Up;
  }
  get down() {
    return Direction.Down;
  }
  get left() {
    return Direction.Left;
  }
  get right() {
    return Direction.Right;
  }
  move(direction: Direction) {
    this.$emit("move", this.cell, direction);
  }
}
</script>
