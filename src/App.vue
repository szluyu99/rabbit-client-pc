<template>
  <router-view />
</template>

<script setup>
// 测试 msw 是否拦截成功
import request from '@/utils/request';
request.get('/message').then(res => {
  console.log("msw working:", res);
})
</script>

<style lang="less"> 
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
