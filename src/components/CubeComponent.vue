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
  opacity: 1;
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
  <div class="cube-container">
    <div
      class="cube"
      :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }"
    >
      <SideComponent
        v-for="side in cube.allSides"
        :key="side.position"
        class="side"
        :side.sync="side"
        :class="side.position"
        @move="move"
      ></SideComponent>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SideComponent from "./SideComponent.vue";
import { Cube, Cell, Side } from "@/models";
import { Direction } from "@/enums";

@Component({
  components: {
    SideComponent
  }
})
export default class CubeComponent extends Vue {
  @Prop() private rotateX!: number;
  @Prop() private rotateY!: number;
  public get cube(): Cube {
    return this.$store.state.cube;
  }

  move(cell: Cell, direction: Direction, side: Side) {
    this.$store.commit("move", {
      cell: cell,
      direction: direction,
      side: side
    });
  }
}
</script>
