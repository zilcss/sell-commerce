import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsData: [],
  },
  getters: {},
  mutations: {
    SET_GOODS_DATA: (state) => state.goodsData,
  },
  actions: {
    async fetchGoodsData({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/goods");
        commit("SET_GOODS_DATA", response.data);
      } catch (error) {
        console.log("error");
      }
    },
  },
  modules: {},
});
