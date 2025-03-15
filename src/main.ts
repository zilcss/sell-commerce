import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../static/css/reset.css";

Vue.config.productionTip = false;

// 先触发action获取数据
store.dispatch("fetchGoodsData");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
