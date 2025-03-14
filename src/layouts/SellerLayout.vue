<template>
  <div class="seller-layout">
    <div class="header">
      <GlobalHeader :sellerData="sellerData"></GlobalHeader>
      <div class="tab border-1px">
        <div
          class="tab-item"
          v-for="item in visibleRouter"
          :key="item.id"
          :class="{ active: $route.path === item.path }"
          @click="goToRoute(item.path)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="content">
      <router-view :sellerData="sellerData" />
    </div>
    <ShopCart
      :delivery-price="sellerData.deliveryPrice"
      :min-price="sellerData.minPrice"
      ref="ShopCart"
    ></ShopCart>
  </div>
</template>

<script type="text/ecmascript-6">
import GlobalHeader from "../components/header/GlobalHeader";
import {routes} from "../router/routes";
import axios from "axios";
import ShopCart from "../views/shopcart/ShopCart";

export default {
  data() {
    return {
      visibleRouter: [],
      sellerData: {},
      isLoading: false
    };
  },
  created() {
    this.fetchSellerData();
    this.visibleRouter = routes.map(route => ({
      path: route.path,
      name: route.name
    }));
  },
  methods: {
    async fetchSellerData() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:3000/seller");

        this.sellerData = response.data;
        console.log(this.sellerData);
      } catch (error) {
        console.error("获取数据失败", error);
      } finally {
        this.isLoading = false;
      }
    },
    goToRoute(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    dropCar(target) {
      if (target) {
        console.log("123111")
        this.$refs.ShopCart.drop(target);
      }
    },
  },
  components: {
    GlobalHeader,
    ShopCart
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../common/stylus/index.styl"
.seller-layout
  .header
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7, 17, 27, 0.1))

      .tab-item
        flex 1
        text-align center
        color rgb(77, 85, 93)

      .active
        color rgb(240, 20, 20)
</style>
