<template>
  <div class="rating-select">
    <div class="rating-type">
      <span
        class="block positive"
        @click="selectNumber(2)"
        :class="{ on: localSelectType === 2 }"
        >{{ desc.all
        }}<span class="number">{{ positiveSize + negativeSize }}</span>
      </span>
      <span
        class="block positive"
        @click="selectNumber(0)"
        :class="{ on: localSelectType === 0 }"
        >{{ desc.positive }}<span class="number">{{ positiveSize }}</span></span
      >
      <span
        class="block negative"
        @click="selectNumber(1)"
        :class="{ on: localSelectType === 1 }"
        >{{ desc.negative }}
        <span class="number">{{ negativeSize }}</span></span
      >
    </div>
    <div class="switch border-1px">
      <span
        class="icon icon-check_circle"
        @click="toggleContent"
        :class="{ on: localOnlyContent }"
      ></span>
      <span class="text" @click="toggleContent">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      },
    },
    selectType: {
      type: Number,
      default: ALL,
    },
    onlyContent: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          negative: "不满意",
          positive: "推荐",
        };
      },
    },
  },
  data() {
    return {
      localSelectType: this.selectType, // 本地副本
      localOnlyContent: this.onlyContent, // 本地副本
    };
  },
  watch: {
    selectType(newVal) {
      this.localSelectType = newVal; // 同步props变化到本地副本
    },
    onlyContent(newVal) {
      this.localOnlyContent = newVal; // 同步props变化到本地副本
    },
  },
  computed: {
    positiveSize() {
      return this.ratings.filter((rating) => {
        console.log(rating, "456")
        return rating.rateType === POSITIVE;
      }).length;

    },
    negativeSize() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      }).length;

    }
  },

  methods: {
    selectNumber(type) {
      this.localSelectType = type;
      // 修改emit内容，传递更详细的对象
      this.$emit("ratingType", this.localSelectType);
    },
    toggleContent() {
      this.localOnlyContent = !this.localOnlyContent;
      // 修改emit内容，传递更详细的状态
      this.$emit("contentToggle", this.localOnlyContent);
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.rating-select
  .rating-type
    margin 0 18px
    padding 12px 18px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)

    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      line-height 16px
      border-radius 1px
      font-size 12px

      .number
        margin-left 5px
        font-size 10px
        line-height 16px

      &.positive
        background rgba(0, 160, 220, 0.2)

        &.on
          background #00a0dc
          color #fff


      &.negative
        background rgba(77, 85, 93, 0.2)

        &.on
          background #4d555d
          color #fff

  .switch
    padding 12px 18px
    border-1px(rgba(7, 17, 27, 0.1))

    .icon
      vertical-align top
      font-size 24px
      color rgb(147, 153, 159)
      line-height 24px

      &.on
        color #00c850

    .text
      vertical-align top
      margin-left 4px
      font-size 12px
      color rgb(147, 153, 159)
      line-height 24px
</style>
