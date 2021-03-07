import { createApp, getCurrentInstance } from 'vue' // vue
import router, { setupRouter } from '@/router' // router
import { setupStore } from '@/store'
import App from './App' // app 引导首页

import { isDev, useMock } from '@/utils/tools/env' // 生产模式

// 初始化创建Vue
const app = createApp(App)

// 路由加载配置
setupRouter(app)

// 装载Store
setupStore(app)

// 路由加载完成，初始化引导首页
router.isReady().then(() => {
  app.mount('#app', true)
})

// 开发环境配置APP config
if (isDev()) {
  app.config.performance = true
  window.__APP__ = app

  // 装载mock
  useMock() ? require('../mock/index') : null
}
