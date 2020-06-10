<template>
  <div id="app">
    <Side></Side>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import Cube from "./components/Cube.vue";
import Side from "./components/Side.vue";

@Component({
  components: {
    Side
  }
})
export default class App extends Vue {}
</script>
