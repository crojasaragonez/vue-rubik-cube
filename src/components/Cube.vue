<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cube-container {
  perspective: 1000px;
  width: 30vh;
  height: 30vh;
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
  transform: translate3d(0, 0, calc(30vh / 2));
}

.top {
  transform: rotateX(90deg) translate3d(0, 0, calc(30vh / 2));
}

.bottom {
  transform: rotateX(-90deg) translate3d(0, 0, calc(30vh / 2));
}

.left {
  left: 50%;
  margin-left: calc((30vh / 2) * -1);
  transform: rotateY(-90deg) translate3d(0, 0, calc(30vh / 2));
}

.right {
  left: 50%;
  margin-left: calc((30vh / 2) * -1);
  transform: rotateY(90deg) translate3d(0, 0, calc(30vh / 2));
}

.back {
  transform: rotateX(180deg) translate3d(0, 0, calc(30vh / 2));
}
</style>
<template>
  <div>
    <a href="https://github.com/crojasaragonez/angular-rubik-cube">
      <img style="position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png" alt="Fork me on GitHub">
    </a>
    <div class="cube-container">
      <div class="cube" style="transform: rotateX(-18deg) rotateY(36deg)">
        <Side class="side front"></Side>
        <Side class="side top"></Side>
        <Side class="side bottom"></Side>
        <Side class="side left"></Side>
        <Side class="side right"></Side>
        <Side class="side back"></Side>
        <!-- <app-side *ngFor="let side of cube.allSides()" class="side" [cube]="cube" [side]="side" [ngClass]="side.position"></app-side> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Side from "./Side.vue";

@Component({
  components: {
    Side
  }
})
export default class Cube extends Vue {}
</script>
