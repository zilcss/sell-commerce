<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive">{{ desc.all }}</span>
      <span class="block positive">{{ desc.positive }}</span>
      <span class="block negative">{{ desc.negative }}</span>
    </div>
    <div class="switch border-1px">
      <span class="icon icon-check_circle" :class="{ on: onlyContent }"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
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
          positive: "推荐"
        }
      }
    }
  }
}
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

    .text
      vertical-align top
      margin-left 4px
      font-size 12px
      color rgb(147, 153, 159)
      line-height 24px
</style>
