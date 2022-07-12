import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import Message from "@/components/library/Message";
import Confirm from "@/components/library/Confirm";

export default function useCart() {
  const cartStore = useCartStore();
  const router = useRouter();

  //#region 可购买商品数据
  // 可购买商品列表
  const effectiveGoodsList = computed(
    () => cartStore.effectiveGoodsList()
  );
  // 可购买商品数量
  const effectiveGoodsCount = computed(
    () => cartStore.effectiveGoodsCount()
  );
  // 可购买商品总价
  const effectiveGoodsPrice = computed(
    () => cartStore.effectiveGoodsPrice()
  );
  //#endregion

  return {
    effectiveGoodsList,
    effectiveGoodsCount,
    effectiveGoodsPrice,
  };
}
