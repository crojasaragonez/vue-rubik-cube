<!-- Add "scoped" attribute to limit CSS to this component only -->
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
<template>
  <div>
    <a href="https://github.com/crojasaragonez/vue-rubik-cube">
      <img
        style="position: absolute; top: 0; left: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
        alt="Fork me on GitHub"
      />
    </a>

    <div class="cube">
      <table>
        <tr>
          <td></td>
          <td>
            <SideComponent
              :key="cube.sides.top.position"
              :side.sync="cube.sides.top"
              :class="cube.sides.top.position"
              @move="move"
            ></SideComponent>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <SideComponent
              :key="cube.sides.left.position"
              :side.sync="cube.sides.left"
              :class="cube.sides.left.position"
              @move="move"
            ></SideComponent>
          </td>
          <td>
            <SideComponent
              :key="cube.sides.front.position"
              :side.sync="cube.sides.front"
              :class="cube.sides.front.position"
              @move="move"
            ></SideComponent>
          </td>
          <td>
            <SideComponent
              :key="cube.sides.right.position"
              :side.sync="cube.sides.right"
              :class="cube.sides.right.position"
              @move="move"
            ></SideComponent>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <SideComponent
              :key="cube.sides.bottom.position"
              :side.sync="cube.sides.bottom"
              :class="cube.sides.bottom.position"
              @move="move"
            ></SideComponent>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <SideComponent
              :key="cube.sides.back.position"
              :side.sync="cube.sides.back"
              :class="cube.sides.back.position"
              @move="move"
            ></SideComponent>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideComponent from "./SideComponent.vue";
import { Cube, Cell, Side } from "../models";
import { Direction } from "../enums";

@Component({
  components: {
    SideComponent
  }
})
export default class Cube2DComponent extends Vue {
  public get cube(): Cube {
    return this.$store.state.cube;
  }

  move(cell: Cell, direction: Direction, side: Side) {
    this.$store.commit("move", {
      cell: cell,
      direction: direction,
      side: side
    });
    this.$forceUpdate();
  }
}
</script>
