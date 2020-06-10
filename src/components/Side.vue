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
    <Cell color="red" x=0 y=0></Cell>
    <Cell color="red" x=0 y=1></Cell>
    <Cell color="red" x=0 y=2></Cell>
    <Cell color="red" x=1 y=0></Cell>
    <Cell color="red" x=1 y=1></Cell>
    <Cell color="red" x=1 y=2></Cell>
    <Cell color="red" x=2 y=0></Cell>
    <Cell color="red" x=2 y=1></Cell>
    <Cell color="red" x=2 y=2></Cell>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cell from "./Cell.vue";

@Component({
  components: {
    Cell
  }
})
export default class Side extends Vue {}
</script>
