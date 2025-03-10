<template>
  <div class="cartControl">
    <transition name="fade">
      <div
        class="cart-decrease icon-remove_circle_outline"
        v-show="localFood.count > 0"
        @click="handleDecrease"
      ></div>
    </transition>
    <div class="cart-count" v-show="localFood.count > 0">
      {{ localFood.count }}
    </div>

    <div class="cart-add icon-add_circle" @click="handleAdd"></div>
  </div>
</template>
<script>
import { nanoid } from "nanoid";
import { mapState } from "vuex";

export default {
  props: {
    food: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localFood: {
        id: this.food.id || nanoid(),
        name: this.food.name,
        price: this.food.price,
        count: this.count || 0,
      },
      isClicking: false,
    };
  },
  computed: {
    /**
     * 监听购物车数据变化
     * @returns {number} 当前商品在购物车中的数量
     */
    cartFoodCount() {
      const cartFood = this.$store.state.cartFoods.find(
        (f) => f.id === this.localFood.id
      );
      return cartFood ? cartFood.count : 0;
    },
  },
  watch: {
    localFood: {
      handler(newLocalFood) {
        const newCartFoods = this.$store.state.cartFoods.map((f) =>
          f.id === newLocalFood.id ? newLocalFood : f
        );
        this.$store.commit("SET_CART_FOODS", newCartFoods);
      },
      deep: true,
    },
    /**
     * 监听购物车中商品数量变化
     * @param {number} newCount - 新的商品数量
     */
    cartFoodCount: {
      handler(newCount) {
        this.localFood.count = newCount;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapState(["cartFoods"]),

    handleAdd(event) {
      if (this.isClicking) return;
      this.isClicking = true;
      this.localFood.count++;

      // 检查是否已存在于购物车
      const existIndex = this.$store.state.cartFoods.findIndex(
        (f) => f.id === this.localFood.id
      );
      if (existIndex === -1) {
        this.$store.commit("SET_CART_FOODS", [
          ...this.$store.state.cartFoods,
          this.localFood,
        ]);
      }
      this.$emit("dropAct", event.target);
      setTimeout(() => (this.isClicking = false), 300);
    },
    handleDecrease() {
      if (this.isClicking) return;
      this.isClicking = true;

      if (this.localFood.count > 0) {
        this.localFood.count--;
      }

      if (this.localFood.count === 0) {
        this.$store.commit(
          "SET_CART_FOODS",
          this.$store.state.cartFoods.filter((f) => f.id !== this.localFood.id)
        );
      }

      setTimeout(() => (this.isClicking = false), 300);
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartControl
  .cart-decrease, .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)

  .fade-enter-active,
  .fade-leave-active
    transition: transform 0.5s ease, opacity 0.5s ease;


  .fade-enter
    transform: translateX(20px);
    opacity: 0;


  .fade-enter-to
    transform: translateX(0);
    opacity: 1;


  .fade-leave
    transform: translateX(0);
    opacity: 1;


  .fade-leave-to
    transform: translateX(20px);
    opacity: 0;


  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)

  .cart-add
    display inline-block
</style>
