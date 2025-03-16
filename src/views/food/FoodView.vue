<template>
  <div>
    <transition name="food-fold">
      <div v-show="showFlag" class="food-view" ref="food-wrapper">
        <div class="food-content">
          <div class="food-view--header">
            <!-- 商品图片区域 -->
            <div class="img-view">
              <i @click="hide" class="return-goods icon-arrow_lift"></i>
              <!-- 这里可以插入图片，假设用img标签 -->
              <img class="food-image" :src="food.image" alt="商品图片" />
            </div>
            <!-- 商品详情区域 -->
            <div class="detail-view">
              <!-- 商品详情左边区域 -->
              <div class="detail-left">
                <!-- 商品名称 -->
                <div class="name-view">
                  <!-- 这里填写商品名称 -->
                  <span>{{ food.name }}</span>
                </div>
                <!-- 商品销量 -->
                <div class="sales-view">
                  <!-- 这里填写商品销量 -->
                  <span>月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <!-- 商品价格区域 -->
                <div class="price-view">
                  <!-- 价格相关的三个div假设为原价、现价、折扣等 -->
                  <span class="now-price">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old-price"
                    >￥{{ food.price }}</span
                  >
                </div>
              </div>
              <!-- 商品详情右边区域（添加按钮区域） -->
              <div class="detail-right">
                <!-- 这里添加按钮 -->
                <CartControl @dropAct2="dropCar" :food="food"></CartControl>
              </div>
            </div>
          </div>
          <SplitView></SplitView>
          <!-- 商品介绍区域 -->
          <div class="food-desc-view" v-show="food.info">
            <!-- 介绍标题 -->
            <div class="desc-title">
              <!-- 这里填写介绍标题 -->
              <h2>商品介绍</h2>
            </div>
            <!-- 介绍描述 -->
            <div class="desc-content">
              <!-- 这里填写介绍描述内容 -->
              <p class="content">{{ food.info }}</p>
            </div>
          </div>
          <SplitView v-show="food.info"></SplitView>
          <!-- 评论相关区域 -->
          <div class="food-comm-view">
            <!-- 用户查看评论的组件区域 -->
            <div class="comm-select">
              <!-- 这里假设是一个组件，用于用户选择查看哪些评论 -->
              <h1 class="comm-title">商品评价</h1>
              <RatingSelect
                @ratingType="ratingType"
                @contentToggle="contentToggle"
                :desc="desc"
                :ratings="food.ratings"
                :select-type="selectType"
                :only-content="onlyContent"
              ></RatingSelect>
            </div>
            <!-- 评论列表区域 -->
            <div class="comm-list">
              <ul>
                <!-- 使用v-for遍历生成评论列表，这里只是示例结构 -->
                <li
                  class="comm-item border-1px"
                  v-for="rating in food.ratings"
                  :key="rating.id"
                  v-show="needShow(rating.rateType, rating.text)"
                >
                  <!-- 评论左边区域（时间、icon、评论内容） -->
                  <div class="comm-item-left">
                    <!-- 评论时间 -->
                    <div class="time-view">
                      <span>{{ rating.rateTime | formatDate }}</span>
                    </div>

                    <!-- 评论内容 -->
                    <div class="content-view">
                      <!-- 评论icon，假设用i标签 -->
                      <i
                        class="icon-view"
                        :class="{
                          'icon-thumb_up': rating.rateType === 0,
                          'icon-thumb_down': rating.rateType === 1,
                        }"
                      ></i>
                      <p class="content-text">{{ rating.text }}</p>
                    </div>
                  </div>
                  <!-- 评论右边区域（用户信息：名称、头像） -->
                  <div class="comm-item-right">
                    <!-- 用户名称 -->
                    <div class="name-view">
                      <span>{{ rating.username }}</span>
                    </div>
                    <!-- 用户头像，假设用img标签 -->
                    <div class="avatar-view">
                      <img :src="rating.avatar" alt="用户头像" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="comm-no-list"
              v-show="!food.ratings || !food.ratings.length"
            >
              暂无评论
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import RatingSelect from "@/views/ratingselect/RatingSelect";
import SplitView from "@/views/split/SplitView";
import BScroll from '@better-scroll/core'
import CartControl from "@/views/cartconcontrol/CartControl";
import {mapState} from "vuex";
import {formatDate} from "@/js/data";

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  components: {CartControl, SplitView, RatingSelect},
  props: {
    food: {
      type: Object
    },
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }

    }
  },
  computed: {

    ...mapState({cartFoods: (state) => state.goods.cartFoods})
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['food-wrapper'], {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      }, 300);

    },
    hide() {
      this.showFlag = false
    },
    needShow(rateType, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return rateType === this.selectType
      }

    }
    ,
    dropCar(event) {
      console.log("555555555")
      this.$emit("dropAct", event.target)
    }
    ,
    ratingType(type) {
      this.selectType = type
      setTimeout(() => {
        this.scroll.refresh();
      }, 300);
    }
    ,
    contentToggle(onlyContent) {
      this.onlyContent = onlyContent
      setTimeout(() => {
        this.scroll.refresh();
      }, 100);

    }
  }
  , filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');

    }
  }


}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.food-view
  position fixed
  top 0
  bottom 48px
  left 0
  z-index 30
  width 100%
  background #fff
  overflow hidden

  .food-view--header
    .img-view
      position relative

      .return-goods
        position absolute
        padding 10px
        left 2px
        top 10px
        font-size 18px
        color rgb(0, 160, 220)
        font-weight 700


      .food-image
        top 0
        left 0
        width 100%

    .detail-view
      position relative
      width 100%
      padding 18px
      box-sizing border-box
      height 120px


      .detail-left
        position absolute
        left 18px
        top 18px

        .name-view
          margin-bottom 8px

          span
            font-size 14px
            font-weight 700
            line-height 14px
            color rgb(7, 17, 27)


        .sales-view
          span
            display inline-block
            margin-right 12px
            font-size 10px
            font-weight 200
            line-height 10px
            color rgb(147, 153, 159)


        .price-view
          margin-top 18px
          font-weight 700
          line-height 24px

          .now-price
            font-size 14px
            color rgb(240, 20, 20)

          .old-price
            text-decoration line-through
            margin-left 8px
            font-size 10px
            color rgb(147, 153, 159)

      .detail-right
        position absolute
        right 18px
        bottom 18px


