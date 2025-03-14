<template>
  <div class="comment-view" ref="comment-view">
    <div class="comment-view-content">
      <!-- 上板块：评分模块 -->
      <div class="rating-module">
        <div class="rating-left">
          <div class="score-num">{{ sellerData.score }}</div>
          <div class="total-rating">综合评分</div>
          <div class="higher-rate">高于周边商家{{ sellerData.rankRate }}%</div>
        </div>
        <div class="rating-right">
          <div class="star-layer">
            服务态度
            <span class="star"
              ><star-view
                :size="36"
                :score="sellerData.serviceScore"
              ></star-view
            ></span>
            <span class="service-score">{{ sellerData.serviceScore }}</span>
          </div>
          <div class="star-layer">
            食品质量
            <span class="star"
              ><star-view :size="36" :score="sellerData.foodScore"></star-view
            ></span>
            <span class="food-score">{{ sellerData.foodScore }}</span>
          </div>
          <div class="time-layer">
            到达时间 <span class="time">{{ sellerData.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <!-- 中部模块：选择评论内容模块 -->
      <split-view></split-view>
      <div class="rating-select">
        <RatingSelect
          :ratings="ratings"
          :desc="desc"
          :select-type="selectType"
          :only-content="onlyContent"
          @ratingType="ratingType"
          @contentToggle="contentToggle"
        ></RatingSelect>
      </div>
      <!-- 下部模块：评论模块 -->
      <div class="rating-list">
        <ul>
          <li
            v-show="needShow(rating.rateType, rating.text)"
            class="list-rating border-1px"
            v-for="(rating, index) in ratings"
            :key="index"
          >
            <div class="user-avatar">
              <img
                class="user-avatar-img"
                :src="rating.avatar"
                width="28px"
                height="28px"
              />
            </div>
            <div class="list-rating-left">
              <div class="user-content">
                <div class="user-name">{{ rating.username }}</div>
                <div class="user-star">
                  <span class="star-score"
                    ><star-view :size="36" :score="rating.score"></star-view
                  ></span>
                  <span class="delivery-score-time" v-show="rating.deliveryTime"
                    >{{ rating.deliveryTime }}分钟送达</span
                  >
                </div>
              </div>
            </div>
            <div class="list-rating-right">
              <div class="rating-time">{{ rating.rateTime }}</div>
            </div>
            <div class="rating-content-warp">
              <div class="rating-content">{{ rating.text }}</div>
              <div class="rating-content-tag">
                <i
                  class="tag-icon"
                  :class="{
                    'icon-thumb_up': rating.rateType === 0,
                    'icon-thumb_down': rating.rateType === 1,
                  }"
                ></i>
                <ul class="tag-list">
                  <li
                    class="tag-border"
                    v-for="(tag, index) in rating.recommend"
                    :key="index"
                  >
                    <div class="tag">{{ tag }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import axios from "axios";
import StarView from "@/components/star/StarView";
import SplitView from "@/views/split/SplitView";
import RatingSelect from "@/views/ratingselect/RatingSelect";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  components: { RatingSelect, SplitView, StarView },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "满意",
        negative: "不满意",
      },
      isLoading: false,
    };
  },
  props: {
    sellerData: {
      type: Object,
    },
  },
  created() {
    this.fetchRatingsData();
  },
  methods: {
    async fetchRatingsData() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:3000/ratings");

        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(".comment-view", {
            click: true,
          });
        });
      } catch (error) {
        console.error("获取数据失败", error);
      } finally {
        this.isLoading = false;
      }
    },
    ratingType(type) {
      this.selectType = type;
      setTimeout(() => {
        this.scroll.refresh();
      }, 300);
    },
    contentToggle(onlyContent) {
      this.onlyContent = onlyContent;
      setTimeout(() => {
        this.scroll.refresh();
      }, 100);
    },
    needShow(rateType, text) {
      console.log(this.onlyContent, this.selectType, rateType, text, "456");
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return rateType === this.selectType;
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/index.styl"
.comment-view
  position fixed
  top 174px
  left 0
  bottom 48px
  width 100%
  z-index 10
  overflow hidden

  .rating-module
    padding 18px 0
    width 100%

    .rating-left
      flex 0 0 110px
      display inline-block
      text-align center
      width 110px

      .score-num
        font-size 24px
        line-height 28px
        color rgb(255, 153, 0)
        margin-bottom 6px

      .total-rating
        font-size 12px
        line-height 12px
        color rgb(7, 17, 27)
        margin-bottom 8px

      .higher-rate
        font-size 10px
        line-height 10px
        color rgb(147, 153, 159)


    .rating-right
      vertical-align top
      flex 1
      display inline-block
      padding 0 24px
      border-left 1px solid rgba(7, 17, 27, 0.1)

      .star-layer, .time-layer
        vertical-align top
        margin-bottom 8px
        font-size 12px
        color rgb(7, 17, 27)
        line-height 18px

        .star
          display inline-block
          margin 0 12px

        .time
          margin 0 24px
          color rgb(147, 153, 159)

        .service-score, .food-score
          vertical-align top
          font-size 12px
          color rgb(255, 153, 0)
          line-height 18px

  .rating-list
    padding 0 18px

    .list-rating
      position relative
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))

      .user-avatar
        vertical-align top
        display inline-block
        margin-right 12px

        .user-avatar-img
          border-radius 50%


      .list-rating-left
        display inline-block

        .user-content
          display inline-block

          .user-name
            font-size 10px
            color rgb(7, 17, 27)
            line-height 12px
            margin-bottom 4px

          .user-star
            font-size 10px

          .star-score
            vertical-align top
            display inline-block
            margin-right 6px

            .delivery-score-time
              display inline-block
              margin-top 3px
              font-size 10px
              color rgb(147, 153, 159)
              line-height 12px
              font-weight 200


      .list-rating-right
        position absolute
        right 18px
        top 18px

        .rating-time
          font-size 10px
          color rgb(147, 153, 159)
          line-height 12px
          font-weight 200

      .rating-content-warp
        margin 6px 6px 0 38px

        .rating-content
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px

        .rating-content-tag
          margin-top 8px

          .tag-icon
            display inline-block
            font-size 12px
            color rgb(147, 153, 159)
            line-height 16px

            &.icon-thumb_up
              color rgb(0, 160, 220)

            &.icon-thumb_down
              color rgb(183, 187, 191) s

          .tag-list
            display inline-block
            margin-left 8px
            max-width 90%
            white-space: nowrap; /* 强制不换行 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 显示省略号 */

            .tag-border
              display inline-block
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 2px
              margin-right 8px
              background: rgb(255, 255, 255);

              .tag
                font-size 9px
                color rgb(147, 153, 159)
                line-height 16px
</style>
