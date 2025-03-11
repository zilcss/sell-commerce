<template>
  <div>
    <transition name="food-fold">
      <div v-show="showFlag" class="food-view">
        <div class="food-view__header">
          <!-- 商品图片区域 -->
          <div class="img-view">
            <!-- 这里可以插入图片，假设用img标签 -->
            <img :src="food.image" alt="商品图片" />
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
                <span>销量：{{ food.sellCount }}份</span>
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
              <div class="add-cart">加入购物车</div>
            </div>
          </div>
        </div>
        <!-- 商品介绍区域 -->
        <div class="desc-view">
          <!-- 介绍标题 -->
          <div class="desc-title">
            <!-- 这里填写介绍标题 -->
            <h2>商品介绍</h2>
          </div>
          <!-- 介绍描述 -->
          <div class="desc-content">
            <!-- 这里填写介绍描述内容 -->
            <p>{{ food.info }}</p>
          </div>
        </div>
        <!-- 评论相关区域 -->
        <div class="comm-view">
          <!-- 用户查看评论的组件区域 -->
          <div class="comm-select">
            <!-- 这里假设是一个组件，用于用户选择查看哪些评论 -->
            <h1>商品评价</h1>
            <RatingSelect
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
              <li class="comm-item">
                <!-- 评论左边区域（时间、icon、评论内容） -->
                <div class="comm-item-left">
                  <!-- 评论时间 -->
                  <div class="time-view">
                    <span>{{ food.ratings.rateTime }}</span>
                  </div>
                  <!-- 评论icon，假设用i标签 -->
                  <i class="icon-view"></i>
                  <!-- 评论内容 -->
                  <div class="content-view">
                    <p>{{ food.ratings.text }}</p>
                  </div>
                </div>
                <!-- 评论右边区域（用户信息：名称、头像） -->
                <div class="comm-item-right">
                  <!-- 用户头像，假设用img标签 -->
                  <div class="avatar-view">
                    <img :src="food.ratings.avatar" alt="用户头像" />
                  </div>
                  <!-- 用户名称 -->
                  <div class="name-view">
                    <span>{{ food.ratings.username }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import RatingSelect from "@/views/ratingselect/RatingSelect";

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  components: {RatingSelect},
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
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.food-view
  position fixed
  top 0
  bottom 48
  left 0
  z-index 30
  width 100%
  height 100%
  background #fff

.food-fold-enter-active,
.food-fold-leave-active
  transition: transform 0.5s ease, opacity 0.5s ease;

.food-fold-enter-to, .fade-leave
  transform: translate3d(0, 0, 0);
  opacity: 1;

.food-fold-enter, .food-fold-leave-to
  transform: translate3d(100%, 0, 0);
</style>
