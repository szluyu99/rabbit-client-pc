<template>
  <AppLayout>
    <!-- 二级分类页面 -->
    <div class="sub-category">
      <div class="container">
        <!-- 面包屑头部 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${category?.topCategory?.id}`">
            {{ category?.topCategory?.name }}
          </XtxBreadItem>
          <XtxBreadItem
            :id="category?.subCategory?.id"
            :path="`/category/sub/${category?.subCategory?.id}`"
          >
            {{ category?.subCategory?.name }}
          </XtxBreadItem>
        </XtxBread>
        <!-- 商品筛选组件 -->
        <SubFilter @on-filter-changed="onFilterSortChanged" />
        <!-- 商品区块 -->
        <div class="goods-list">
          <!-- 排序选项 -->
          <SubSort @on-sort-params-changed="onFilterSortChanged" />
          <!-- 商品列表 -->
          <GoodsList v-if="goods" :goods="goods.items" />
          <!-- 无限列表加载组件 -->
          <XtxInfiniteLoading
            :loading="loading"
            :finished="finished"
            @infinite="loadMore"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup name="SubCategoryPage">
import AppLayout from '@/components/AppLayout.vue'
import SubFilter from '@/views/category/components/SubFilter.vue'
import SubSort from '@/views/category/components/SubSort.vue'
import GoodsList from '@/views/category/components/GoodsList.vue'
import useBread from '@/hooks/category/useBread'
import useGoods from '@/hooks/category/useGoods'

// 二级面包屑
const category = useBread('sub')
// 获取商品数据
const {
  result: goods,
  onFilterSortChanged,
  loading,
  finished,
  loadMore
} = useGoods()
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
