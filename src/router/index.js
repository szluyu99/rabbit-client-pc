import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () => import('@/views/home/HomePage');
const LoginPage = () => import("@/views/login/LoginPage");

// 路由列表
const routes = [
    { path: '/', component: HomePage },
    { path: "/login", component: LoginPage },
    /* 404 */
    {
        path: '/notfound',
        component: () => import('@/views/NotFound')
    },
    // 剩余所有路径全部重定向到 /notfound
    {
        path: "/:catchAll(.*)",
        redirect: "/notfound"
    }
]

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
    linkExactActiveClass: "exact-active",
})

export default router