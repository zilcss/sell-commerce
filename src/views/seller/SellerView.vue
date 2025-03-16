<template>
  <div class="seller-view" ref="seller-wrapper">
    <div class="seller-content">
      <div class="seller-header">
        <!-- 上层 -->
        <div class="top-section border-1px">
          <div class="left-part">
            <h2 class="store-name">{{ sellerData.name }}</h2>
            <div class="star-rating">
              <star-view :size="36" :score="sellerData.score"></star-view>
            </div>
            <div class="count rating">({{ sellerData.ratingCount }})</div>
            <div class="count sell">月售{{ sellerData.sellCount }}单</div>
          </div>
          <div class="right-part" @click="_favoriteToggle">
            <div class="icon-favorite" :class="{ active: favorite }">
              <i class="icon"></i>
            </div>
            <span class="favorite-text">{{ favoriteText }}</span>
          </div>
        </div>
        <div class="bottom-part-top">
          <div class="part min-price">
            <div class="part-title">起送价</div>
            <div class="part-content">{{ sellerData.minPrice }}元</div>
          </div>
          <div class="part delivery-price">
            <div class="part-title">商家配送价</div>
            <div class="part-content">{{ sellerData.deliveryPrice }}元</div>
          </div>
          <div class="part avg-delivery-time">
            <div class="part-title">平均配送时间</div>
            <div class="part-content">{{ sellerData.deliveryTime }}分钟</div>
          </div>
        </div>
      </div>
      <split-view></split-view>
      <div class="middle-section">
        <!-- 中层 -->
        <div class="upper-part">
          <h3 class="upper-bulletin-title">公告与活动</h3>
          <p class="upper-store-intro">{{ sellerData.bulletin }}</p>
        </div>
        <div class="lower-part">
          <supports-view
            :ul-supports="ulSupports"
            :supports="sellerData.supports"
            :text-style="textStyle"
            :class-map="classMap"
            :item-style="itemStyle"
          ></supports-view>
        </div>
      </div>
      <!-- 下层 -->
      <split-view></split-view>
      <div class="bottom-section">
        <div class="first-part">
          <h3 class="store-pics-title">商家实景</h3>
          <div class="pics-wrapper" ref="pics-wrapper">
            <ul class="pics-content">
              <li
                v-for="(pic, index) in sellerData.pics"
                :key="index"
                class="pic-item"
              >
                <img :src="pic" width="120px" height="90px" alt="商家实景图" />
              </li>
            </ul>
          </div>
        </div>
        <split-view></split-view>
        <div class="second-part">
          <h3 class="store-info-title">商家信息</h3>
          <ul class="info-list">
            <li
              v-for="(info, index) in sellerData.infos"
              :key="index"
              class="info-item border-1px"
            >
              <div class="info">{{ info }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from "vuex";
import StarView from "@/components/star/StarView";
import SplitView from "@/views/split/SplitView";
import SupportsView from "@/views/supports/SupportsView";
import BScroll from "@better-scroll/core";

export default {
  components: {SplitView, StarView, SupportsView},
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      ulSupports: {
        width: '100%'
      },
      textStyle: {
        lineHeight: '16px',
        fontSize: '12px'
      },
      itemStyle: {
        margin: '0 12px',
        padding: '16px 0',
        borderTop: '1px solid rgba(7,17,27,0.1)'
      },
      favorite: false,
    }
  },
  computed: {
    ...mapState({
      sellerData: (state) => state.goods.sellerData // `goods` 为模块名，需与 store 中注册的模块名一致

    }),
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'

    }
  },
  methods: {
    _initScroll() {
      // 初始化整体上下滑动的BScroll
      if (this.$refs["seller-wrapper"] && !this.sellerScroll) {
        this.sellerScroll = new BScroll(this.$refs["seller-wrapper"], {
          click: true,
        });
      }
      // 初始化图片横向滑动的BScroll
      if (this.$refs["pics-wrapper"] && !this.picsScroll) {
        this.picsScroll = new BScroll(this.$refs["pics-wrapper"], {
          scrollX: true,
          scrollY: false,
          click: true,
        });
      }
    },
    _favoriteToggle() {
      this.favorite = !this.favorite;
      //saveToLocal(this.sellerData.id, 'favorite', this.favorite);
    }
  }
  ,
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 300);
  },
  created() {
    this.$store.dispatch('goods/fetchSellerData');
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.seller-view
  position fixed
  top 174px
  bottom 48px
  left 0
  width 100%
  overflow hidden

  .seller-header
    padding 0 18px

    .top-section
      position relative
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))

      .left-part
        display inline-block

        .store-name
          font-size 14px
          color rgb(7, 17, 27)
          line-height 14px
          font-weight 700
          margin-bottom 8px

        .star-rating
          vertical-align top
          margin-right 8px
          display inline-block

        .count
          vertical-align top
          display inline-block
          font-size 10px
          color rgb(77, 85, 93)
          line-height 18px

          &.rating
            margin-right 12px


      .right-part
        position absolute
        display inline-block
        width 40px
        text-align center
        right 18px
        top 18px

        .icon-favorite
          font-size 24px
          color rgb(147, 153, 159)
          line-height 24px
          margin-bottom 4px

          &.active
            color rgb(240, 20, 20)

        .favorite-text
          font-size 10px
          color rgb(77, 85, 93)
          line-height 10px

    .bottom-part-top
      display flex
      padding 18px 0
      justify-content: space-between; /* 子元素在主轴上均匀分布 */
      align-items: center; /* 子元素在交叉轴上居中对齐 */

      .part
        flex 1
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)

        .part-title
          font-size 10px
          color rgb(147, 153, 159)
          line-height 10px
          margin-bottom 4px

        .part-content
          font-size 24px
          font-weight 200
          color rgb(7, 17, 27)
          line-height 24px

  .middle-section
    padding 0 18px

    .upper-part
      padding 18px 0

      .upper-bulletin-title
        font-size 14px
        color rgb(7, 17, 27)
        line-height 14px
        margin-bottom 8px

      .upper-store-intro
        font-size 12px
        font-weight 200
        color rgb(240, 20, 20)
        line-height 24px
        margin 0 12px

  .bottom-section
    .first-part, .second-part
      padding 18px

      .store-pics-title, .store-info-title
        font-size 14px
        color rgb(7, 17, 27)
        line-height 14px
        margin-bottom 12px

      .pics-wrapper
        width 100%
        overflow hidden
        white-space nowrap

        .pics-content
          display flex
          width fit-content
          height 100%

          .pic-item
            margin-left 6px

      .info-list
        margin-top 12px

      .info-item
        font-size 12px
        font-weight 200
        color rgb(7, 17, 27)
        line-height 16px
        padding 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
</style>
