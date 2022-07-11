<template>
	<AppLayout>
		<div class="container">
			<!-- 左侧分类栏 -->
			<HomeCategory />
			<!-- 轮播图 -->
			<HomeBanner />
		</div>
		<!-- 新鲜好物 -->
		<HomeNew />
		<!-- 人气推荐 -->
		<HomeHot />
		<!-- 热门品牌 -->
		<HomeBrand />
		<!-- 产品区块 -->
		<HomeProduct />
		<!-- 最新专题 -->
		<HomeSpecial />
	</AppLayout>
</template>

<script setup name="HomePage">
import AppLayout from '@/components/AppLayout.vue'
import HomeCategory from '@/views/home/components/HomeCategory.vue'
import HomeBanner from '@/views/home/components/HomeBanner.vue'
import HomeNew from '@/views/home/components/HomeNew.vue'
import HomeHot from '@/views/home/components/HomeHot.vue'
import HomeBrand from '@/views/home/components/HomeBrand.vue'
import HomeProduct from '@/views/home/components/HomeProduct.vue'
import HomeSpecial from '@/views/home/components/HomeSpecial.vue'
</script>