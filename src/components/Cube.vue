<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Cube extends Vue {
  @Prop() private msg!: string;
}
</script>
