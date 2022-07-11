<template>
  <div class="goods-hot" v-if="hotGoods">
    <h3>{{ typeName }}</h3>
    <GoodsItem v-for="item in hotGoods" :key="item.id" :goods="item"></GoodsItem>
  </div>
</template>

<script setup name="GoodsHot">
import GoodsItem from "@/views/category/components/GoodsItem";
import useGoodsHot from "@/hooks/goods/useGoodsHot";

const props = defineProps({
  type: {
    type: Number,
    default: 1
  }
});

const { hotGoods, typeName } = useGoodsHot(props)
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
