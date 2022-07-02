import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Library 中有些组件使用了 JSX
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { loadEnv } from 'vite'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envConfig = loadEnv(mode, './')
  console.log(command, mode, envConfig);

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
