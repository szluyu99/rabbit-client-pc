import { createRouter, createWebHashHistory } from "vue-router";

const LoginPage = () => import("@/views/login/LoginPage");
const HomePage = () => import("@/views/home/HomePage");
// 分类
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");
// 商品详情
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");
// 购物车
const CartPage = () => import("@/views/cart/CartPage");
// 结算 & 支付
const CheckoutPage = () => import("@/views/pay/CheckoutPage");
const PayPage = () => import("@/views/pay/PayPage");
const PayResultPage = () => import("@/views/pay/PayResultPage");

// 路由列表
const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  // 分类
  { path: "/category/:id", component: TopCategoryPage },
  { path: "/category/sub/:id", component: SubCategoryPage },
  { path: "/goods/:id", component: GoodsDetailPage },
  // 购物车
  { path: "/cart", component: CartPage },
  // 结算 & 支付
  { path: "/checkout/order", component: CheckoutPage },
  { path: "/checkout/pay", component: PayPage },
  { path: "/pay/callback", component: PayResultPage },
  /* 404 */
  {
    path: "/notfound",
    component: () => import("@/views/NotFound")
  },
  // 剩余所有路径全部重定向到 /notfound
  {
    path: "/:catchAll(.*)",
    redirect: "/notfound"
  }
];

// 创建并生成路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次路由变化时，都会触发该钩子
  scrollBehavior() {
    return { top: 0 }; // 返回顶部
  },
  // 定义【模糊匹配】和【精确匹配】激活类名
  linkActiveClass: "fuzzy-active",
  linkExactActiveClass: "exact-active"
});

//TODO 路由守卫 - 登录拦截

export default router;
