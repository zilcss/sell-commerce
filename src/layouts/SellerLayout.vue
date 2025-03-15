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
      <router-view :sellerData="sellerData" @dropAct="dropCar" />
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
import {mapState} from "vuex";

export default {
  data() {
    return {
      visibleRouter: [],
      isLoading: false
    };
  },
  created() {
    this.visibleRouter = routes.map(route => ({
      path: route.path,
      name: route.name
    }));
  },
  computed: {
    ...mapState({
      sellerData: 'sellerData'
    }),
  },
  mounted() {
    console.log(this.sellerData, "7789");
  },
  methods: {

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
