import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'

// 样式
import 'normalize.css'
import '@/assets/styles/common.less'

// 全局组件
import library from "@/components/library"

// 开发环境引入 mock 数据
if (import.meta.env.DEV) {
    // 动态引入 worker
    const modules = import.meta.globEager('./mocks/worker.js')
    const worker = modules['./mocks/worker.js'].worker
    // 启动拦截程序
    worker
        // onUnhandledRequest: 说明其他请求拦截不处理
        // quiet: 安静模式，请求拦截成功也不要提示信息
        .start({ onUnhandledRequest() { }, quiet: true })
        .then(() => console.log("%cmsw 拦截程序启动成功", "color: green"))
        .catch(e => console.log('msw 拦截程序启动失败',e))
}

createApp(App).use(pinia).use(router).use(library).mount('#app')

