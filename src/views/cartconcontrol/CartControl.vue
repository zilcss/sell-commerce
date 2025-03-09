<template>
  <div class="cartControl">
    <transition name="fade">
      <div
        class="cart-decrease icon-remove_circle_outline"
        v-if="count > 0"
        @click="decreaseCart"
      ></div>
    </transition>
    <div class="cart-count" v-show="count > 0">
      {{ count }}
    </div>

    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  computed: {
    count: {
      get() {
        return this.food.count || 0;
      },
      set(value) {
        this.$emit('update:food', { ...this.food, count: value });
      }
    }
  },
  methods: {
    addCart() {
      this.count++;
      this.$emit('addCart', this.food, event.target);
    },
    decreaseCart() {
      if (this.count > 0) {
        this.count--;
        this.$emit('decreaseCart', this.food);
      }
    }
  }
}
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
