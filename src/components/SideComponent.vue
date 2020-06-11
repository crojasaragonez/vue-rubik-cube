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
      <CellComponent color="red" x="0" y="0"></CellComponent>
      <CellComponent color="red" x="0" y="1"></CellComponent>
      <CellComponent color="red" x="0" y="2"></CellComponent>
      <CellComponent color="red" x="1" y="0"></CellComponent>
      <CellComponent color="red" x="1" y="1"></CellComponent>
      <CellComponent color="red" x="1" y="2"></CellComponent>
      <CellComponent color="red" x="2" y="0"></CellComponent>
      <CellComponent color="red" x="2" y="1"></CellComponent>
      <CellComponent color="red" x="2" y="2"></CellComponent>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CellComponent from "./CellComponent.vue";
import { Side } from '../models';

@Component({
  components: {
    CellComponent
  }
})
export default class SideComponent extends Vue {
  @Prop() private side!: Side;
}
</script>
