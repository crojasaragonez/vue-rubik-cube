<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    <a href="https://github.com/crojasaragonez/vue-rubik-cube">
      <img
        style="position: absolute; top: 0; left: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
        alt="Fork me on GitHub"
      />
    </a>
    <Cube2DComponent
      v-if="mode == '2D'"
      :rotateX.sync="rotateX"
      :rotateY.sync="rotateY"
    ></Cube2DComponent>
    <CubeComponent
      v-if="mode == '3D'"
      :rotateX.sync="rotateX"
      :rotateY.sync="rotateY"
    ></CubeComponent>
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
  mode = "3D";

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
