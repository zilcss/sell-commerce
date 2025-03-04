import { RouteConfig } from "vue-router";
import CommentView from "../views/comment/CommentView.vue";
import GoodsView from "../views/goods/GoodsView.vue";
import SellerView from "../views/seller/SellerView.vue";

export const routes: Array<RouteConfig> = [
  {
    path: "/comment",
    name: "评论",
    component: CommentView,
  },
  {
    path: "/goods",
    name: "商品",
    component: GoodsView,
  },
  {
    path: "/seller",
    name: "商家",
    component: SellerView,
  },
];
