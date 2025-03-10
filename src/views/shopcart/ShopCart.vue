<template>
  <div class="cart-container">
    <div class="content" @click="showFold">
      <div class="cart-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ highlight: totalCount > 0 }">
            <div
              class="icon-shopping_cart"
              :class="{ highlight: totalCount > 0 }"
            ></div>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{ highlight: totalPrice > 0 }">
          ¥{{ totalPrice }}
        </div>
        <div class="desc">另需配送费¥{{ deliveryPrice }}元</div>
      </div>
      <div class="cart-right">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>

    <div class="ball-container">
      <transition-group
        name="drop-ball"
        @beforeEnter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <div
          class="ball"
          v-for="(ball, index) in balls"
          :key="index"
          v-show="ball.show"
        >
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>

    <transition name="fold">
      <div class="shopping-cart-container" v-show="fold">
        <!-- 头部 -->
        <div class="shopping-cart-header">
          <div class="shopping-cart-title">购物车</div>
          <div class="shopping-cart-clear">清空</div>
        </div>
        <!-- 底部已添加商品部分 -->
        <div class="list-wrapper" ref="listWrapper">
          <ul>
            <li
              class="added-products-container"
              v-for="(food, index) in cartFoods"
              :key="index.id || index"
            >
              <div class="added-products-left">
                {{ food.name }}
              </div>
              <div class="added-products-right">
                ¥{{ food.price * food.count }}
              </div>
              <CartControl
                class="cart-control-component"
                :food="food"
                :count="food.count"
              >
              </CartControl>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "@better-scroll/core";

import {mapState} from 'vuex'
import CartControl from "../cartconcontrol/CartControl"

export default {
  props: {
    showData: {
      type: Array,
      default() {
        return []
      }
    },

    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      cartShowFoods: [],
      fold: false,
    }
  }


  ,
  computed: {
    ...mapState(['cartFoods']),
    totalPrice() {

      let total = 0
      this.cartFoods.forEach((food) => {

        total += food.price * food.count
      })
      return total
    }
    ,
    totalCount() {
      let count = 0
      this.cartFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        console.log("222")
        return "enough"
      }
      return "not-enough"
    }

  },
  methods: {
    showFold() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold
      // 优化初始化逻辑
      if (this.fold) {
        this.$nextTick(() => {
          // 确保DOM已更新
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['listWrapper'], {
              click: true,

            })

          } else {
            this.scroll.refresh()
          }
        })
      }
    },


    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter(el) {

      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {

          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''


          el.style.display = ''
          el.style.transform = `translate3d(${x}px,${y}px,0)`

          let inner = el.querySelector('.inner-hook')
          inner.style.transform = `translate3d(0,0,0)`
        }
      }
    },
    enter(el) {
      /* 触发重绘 */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter(el) {
      console.log("afterEnter")
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
  },
  components: {
    CartControl
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cart-container
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  background blueviolet
  color: rgba(255, 255, 255, 0.4)

  .content
    display flex
    background #141d27
    font-size 0

    .cart-left
      flex 1

      .logo-wrapper
        display inline-block
        position relative
        vertical-align top
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        background #141d27

        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c

          &.highlight
            background rgb(0, 160, 220)

          .icon-shopping_cart
            font-size 24px
            line-height 44px

            &.highlight
              color #fff


        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #fff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)

      .price
        display inline-block
        vertical-align top
        margin-top 12px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        border-right 1px solid rgba(255, 255, 255, 0.1)
        color #80858a
        font-size 16px
        font-weight 700

        &.highlight
          color #fff

      .desc
        display inline-block
        vertical-align top
        margin 12px 0 0 12px
        line-height 24px
        font-size 10px


    .cart-right
      flex 0 0 105px
      width 105px

      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700

        &.ont-enough
          background #2b333b


        &.enough
          background #00b43c
          color #fff

  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 20

      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
        transform-origin center bottom


    .drop-ball-enter-active
      transition all 1s cubic-bezier(.27, .84, .64, .94)

      .inner
        transition all 0.6s linear

    .drop-ball-enter
      opacity 1

    .drop-ball-enter-to
      opacity 1
      transform translate3d(0, 0, 0) !important

  .shopping-cart-container
    position fixed
    left 0
    bottom 48px
    width 100%
    z-index -1
    background #f3f5f7


    .shopping-cart-header
      height 40px
      line-height 40px
      padding 0 30px
      background #dbe2e7
      font-size 14px
      font-weight 200
      border-bottom 1px solid rgba(7, 17, 27, 0.1)

      .shopping-cart-title
        float left
        color rgb(7, 17, 27)

      .shopping-cart-clear
        float right
        color rgb(0, 160, 220)

    .list-wrapper
      z-index -2
      max-height 266px
      overflow hidden

      .added-products-container
        position relative
        margin 0 20px
        padding 0 10px
        height 48px
        line-height 48px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)

        .added-products-left
          font-size 14px
          color rgb(7, 17, 27)

        .added-products-right
          position absolute
          right 85px
          bottom 0
          font-size 18px
          font-weight 700
          color rgb(240, 20, 20)

        .cart-control-component
          position absolute
          right -4px
          bottom -5px

  .fold-enter-active,
  .fold-leave-active
    transition: transform 0.5s ease, opacity 0.5s ease;

  .fold-enter-to
    transform: translate3d(0, 0, 0);
    opacity: 1;

  .fold-leave-to
    transform: translate3d(0, 100%, 0);

  .fold-enter, .fade-leave
    transform: translate3d(0, 100%, 0);

    opacity: 0;
</style>
