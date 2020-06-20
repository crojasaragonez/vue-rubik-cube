<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div
    class="container"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mousemove="mousemove"
    v-touch:start="startHandler"
    v-touch:end="endHandler"
    v-touch:moving="movingHandler"
  >
    <CubeComponent
      :rotateX.sync="rotateX"
      :rotateY.sync="rotateY"
    ></CubeComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CubeComponent from "./components/CubeComponent.vue";
import Cube2DComponent from "./components/Cube2DComponent.vue";
import { UserAction } from "@/enums";

@Component({
  components: {
    CubeComponent,
    Cube2DComponent
  }
})
export default class App extends Vue {
  rotateX = -18;
  rotateY = 36;
  // eslint-disable-next-line
  last: any;
  // eslint-disable-next-line
  lastTouch: any;
  mouseDown = false;
  touchStart = false;

  /**
   *
   */
  constructor() {
    super();
    window.addEventListener("keydown", event => {
      this.keydown(event);
    });
  }

  mousedown(event: MouseEvent) {
    this.mouseDown = true;
    this.last = event;
  }

  mouseup() {
    this.mouseDown = false;
  }

  mousemove(event: MouseEvent) {
    event.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    this.rotateX -= event.clientY - this.last.clientY;
    this.rotateY += event.clientX - this.last.clientX;
    this.last = event;
  }

  keydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.keyCode === UserAction.RightKey) {
      this.rotateY += 5;
    }
    if (event.keyCode === UserAction.LeftKey) {
      this.rotateY -= 5;
    }
    if (event.keyCode === UserAction.DownKey) {
      this.rotateX += 5;
    }
    if (event.keyCode === UserAction.UpKey) {
      this.rotateX -= 5;
    }
  }

  startHandler(event: TouchEvent) {
    this.touchStart = true;
    this.lastTouch = event;
  }

  movingHandler(event: TouchEvent) {
    event.preventDefault();
    if (!this.touchStart) {
      return;
    }
    if (event.touches) {
      this.rotateX -=
        event.touches[0].clientY - this.lastTouch.touches[0].clientY;
      this.rotateY +=
        event.touches[0].clientX - this.lastTouch.touches[0].clientX;
      this.lastTouch = event;
    }
  }

  endHandler() {
    this.touchStart = false;
  }
}
</script>
