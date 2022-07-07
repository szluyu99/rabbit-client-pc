<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" ref="target">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <Transition name="fade">
        <ul class="goods-list" v-if="goods">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="item.name" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </template>
  </HomePanel>
</template>

<script setup name="HomeNew">
import HomePanel from "@/views/home/components/HomePanel.vue"
import HomeSkeleton from "@/views/home/components/HomeSkeleton.vue"
import useLazyData from '@/hooks/useLazyData'
import { getNewGoods } from "@/api/home";

const { target, result: goods } = useLazyData(getNewGoods)
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // less mixin
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
