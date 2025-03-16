import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { urlParse } from "../js/util";

Vue.use(Vuex);

// 定义商品类型
interface Food {
  id: string | number;
  count?: number;
  name?: string;
  price?: number;
}

// 定义商家数据中的优惠活动类型
interface Support {
  type: number;
  description: string;
}

// 定义接口返回的商家数据类型
interface SellerResponse {
  id?: string;
  name?: string;
  description?: string;
  deliveryTime?: number;
  score?: number;
  serviceScore?: number;
  foodScore?: number;
  rankRate?: number;
  minPrice?: number;
  deliveryPrice?: number;
  ratingCount?: number;
  sellCount?: number;
  bulletin?: string;
  supports?: Support[];
  avatar?: string;
}

// 定义 Store 的 State 类型
interface StoreState {
  goodsData: Food[];
  cartFoods: Food[];
  sellerData: SellerResponse;
  error: null | string;
}

const store = new Vuex.Store<StoreState>({
  state: {
    goodsData: [],
    cartFoods: [],
    sellerData: {} as SellerResponse,
    error: null,
  },
  mutations: {
    // 设置商品数据
    SET_GOODS_DATA(state, payload: Food[]) {
      state.goodsData = payload;
    },
    // 设置商家数据
    SET_SELLER_DATA(state, payload: SellerResponse) {
      state.sellerData = payload;
    },
    // 添加商品到购物车
    SET_CART_FOODS(state, payload: Food[]) {
      state.cartFoods = payload;
    },
    // 设置错误信息
    SET_ERROR(state, payload: null | string) {
      state.error = payload;
    },
  },
  actions: {
    // 单独获取商家数据
    async fetchSellerData({ commit }, id: string) {
      commit("SET_ERROR", null);
      try {
        const response = await axios.get(
          `http://localhost:3000/seller?id=${id}`
        );
        commit("SET_SELLER_DATA", response.data);
        return true;
      } catch (error) {
        commit("SET_ERROR", "商家数据获取失败");
        return false;
      }
    },
    // 单独获取商品数据
    async fetchGoodsData({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/goods");
        commit("SET_GOODS_DATA", response.data);
      } catch (error) {
        console.error("商品数据获取失败", error);
      }
    },
  },
});

export default store;
