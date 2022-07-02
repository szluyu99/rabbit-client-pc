<template>
    <AppTopNav />
    <header>头部</header>
    <main>

    <slot /> 

    </main>
    <footer>底部</footer>
</template>

<script setup name="AppLayout">
import AppTopNav from '@/components/AppTopNav'

// 使用 store
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
</script>