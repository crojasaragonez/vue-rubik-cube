import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Vue2TouchEvents from "vue2-touch-events";

Vue.use(Vue2TouchEvents);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
