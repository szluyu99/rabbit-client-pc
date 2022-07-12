import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import("@/views/home/HomePage");
const LoginPage = () => import("@/views/login/LoginPage");
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");
const CartPage = () => import("@/views/cart/CartPage");

// 路由列表
const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  // 分类
  { path: "/category/:id", component: TopCategoryPage },
  { path: "/category/sub/:id", component: SubCategoryPage },
  { path: "/goods/:id", component: GoodsDetailPage },
  { path: "/cart", component: CartPage },
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
