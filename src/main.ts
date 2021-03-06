import { createApp, getCurrentInstance } from 'vue' // vue
import router, { setupRouter } from '@/router' // router
import { setupStore } from '@/store'
import App from './App' // app 引导首页

import { isDev, useMock } from '@/utils/tools/env' // 生产模式
import { initApi } from '@/config/plugins/tools/axios' // 封装 axios
import { initAntVueDesign } from '@/config/plugins/antd-vue' // 导入Ant组件配置

import '@/config' // 导入常规配置项

// 初始化创建Vue
const app = createApp(App)

// 装载 axios - modules 对象集合
initApi(app)

// 装载 antd
initAntVueDesign(app)

// 装载Store
setupStore(app)

// 路由加载配置
setupRouter(app)

// 开发环境配置APP config
if (isDev()) {
  app.config.performance = true
  window.__APP__ = app

  // 装载mock
  useMock() ? require('../mock/index') : null
}

// 路由加载完成，初始化引导首页
router.isReady().then(() => {
  app.mount('#app', true)
})
