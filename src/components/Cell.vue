<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.red {
  background-color: #b71234;
}

.orange {
  background-color: #ff5800;
}

.green {
  background-color: #009b48;
}

.blue {
  background-color: #0046ad;
}

.yellow {
  background-color: #ffd500;
}

.white {
  background-color: #ffffff;
}

.cell {
  width: 33.33%;
  height: 33.33%;
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div class="cell" v-bind:class="color">
    {{x}},{{y}}
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Color } from "../enums";

@Component
export default class Cell extends Vue {
  @Prop() private color!: Color;
  @Prop() private x!: number;
  @Prop() private y!: number;
}
</script>
