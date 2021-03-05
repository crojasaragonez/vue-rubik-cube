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
  <div class="side">
    <template v-for="row in side.cells">
      <CellComponent
        v-for="cell in row"
        :key="cell.key"
        :cell.sync="cell"
        :class="side.position"
        @move="move"
      ></CellComponent>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CellComponent from "./CellComponent.vue";
import { Side, Cell } from "@/models";
import { Direction } from "@/enums";

@Component({
  components: {
    CellComponent
  }
})
export default class SideComponent extends Vue {
  @Prop() private side!: Side;
  move(cell: Cell, direction: Direction) {
    this.$emit("move", cell, direction, this.side);
  }
}
</script>
