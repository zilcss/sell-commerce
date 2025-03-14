// Vue相关导入
import Vue from "vue";
import Vuex from "vuex";

// 第三方库导入
import axios from "axios";

Vue.use(Vuex);

// 定义商品类型
interface Food {
  id: string | number;
  count?: number;
  name?: string;
  price?: number;
  // 根据实际业务补充更多字段
}

// 定义接口返回的数据类型
interface GoodsResponse {
  data: Food[];
}

// 定义 Store 的 State 类型
interface StoreState {
  goodsData: Food[];
  cartFoods: Food[];
}

const store = new Vuex.Store<StoreState>({
  state: {
    goodsData: [],
    cartFoods: [],
  },
  mutations: {
    // 设置商品数据
    SET_GOODS_DATA(state, payload: Food[]) {
      state.goodsData = payload;
      console.log("123w", payload);
    },
    // 添加商品到购物车
    // 直接替换整个cartFoods数组
    SET_CART_FOODS(state, payload: Food[]) {
      state.cartFoods = payload;
    },
  },
  actions: {
    // 异步获取商品数据
    async fetchGoodsData({ commit }) {
      // 发送请求获取商品数据
      const response: GoodsResponse = await axios.get(
        "http://localhost:3000/goods"
      );
      // 将获取到的数据提交到mutation中更新state
      commit("SET_GOODS_DATA", response.data);
    },
  },
});

export default store;
