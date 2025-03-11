<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive" :class="{ active: selectType === POSITIVE }"
        >{{ desc.all }}}</span
      >
      <span
        class="block positive"
        :class="{ active: selectType === POSITIVE }"
        >{{ desc.positive }}</span
      >
      <span
        class="block negative"
        :class="{ active: selectType === NEGATIVE }"
        >{{ desc.negative }}</span
      >
    </div>
    <div class="switch">
      <span class="icon-check_circle" :class="{ on: onlyContent }"></span>
      <span class="text">只看有内容的评价</span>
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

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
