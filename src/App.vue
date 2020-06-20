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
    v-touch:start="touchStart"
    v-touch:end="touchEnd"
    v-touch:moving="touchMoving"
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
  touchActive = false;

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

  move(x1: number, y1: number, x2: number, y2: number) {
    this.rotateX -= y1 - y2;
    this.rotateY += x1 - x2;
  }

  mousemove(event: MouseEvent) {
    event.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    this.move(
      event.clientX,
      event.clientY,
      this.last.clientX,
      this.last.clientY
    );
    this.last = event;
  }

  keydown(event: KeyboardEvent) {
    event.preventDefault();
    const moves: { [k: string]: () => {} } = {};
    moves[UserAction.RightKey] = () => (this.rotateY += 5);
    moves[UserAction.LeftKey] = () => (this.rotateY -= 5);
    moves[UserAction.DownKey] = () => (this.rotateX += 5);
    moves[UserAction.UpKey] = () => (this.rotateX -= 5);
    moves[event.keyCode]();
  }

  touchStart(event: TouchEvent) {
    this.touchActive = true;
    this.lastTouch = event;
  }

  touchMoving(event: TouchEvent) {
    event.preventDefault();
    if (!this.touchActive) {
      return;
    }
    if (event.touches) {
      this.move(
        event.touches[0].clientX,
        event.touches[0].clientY,
        this.lastTouch.touches[0].clientX,
        this.lastTouch.touches[0].clientY
      );
      this.lastTouch = event;
    }
  }

  touchEnd() {
    this.touchActive = false;
  }
}
</script>
