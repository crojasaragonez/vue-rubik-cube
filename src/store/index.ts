import Vue from "vue";
import Vuex from "vuex";
import { Cube } from "@/models";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cube: new Cube()
  },
  mutations: {
    move(state, payload) {
      state.cube.move(payload.side, payload.cell, payload.direction);
    }
  },
  actions: {},
  modules: {}
});