.food-desc-view
  padding 18px

  .desc-title
    margin-bottom 6px

  .desc-content
    .content
      margin 0 8px
      font-size 12px
      font-weight 20px
      line-height 24px
      color rgb(77, 85, 93)


.food-comm-view
  .comm-select
    .comm-title
      margin 18px 0 6px 18px

  .comm-list
    padding 0 18px

    .comm-item
      padding 16px 0
      width 100%
      height 60px
      box-sizing border-box
      border-1px(rgba(7, 17, 27, 0.1))

      .comm-item-left
        float left

        .time-view
          font-size 10px
          color rgb(147, 153, 159)
          line-height 12px

        .content-view
          margin-top 6px

        .icon-view
          margin-right 4px

          &.icon-thumb_up
            color rgb(0, 160, 220)

          &.icon-thumb_down
            color rgb(147, 153, 159)


        .content-text
          display inline-block
          font-size 12px
          color: rgb(7, 17, 27)
          line-height 16px

      .comm-item-right
        float right

        .name-view
          vertical-align top
          display inline-block
          margin-right 6px
          font-size 10px
          color rgb(147, 153, 159)
          line-height 12px

        .avatar-view
          vertical-align top
          display inline-block
          width 12px
          height 12px
          border-radius 50%
          overflow hidden


  .comm-no-list
    padding 0 18px
    font-size 12px
    color rgb(147, 153, 159)
    line-height 32px
    text-align center

.food-fold-enter-active,
.food-fold-leave-active
  transition: transform 0.5s ease, opacity 0.5s ease;

.food-fold-enter-to, .fade-leave
  transform: translate3d(0, 0, 0);
  opacity: 1;

.food-fold-enter, .food-fold-leave-to
  transform: translate3d(100%, 0, 0);
</style>
