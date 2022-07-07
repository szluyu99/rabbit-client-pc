import { defineStore } from "pinia";
import { getCategoriesAPI } from "@/api/home";
// 分类常量数据
import { topCategories } from "@/api/constants";

export const useCategoryStore = defineStore('category', {
    persist: true, // 持久化存储
    state: () => ({
        // 如果默认是 []，看不见默认的数据，会等后台数据返回后才更新
        // 根据常量数据来生成一个默认的顶级分类数据，避免出现页面数据空白
        list: topCategories.map((name, i) => ({ name, id: i })),
    }),
    actions: {
        setCategories(list) {
            this.list = list
        },
        /**
         * 控制导航下拉菜单的显示
         * @param state 状态对象
         * @param index 一级分类ID
         */
        open(index) {
            this.list[index].open = true
        },
        /**
         * 控制导航下拉菜单的隐藏
         * @param state 状态对象
         * @param index 一级分类ID
         */
        close(index) {
            this.list[index].open = false;
        },
        /**
         * 获取分类数据
         * 需要向后台请求数据，所以使用 action 函数（异步）
         * @param commit
         * @returns {Promise<void>}
         */
        async getCategories() {
            const data = await getCategoriesAPI();
            // console.log("response data:", data);
            // 为每个元素添加 open 属性（下拉菜单展示属性）
            data.result.forEach(item => (item.open = false));
            this.setCategories(data.result)
        }
    },
})