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
    effectiveGoodsList: (state) => {
      return state.list.filter((item) => item.isEffective && item.stock > 0);
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
    invalidGoodsList(state) {
      return state.list.filter((item) => !item.isEffective || item.stock === 0);
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
      this.list = list;
    },

    //TODO 购物车 store 功能
    // 更新购物车功能
    async updateCartListAsync() {
      if (userStore.profile.token) {
        // 登录
        const data = await getCartList();
        this.setCart(data.resutl);
      }
    },
    // 添加商品到购物车功能
    async addGoodsToCartAsync(goods) {
      // 判断用户是否登录
      if (userStore.profile.token) {
        // 登录
        await addGoodsToCart({
          skuId: goods.skuId,
          count: goods.count,
        });
        // 更新购物车列表
        this.updateCartListAsync();
      } else {
        // 未登录
        this.addGoodsToCart(goods);
      }
    },
    // 删除购物车中指定的商品功能
    async deleteGoodsOfCartBySkuIdAsync(skuId) {
      // 判断用户是否登录
      if (userStore.profile.token) {
        // 登录
        this.updateCartListAsync();
      } else {
        this.list.forEach(({ skuId, id }, index) => {
          this.updateGoodsBySkuId({ skuId, id }).then((data) => {
            console.log(index, data);
            data.result.skuId = state.list[index].skuId;
            commit("updateGoodsBySkuId", data.result);
          });
        });
      }
    },

    // 更新购物车商品功能（手动更新）
    async updateGoodsBySkuIdAsync(goods) {
      if (userStore.profile.token) {
        // 已登录
        await updateGoodsBySkuId(goods);
        this.updateCartListAsync(); // 更新购物车列表
      } else {
        // 未登录
        this.updateGoodsBySkuId(goods);
        //TODO getters
      }
    },
  },
});
