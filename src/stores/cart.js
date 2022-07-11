import {
    addGoodsToCart,
    deleteGoodsOfCartBySkuIds,
    getCartList,
    mergeCart,
    selectAllOrUnselectAll,
    updateGoodsBySkuId,
    updateGoodsOfCartBySkuId,
} from "@/api/cart";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    persist: true, // 持久化
    state: () => ({
        list: [], // 购物车列表
    }),
    actions: {
        // 添加商品到购物车中
        addGoodsToCart(goods) {
            const index = this.list.findIndex((item) => item.skuId === goods.skuId);

            if (index > -1) {
                // splice 方法的返回值是包含被删除元素的数组
                this.list[index].count += goods.count;
                // 删除后再添加到购物车顶端
                if (index === 0) return; //index为0 不需置顶
                this.list.unshift(this.list.splice(index, 1)[0]);
            } else {
                // 将商品直接添加到购物车中
                this.list.unshift(goods);
            }
        },
        // 删除购物车中指定的商品
        deleteGoodsOfCartBySkuId(skuId) {
            // 查询index
            const index = this.list.findIndex((item) => item.skuId === skuId);
            // 删除商品
            if (index > -1) {
                // state.list.splice(index, 1); // 方式一
                this.list = [
                    ...this.list.slice(0, index),
                    ...this.list.slice(index + 1),
                ];
            }
        },
        // 更新购物车商品
        updateGoodsBySkuId(good) {
            this.list.some((item) => {
                if (item.skuId === good.skuId) {
                    item = Object.assign(item, good);
                    return true;
                }
            });
        },
        // 设置购物车列表
        setCart(list) {
            this.list = list
        },

        //TODO 购物车 store 功能
        async addGoodsToCartAsync(goods) {
            // 判断用户是否登录
        }
    }

})