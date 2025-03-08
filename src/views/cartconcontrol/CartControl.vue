<template>
  <div class="cartControl">
    <transition name="fade">
      <div
        class="cart-decrease icon-remove_circle_outline"
        v-if="localFood.count > 0"
        @click="decreaseCart"
      ></div>
    </transition>
    <div class="cart-count" v-show="localFood.count > 0">
      {{ localFood.count }}
    </div>

    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">


export default {

  props: {
    food: {
      type: Object
    }
  },
  data() {

    return {
      localFood: {
        ...this.food,
        count: this.food.count || 0
      }

    }
  },
  methods: {
    addCart() {
      console.log("click2")
      this.localFood.count++;


      this.$emit('addCart', this.localFood, event.target)
    },
    decreaseCart() {
      if (this.localFood.count >= 1) {
        this.localFood.count--;
        this.$emit('decreaseCart', this.localFood);
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
