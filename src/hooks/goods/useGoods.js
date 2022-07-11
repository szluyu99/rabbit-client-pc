import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getGoodsDetailById } from "@/api/goods";

export default function useGoods() {
  const route = useRoute();

  // 存储数据
  const result = ref(null)

  // 获取数据
  const getGoodsDetail = (id) => {
    getGoodsDetailById(id).then((res) => {
      result.value = res.result;
    });
  };
  getGoodsDetail(route.params.id);

  // 路由跳转更新
  onBeforeRouteUpdate((to) => {
    getGoodsDetail(to.params.id);
  });

  // 接收数据变化
  const onSpecChange = (data) => {
    // console.log(data); //@log
    result.value.price = data.price;
    result.value.oldPrice = data.oldPrice;
    result.value.inventory = data.inventory; // 商品库存
    result.value.currentSelectedSkuId = data.skuId; // 商品skuid
    result.value.currentSelectedSkuText = data.specsText; // 商品规格描述
  };

  // 存储用户选择的商品数量
  const count = ref(1);

  // TODO 加入购物车
  const addCart = () => {

  }

  // TODO 将商品数据存到本地 store

  return { result, onSpecChange, count, addCart };
}