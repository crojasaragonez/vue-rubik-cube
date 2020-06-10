<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div class="container">
    <Cube></Cube>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cube from "./components/Cube.vue";

@Component({
  components: {
    Cube
  }
})
export default class App extends Vue {}
</script>
