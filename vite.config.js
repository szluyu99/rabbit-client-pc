import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// Library 中有些组件使用了 JSX
import vueJsx from '@vitejs/plugin-vue-jsx'
// script setup name 写法
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envConfig = loadEnv(mode, './')

  return {
    // 打包路径
    base: './',
    plugins: [vue(), vueJsx(), vueSetupExtend()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 注入全局 less 文件
          additionalData: `
            @import "@/assets/styles/variables.less";
            @import "@/assets/styles/common.less";
            @import "@/assets/styles/mixin.less";
          `,
        }
      }
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 引入时不需要后缀
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
  }
})
