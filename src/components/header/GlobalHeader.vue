<template>
  <div class="global-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="sellerData.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ sellerData.name }}</span>
        </div>
        <div class="description">
          {{ sellerData.description }}/{{ sellerData.deliveryTime }}分钟送达
        </div>
        <div class="support" v-if="sellerData.supports">
          <i class="icon" :class="classMap[sellerData.supports[0].type]"></i>
          <span class="text">{{ sellerData.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count" v-if="sellerData.supports" @click="showDetail">
        <span class="count">{{ sellerData.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ sellerData.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="sellerData.avatar" alt="" height="100%" width="150%" />
    </div>
    <transition name="fade">
      <div class="detail" v-show="showView">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ sellerData.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="sellerData.score"></star>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <supports-view
                :is-show="classMap[0]"
                :supports="sellerData.supports"
                :class-map="classMap"
              ></supports-view>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">
                  {{ sellerData.bulletin }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from "../star/StarView.vue";
import supportsView from "../../views/supports/SupportsView.vue";

export default {
  name: "GlobalHeader",
  data() {
    return {
      showView: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    };
  },
  props: {
    sellerData: {
      type: Object
    }

  }, methods: {
    showDetail() {
      console.log("showDetail", this.sellerData.supports[0]);
      this.showView = true;
    },
    hideDetail() {
      this.showView = false;
    }


  },
  components: {
    star,
    supportsView
  }


};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/style.css"
@import "../../common/stylus/index.styl"
.global-header
  position relative
  overflow hidden
  color: #fff
  background rgba(7, 17, 27, 0.5)

  .content-wrapper
    position relative
    padding 24px 12px 18px 24px

    .avatar
      display inline-block
      vertical-align top

      img
        border-radius 2px

    .content
      display inline-block
      font-size 16px
      margin-left 16px

      .title
        margin 2px 0 8px 0

        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          background-image url('brand@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('brand@3x.png')
          background-size 30px 18px
          background-repeat no-repeat

        .name
          vertical-align top
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold

      .description
        margin-bottom 10px
        line-height 12px
        font-size 12px

      .support
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat

          &.decrease
            background-image url('decrease_1@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('decrease_1@3x.png')

          &.discount
            background-image url('discount_1@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('discount_1@3x.png')

          &.guarantee
            background-image url('guarantee_1@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('guarantee_1@3x.png')


          &.invoice
            background-image url('invoice_1@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('invoice_1@3x.png')

          &.special
            background-image url('special_1@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('special_1@3x.png')

        .text
          vertical-align top
          line-height 12px
          font-size 12px

    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background-color rgba(0, 0, 0, 0.2)
      text-align center

      .count
        vertical-align top
        font-size 10px

      .icon-keyboard_arrow_right
        margin-top 4px
        margin-left 4px
        line-height 24px
        font-size 10px

  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background rgba(7, 17, 27, 0.2)

    .bulletin-title
      display inline-block
      margin-top 9px
      width 22px
      height 12px
      background-image url('bulletin@2x.png')
      @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
        background-image url('bulletin@3x.png')
      background-size 22px 12px
      background-repeat no-repeat

    .bulletin-text
      vertical-align top
      margin 0 4px
      font-size 10px

    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 9px

  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    Z-index -1
    filter: blur(10px)

  .detail
    position fixed
    z-index 100
    top 0
    right 0
    width 100%
    height 100%
    overflow auto
    background rgba(7, 17, 27, 0.8)
    backdrop-filter blur(10px)

  .fade-enter-active,
  .fade-leave-active
    transition opacity 0.5s ease;

  .fade-enter,
  .fade-leave-to
    opacity 0;


.detail-wrapper
  min-height 100%
  min-width 100%

  .detail-main
    margin-top 64px
    padding-bottom 64px

    .name
      line-height 16px
      text-align center
      font-size 16px
      font-weight 700

    .star-wrapper
      margin-top 18px
      padding 2px 0
      text-align center

    .title
      display flex
      width 80%
      margin 28px auto 24px auto

      .line
        flex 1
        position relative
        top -8px
        border-bottom 1px solid rgba(255, 255, 255, 0.2)

      .text
        padding 0 12px
        font-weight 700
        font-size 14px


.bulletin
  width 80%
  margin 0 auto

  .content
    padding 0 12px
    line-height 24px
    text-align left
    font-size 12px

.detail-close
  position relative
  width 32px
  height 32px
  margin -64px auto 0 auto
  clear both
  font-size 32px
</style>
