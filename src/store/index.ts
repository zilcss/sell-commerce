import Vue from "vue";
import Vuex from "vuex";
import goodsModule from "./goods"; // 引入商品模块

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    goods: goodsModule, // 注册商品模块
  },
});

export default store;
