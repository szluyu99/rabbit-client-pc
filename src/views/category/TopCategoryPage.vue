<template>
  <AppLayout>
    <div class="top-category">
      <div class="container">
        <!-- 面包屑头部 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :id="category?.id" :path="`/category/${category?.id}`">
            {{ category?.name }}
          </XtxBreadItem>
        </XtxBread>
        <!-- 分类轮播图 -->
        <XtxCarousel
          :style="{ height: '500px' }"
          v-if="banners"
          :carousels="banners"
          autoPlay
        />
        <!-- 全部二级分类 -->
        <ShowSubCategoryList v-if="category" :subCategory="category.children" />
        <!-- 二级分类商品 -->
        <RecommendGoods />
      </div>
    </div>
  </AppLayout>
</template>

<script setup name="TopCategoryPage">
import AppLayout from '@/components/AppLayout'
import useBanners from '@/hooks/useBanner'
import useBread from '@/hooks/category/useBread'
import ShowSubCategoryList from '@/views/category/components/ShowSubCategoryList'
import RecommendGoods from '@/views/category/components/RecommendGoods'

const category = useBread()
const banners = useBanners()
</script>
