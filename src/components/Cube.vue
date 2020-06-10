<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  opacity: 0.8;
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
<template>
  <div>
    <a href="https://github.com/crojasaragonez/angular-rubik-cube">
      <img
        style="position: absolute; top: 0; left: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
        alt="Fork me on GitHub"
      />
    </a>
    <div class="cube-container">
      <div class="cube" style="transform: rotateX(-18deg) rotateY(36deg)">
        <Side v-for="side in cube.allSides()" :key="side.position" class="side" :class="side.position"></Side>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, /*Prop,*/ Vue } from "vue-property-decorator";
import Side from "./Side.vue";
import { Cube } from '../models';

@Component({
  components: {
    Side
  }
})
export default class CubeComponent extends Vue {
  cube: Cube
  constructor() {
    super();
    this.cube = new Cube();
  }
}
</script>
