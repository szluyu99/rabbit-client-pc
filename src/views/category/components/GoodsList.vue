<template>
  <ul>
    <li v-for="item in goods" :key="item.id">
      <GoodsItem :goods="item" />
    </li>
  </ul>
</template>

<script setup name="GoodsList">
import { toRef, toRefs } from 'vue'
import GoodsItem from '@/views/category/components/GoodsItem.vue'
const props = defineProps({
  goods: {
    type: Array,
    default: () => []
  }
})
// 直接解构的数据不是响应式
// const { goods } = toRefs(props)
// const goods = toRef(props, 'goods')
</script>

<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
