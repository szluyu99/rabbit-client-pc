<template>
    <AppTopNav />
    <AppHeader />
    <AppHeaderSticky />
    <slot />
    <AppFooter />
</template>

<script setup name="AppLayout">
import AppTopNav from '@/components/AppTopNav'
import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import AppHeaderSticky from '@/components/AppHeaderSticky';

// 调用获取分类信息的方法
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
categoryStore.getCategories()
</script>