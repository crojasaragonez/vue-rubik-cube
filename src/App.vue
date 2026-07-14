<template>
  <div
    class="container"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mousemove="mousemove"
    @touchstart="touchStart"
    @touchend="touchEnd"
    @touchmove="touchMoving"
  >
    <a href="https://github.com/crojasaragonez/vue-rubik-cube">
      <img
        style="position: absolute; top: 0; left: 0; border: 0"
        src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
        alt="Fork me on GitHub"
      />
    </a>
    <Cube2DComponent v-if="mode == '2D'" />
    <CubeComponent
      v-if="mode == '3D'"
      :rotate-x="rotateX"
      :rotate-y="rotateY"
    />
    <div class="bottom-controls">
      <label class="radio-container">
        3D
        <input type="radio" name="mode" value="3D" v-model="mode" />
        <span class="checkmark"></span>
      </label>
      <label class="radio-container">
        2D
        <input type="radio" name="mode" value="2D" v-model="mode" />
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import CubeComponent from "./components/CubeComponent.vue";
import Cube2DComponent from "./components/Cube2DComponent.vue";
import { UserAction } from "@/enums";

const rotateX = ref(-18);
const rotateY = ref(36);
const last = ref<MouseEvent | null>(null);
const lastTouch = ref<TouchEvent | null>(null);
const mouseDown = ref(false);
const touchActive = ref(false);
const mode = ref("3D");

function mousedown(event: MouseEvent) {
  mouseDown.value = true;
  last.value = event;
}

function mouseup() {
  mouseDown.value = false;
}

function move(x1: number, y1: number, x2: number, y2: number) {
  rotateX.value -= y1 - y2;
  rotateY.value += x1 - x2;
}

function mousemove(event: MouseEvent) {
  event.preventDefault();
  if (!mouseDown.value || !last.value) {
    return;
  }
  move(event.clientX, event.clientY, last.value.clientX, last.value.clientY);
  last.value = event;
}

function keydown(event: KeyboardEvent) {
  const moves: Record<number, () => void> = {
    [UserAction.RightKey]: () => {
      rotateY.value += 5;
    },
    [UserAction.LeftKey]: () => {
      rotateY.value -= 5;
    },
    [UserAction.DownKey]: () => {
      rotateX.value += 5;
    },
    [UserAction.UpKey]: () => {
      rotateX.value -= 5;
    }
  };
  const action = moves[event.keyCode];
  if (action) {
    event.preventDefault();
    action();
  }
}

function touchStart(event: TouchEvent) {
  touchActive.value = true;
  lastTouch.value = event;
}

function touchMoving(event: TouchEvent) {
  event.preventDefault();
  if (!touchActive.value || !lastTouch.value) {
    return;
  }
  if (event.touches.length && lastTouch.value.touches.length) {
    move(
      event.touches[0].clientX,
      event.touches[0].clientY,
      lastTouch.value.touches[0].clientX,
      lastTouch.value.touches[0].clientY
    );
    lastTouch.value = event;
  }
}

function touchEnd() {
  touchActive.value = false;
}

onMounted(() => {
  window.addEventListener("keydown", keydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydown);
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-controls {
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  padding-top: 20px;
  padding-right: 20px;
  color: #ffffff;
}

.radio-container {
  position: relative;
  padding: 0px 10px 0px 35px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  color: #ffffff;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  margin: 10px;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

.radio-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.radio-container input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radio-container input:checked ~ .checkmark:after {
  display: block;
}

.radio-container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
