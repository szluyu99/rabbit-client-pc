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
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

export const useCartStore = defineStore("cart", {
  persist: true, // 持久化
  state: () => ({
    list: [], // 购物车列表
  }),
  getters: {
    //#region 计算有效商品
    // 可购买的商品列表
    effectiveGoodsList() {
      return this.list.filter((item) => item.isEffective && item.stock > 0);
    },
    // 可购买的商品数量
    effectiveGoodsCount() {
      return this.effectiveGoodsList.reduce(
        (count, item) => count + item.count,
        0
      );
    },
    // 可购买的商品总价
    effectiveGoodsPrice() {
      return this.effectiveGoodsList.reduce(
        (price, item) => price + Number(item.nowPrice) * item.count,
        0
      );
    },
    //#endregion

    //#region 计算无效商品
    // 不可购买的商品列表（无效商品列表）
    invalidGoodsList() {
      return this.list.filter((item) => !item.isEffective || item.stock === 0);
    },
    //#endregion

    //#region 计算用户选择的商品
    // 用户选择的商品列表
    userSelectedGoodsList() {
      return this.effectiveGoodsList.filter((item) => item.selected);
    },
    // 用户选择的商品数量
    userSelectedGoodsCount() {
      return this.userSelectedGoodsList.reduce(
        (count, item) => item.count + count,
        0
      );
    },
    // 用户选择的商品总价
    userSelectedGoodsPrice() {
      return this.userSelectedGoodsList
        .reduce((price, item) => price + Number(item.nowPrice) * item.count, 0)
        .toFixed(2);
    },
    // 按钮是否全选
    selectedAllBtnStatus() {
      return (
        this.effectiveGoodsCount > 0 &&
        this.userSelectedGoodsCount === this.effectiveGoodsCount
      );
    },
    //#endregion
  },
  actions: {
    // 添加商品到购物车中（本地）
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
    // 删除购物车中指定的商品（本地）
    deleteGoodsOfCartBySkuId(skuId) {
      // 查询 index
      const index = this.list.findIndex((item) => item.skuId === skuId);
      // 删除商品
      if (index > -1) {
        // state.list.splice(index, 1); // 方式一
        // 方式二
        this.list = [
          ...this.list.slice(0, index),
          ...this.list.slice(index + 1),
        ];
      }
    },
    // 更新购物车商品（本地）
    updateGoodsBySkuId(good) {
      this.list.some((item) => {
        if (item.skuId === good.skuId) {
          item = Object.assign(item, good);
          return true;
        }
      });
    },
    // 设置购物车列表（本地）
    setCart(list) {
      this.list = list;
    },

    //TODO 购物车 async 功能
    // 添加商品到购物车功能
    async addGoodsToCartAsync(goods) {
      // 判断用户是否登录
      if (userStore.profile.token) {
        // 已登录
        await addGoodsToCart({
          skuId: goods.skuId,
          count: goods.count,
        });
        // 更新购物车列表
        await this.updateCartListAsync();
      } else {
        // 未登录
        this.addGoodsToCart(goods);
      }
    },
    // 删除购物车中的商品
    async deleteGoodsOfCartBySkuIdAsync(skuId) {
      // 判断用户是否登录
      if (userStore.profile.token) {
        // 已登录
        await deleteGoodsOfCartBySkuIds([skuId]);
        // 更新购物车列表
        this.updateCartListAsync();
      } else {
        this.deleteGoodsOfCartBySkuId(skuId);
      }
    },
    // 更新购物车中的商品（自动更新）
    async updateGoodsBySkuIdAsync() {
      if (userStore.profile.token) {
        // 已登录
        this.updateCartListAsync();
      } else {
        this.list.forEach(({ skuId, id }, index) => {
          updateGoodsBySkuId({ skuId, id }).then((data) => {
            // console.log(index, data);
            data.result.skuId = this.list[index].skuId;
            this.updateGoodsBySkuId(data.result)
          });
        });
      }
    },

    // 更新购物车商品功能（手动更新）
    async updateGoodsOfCartBySkuId(goods) {
      if (userStore.profile.token) {
        // 已登录
        await updateGoodsBySkuId(goods);
        this.updateCartListAsync(); // 更新购物车列表
      } else {
        // 未登录
        this.updateGoodsBySkuId(goods);
      }
    },

    // 更新购物车中的所有商品的按钮状态
    async selectAll(isAll) {
      if (userStore.profile.token) {
        // 已登录
        const ids = this.effectiveGoodsList.map((item) => item.skuId);
        await selectAllOrUnselectAll({ ids, selected: isAll });
        // 更新购物车列表
        this.updateCartListAsync();
      } else {
        this.effectiveGoodsList.forEach((item) => {
          this.updateGoodsBySkuId({
            skuId: item.skuId,
            selected: isAll,
          });
        });
      }
    },
    // 批量删除商品（用户选择，无效商品）
    async deleteGoodsOfCartByUserSelectedOrInvalid(flag) {
      //TODO 批量删除商品
    },
    // 更新商品规格信息
    async updateGoodsOfCartBySkuChanged({ oldSkuId, newSku }) {
      if (userStore.profile.token) {
        // 已登录
        //（因未提供对应接口，采取先删除、再添加的方式达到修改的目的）
        // 查找原商品
        const oldsGoods = this.list.find((item) => item.skuId === oldSkuId);
        // 删除原商品
        await deleteGoodsOfCartBySkuIds([oldSkuId]);
        // 添加新商品（相当于修改规格后的原商品）
        await addGoodsToCart({
          skuId: newSku.skuId,
          count: oldsGoods.count,
        });
        this.updateCartListAsync();
      } else {
        // 未登录
        const oldGoods = this.list.find((item) => item.skuId === oldSkuId);
        const newGoods = {
          ...oldGoods,
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.specsText,
        };
        // 删除原商品
        this.deleteGoodsOfCartBySkuId(oldSkuId);
        // 插入新商品
        this.addGoodsToCart(newGoods);
      }
    },
    // 合并购物车
    async mergeCart() {
      if (!this.list.length) return;
      // 待合并的购物车列表
      const carts = this.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      try {
        // 发送合并购物车请求
        await mergeCart(carts);
        // 清空购物车
        this.setCart([]);
      } catch (e) {
        throw new Error(e);
      }
    },

    // 更新购物车商品
    async updateCartListAsync() {
      if (userStore.profile.token) {
        // 已登录
        const data = await getCartList();
        this.setCart(data.result);
      }
    },
  },
});
