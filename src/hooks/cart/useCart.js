import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import Message from "@/components/library/Message";
import Confirm from "@/components/library/Confirm";

export default function useCart() {
  const cartStore = useCartStore();
  const router = useRouter();

  // const effectiveGoodsList = computed(() => cartStore.effectiveGoodsList());
  const effectiveGoodsList = computed(() => cartStore.effectiveGoodsList);
  // 可购买商品数量
  const effectiveGoodsCount = computed(() => cartStore.effectiveGoodsCount);
  // 可购买商品总价
  const effectiveGoodsPrice = computed(() => cartStore.effectiveGoodsPrice);
  //#endregion

  //#region 删除单个商品
  const deleteGoodsOfCartBySkuId = (skuId) => {
    Confirm({ content: "您确定要删除该商品吗？" })
      .then(() => {
        cartStore.deleteGoodsOfCartBySkuIdAsync(skuId).then(() => {
          Message({ type: "success", text: "购物车的商品删除成功！" });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //#endregion

  //#region 失效商品数据
  const invalidGoodsList = computed(() => cartStore.invalidGoodsList);
  //#endregion

  //#region 用户选择的商品数据
  // 用户选择的商品数量
  const userSelectedGoodsCount = computed(
    () => cartStore.userSelectedGoodsCount
  );
  // 用户选择的商品价格
  const userSelectedGoodsPrice = computed(
    () => cartStore.userSelectedGoodsPrice
  );
  //#endregion

  //#region 更新购物车
  // 更新本地购物车数据
  const updateCartList = () => {
    // TODO 问题
    cartStore.updateGoodsBySkuId().then(() => {
      Message({ type: "success", text: "本地购物车的商品信息更新成功" });
    });
  };
  //#endregion

  // 获取全选按钮的状态
  const selectAllButtonStatus = computed(() => cartStore.selectedAllBtnStatus);

  //#region 批量删除用户选择的商品、清空失效商品
  const deleteBatchGoodsOfCart = (flag) => {
    let content = "";
    // 判断flag的类型 即要删除的商品类型
    if (flag === "userSelectedGoodsList") {
      if (userSelectedGoodsCount.value === 0) {
        Message({ type: "warn", text: "请选择要删除的商品" });
        return;
      }
      content = "您确定要删除所有选中的商品吗";
    } else if (flag === "invalidGoodsList") {
      if (invalidGoodsList.value.length === 0) {
        Message({ type: "warn", text: "没有失效的商品" });
        return;
      }
      content = "您确定要清空所有失效的商品吗";
    }
    // 弹框确认是否要删除
    Confirm({ content })
      .then(() => {
        cartStore.deleteGoodsOfCartByUserSelectedOrInvalid(flag).then(() => {
          Message({ type: "success", text: "商品删除成功" });
        });
      })
      .catch(() => {});
  };
  //#endregion

  // 更新购物车仲的商品数量
  const changeGoodsCountOfCartBySkuId = ({ skuId, count }) => {
    // TODO 问题
  };

  // 下单结算按钮
  const jumpToCheckout = () => {
    // 判断用户是否选择了商品
    if (!userSelectedGoodsCount.value) {
      return Message({ type: "warn", text: "请至少选择一个商品" });
    }
    // 跳转到结算页面
    router.push("/checkout/order");
  };

  return {
    effectiveGoodsList,
    effectiveGoodsCount,
    effectiveGoodsPrice,
    deleteGoodsOfCartBySkuId,
    invalidGoodsList,
    userSelectedGoodsCount,
    userSelectedGoodsPrice,
    updateCartList,
    selectAllButtonStatus,
    deleteBatchGoodsOfCart,
    changeGoodsCountOfCartBySkuId,
    jumpToCheckout,
  };
}
