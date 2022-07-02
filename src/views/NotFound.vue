<template>
    <div>
        <p>NOTFOUND</p>
        <router-link to="/" class="backhome">返回首页</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style lang="less" scoped>
.backhome {
    color: @xtxColor;
}
</style>