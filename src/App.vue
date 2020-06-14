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
  >
    <!-- <CubeComponent
      :rotateX.sync="rotateX"
      :rotateY.sync="rotateY"
    ></CubeComponent> -->
    <Cube2DComponent></Cube2DComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CubeComponent from "./components/CubeComponent.vue";
import Cube2DComponent from "./components/Cube2DComponent.vue";

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
  mouseDown = false;

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
}
</script>
