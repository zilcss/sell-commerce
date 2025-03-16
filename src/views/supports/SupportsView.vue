<template>
  <div class="supports-view">
    <ul v-if="supports" class="supports" :style="ulSupports">
      <li
        v-for="(item, index) in supports"
        :key="index"
        class="support-item"
        :style="itemStyle"
        v-show="isMatch(item, index)"
      >
        <i class="support-icon" :class="classMap[item.type]"></i>
        <span class="text" :style="textStyle">{{ item.description }}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  props: {
    supports: {
      type: Array || Object,
      default() {
        return []
      }
    },
    classMap: {
      type: Array,
      default() {
        return []
      }
    },
    textStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    itemStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    ulSupports: {
      type: Object,
      default() {
        return {}
      }
    },
    isShow: {
      type: [Array, Object, String, Number],
      default() {
        return null
      }

    }
  },
  methods: {
    isMatch(ccItem, index) {
      // 1. 当 mm 未传递时，显示所有项
      if (this.isShow === null) return true;

      // 2. 当 mm 是数组时，检查是否包含当前 ccItem 或索引
      if (Array.isArray(this.isShow)) {
        console.log("array")
        return this.isShow.includes(ccItem) || this.i.includes(index);
      }

      // 3. 当 mm 是对象时，检查是否与 ccItem 深度相等
      if (typeof this.isShow === 'object') {
        console.log("object")
        return JSON.stringify(ccItem) === JSON.stringify(this.isShow);
      }
      console.log("基本", ccItem, this.isShow)
      // 4. 基本类型直接比较
      return ccItem === this.isShow;
    }
  },
  created() {
    console.log(this.sellerData)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.supports-view
  min-height 100%
  min-width 100%

  .supports
    width 80%
    margin 0 auto

    .support-item
      padding 0 12px
      margin-bottom 12px
      text-align left

      &:last-child
        margin-bottom 0

      .support-icon
        display inline-block
        vertical-align top
        margin-right 6px
        width 16px
        height 16px
        background-size 16px 16px
        background-repeat no-repeat

        &.decrease
          background-image url('decrease_2@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('decrease_2@3x.png')

        &.discount
          background-image url('discount_2@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('discount_2@3x.png')

        &.guarantee
          background-image url('guarantee_2@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('guarantee_2@3x.png')

        &.invoice
          background-image url('invoice_2@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('invoice_2@3x.png')

        &.special
          background-image url('special_2@2x.png')
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            background-image url('special_2@3x.png')

      .text
        line-height 16px
        font-size 12px
</style>
