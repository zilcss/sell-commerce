import Vue from "vue";
import Vuex from "vuex";
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

// 定义商家数据中的优惠活动类型
interface Support {
  type: number;
  description: string;
}

// 定义接口返回的商家数据类型
interface SellerResponse {
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
  // 若后续还有其他字段，可继续补充
}

// 定义 Store 的 State 类型
interface StoreState {
  goodsData: Food[];
  cartFoods: Food[];
  sellerData: SellerResponse;
}

const store = new Vuex.Store<StoreState>({
  state: {
    goodsData: [],
    cartFoods: [],
    sellerData: {} as SellerResponse, // 初始化为空对象，类型断言
  },
  mutations: {
    // 设置商品数据
    SET_GOODS_DATA(state, payload: Food[]) {
      state.goodsData = payload;
      console.log("123w", state.goodsData);
    },
    SET_SELLER_DATA(state, payload: SellerResponse) {
      state.sellerData = payload;

      console.log("123www", state.sellerData);
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
      try {
        // 发送请求获取商品数据
        const goodsResponse: { data: Food[] } = await axios.get(
          "http://localhost:3000/goods"
        );
        const sellerResponse: { data: SellerResponse } = await axios.get(
          "http://localhost:3000/seller"
        );
        // 将获取到的数据提交到mutation中更新state
        commit("SET_GOODS_DATA", goodsResponse.data);
        commit("SET_SELLER_DATA", sellerResponse.data);
      } catch (error) {
        console.error("数据获取失败", error);
      }
    },
  },
});

export default store;
