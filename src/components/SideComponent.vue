<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
<template>
  <div>
    <div class="side">
      <template v-for="(row, x_index) in side.cells">
        <CellComponent
          v-for="(cell, y_index) in row"
          :key="`${x_index}${y_index}`"
          :color="cell.color"
          :class="side.position"
          :x="x_index"
          :y="y_index"
        ></CellComponent>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CellComponent from "./CellComponent.vue";
import { Side } from "../models";

@Component({
  components: {
    CellComponent
  }
})
export default class SideComponent extends Vue {
  @Prop() private side!: Side;
}
</script>
