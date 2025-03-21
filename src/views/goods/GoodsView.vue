<template>
  <div class="goods-view">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li
          v-for="(item, index) in goodsData"
          :key="index"
          class="menu-item"
          :class="{ current: currentIndex === index }"
          @click="isActive(index, $event)"
        >
          <span class="text border-1px">
            <i
              class="icon"
              v-show="item.type > 0"
              :class="classMap[item.type]"
            ></i
            >{{ item.name }}</span
          >
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li
          v-for="(item, goodIndex) in goodsData"
          :key="goodIndex"
          class="food-list"
          ref="foodsListItem"
        >
          <h1 class="food-title">{{ item.name }}</h1>
          <ul>
            <li
              v-for="(food, index) in item.foods"
              :key="index"
              class="food-item border-1px"
              @click="selectFoodView({ ...food, id: `${goodIndex}${index}` })"
            >
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px" alt="" />
              </div>
              <div class="content">
                <h2 class="name">
                  {{ food.name }}
                </h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span>月售{{ food.sellCount }}份</span>
                  <span class="count">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old"
                    >￥{{ food.price }}</span
                  >
                </div>
                <div class="cartControl-wrapper">
                  <CartControl
                    :food="{ ...food, id: `${goodIndex}${index}` }"
                    @dropAct="dropCar"
                  ></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <foodView :food="selectFood" ref="ShopFood"></foodView>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import BScroll from '@better-scroll/core'
import axios from "axios";
import CartControl from "../cartconcontrol/CartControl";
import foodView from "../food/FoodView";

export default {
  data() {
    return {
      pos: {},
      foods: [],
      isLoading: false,
      listHeight: [],
      scrollY: 0,
      height: 0,
      selectFood: {},
      isClicking: false,
    };
  },
  props: {
    sellerData: {
      type: Object
    }
  }
  ,
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this._initScroll();
    this.$store.dispatch("goods/fetchGoodsData")
  },
  mounted() {
    this.height = 0;

  },
  computed: {

    ...mapState({
      goodsData: state => state.goods.goodsData // goods 是模块名，对应 store 中注册的模块名
    }),

    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
  },
  watch: {
    goodsData: {
      handler() {
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeights();
        })
      },
      immediate: true
    }
  },
  methods: {
    dropCar(target) {
      this.$emit('dropAct', target)
    },
    selectFoodView(food) {
      if (this.isClicking) return;
      this.isClicking = true;
      this.selectFood = food;
      this.$refs.ShopFood.show();
      setTimeout(() => (this.isClicking = false), 300);
    },
    _initScroll() {
      if (this.$refs['menu-wrapper']) {
        this.menunScroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        });
      }
      if (this.$refs['foods-wrapper']) {
        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        });
      }

    },
    _calculateHeights() {
      // 添加非空判断
      if (!this.$refs['foodsListItem']) {
        console.log('未获取到 foodsListItems 的 ref');
        return;
      }
      const foodListItems = this.$refs['foodsListItem'];
      this.listHeight.push(this.height);
      foodListItems.forEach((item) => {
        this.height += item.clientHeight;
        this.listHeight.push(this.height);
      });
    }
    , isActive(index, event) {
      if (!event._constructed) {
        return
      }

      const foodListItems = this.$refs['foodsListItem'];
      let el = foodListItems[index];
      this.foodsScroll.scrollToElement(el, 300);
    }

  },
  components: {
    CartControl,
    foodView
  }

}

;
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/index.styl"

.goods-view
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden

  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7

    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px

      &.current
        position relative
        z-index 1
        margin-top -1px
        background #fff
        font-weight 700


      .text
        display table-cell
        vertical-align middle
        width 56px
        font-size 12px
        border-1px(rgba(7, 17, 27, 0.1))

        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat

          &.decrease
            background-image url('decrease_3@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('decrease_3@3x.png')

          &.discount
            background-image url('discount_3@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('discount_3@3x.png')

          &.guarantee
            background-image url('guarantee_3@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('guarantee_3@3x.png')

          &.invoice
            background-image url('invoice_3@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('invoice_3@3x.png')

          &.special
            background-image url('special_3@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('special_3@3x.png')


  .foods-wrapper
    flex 1

    .food-title
      padding-left 14px
      height 26px
      font-size 12px
      line-height 26px
      border-left 2px solid #d9dde1
      color rgb(147, 153, 159)
      background rgb(#f3f5f7)

    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, 0.1))

      &:last-child
        border-none()
        margin-bottom 0

      .icon
        flex 0 0 57px
        margin-right 10px

      .content
        flex 1
        position relative

        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)

        .desc,
        .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)

        .desc
          line-height 12px
          margin-bottom 8px

        .extra
          .count
            line-height 12px
            margin-left 12px

        .price
          font-weight 700
          line-height 24px


          .now
            font-size 14px
            color rgb(240, 20, 20)

          .old
            text-decoration line-through
            margin-left 8px
            font-size 10px
            color rgb(147, 153, 159)

        .cartControl-wrapper
          position absolute
          right 0
          bottom 0
</style>
