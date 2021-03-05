import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes/' // 加载路由模块
import { scrollBehavior } from '@/router/libs/scrollBehavior' // 加载滚动行为控制
import { initGuard } from '@/router/routes/guard' // 路由导航守卫行为事件
import { REDIRECT_NAME } from '@/router/libs/constant' // 路由导航守卫行为事件

// 创建路由主对象
const router = createRouter({
  history: createWebHashHistory('hash'), // 访问模式
  routes: basicRoutes as any[], // 路由模块
  strict: true, // 严格模式
  scrollBehavior: scrollBehavior, // 滚动行为控制
})

// 抓取服务异常
router.onError(error => {
  console.error(error)
})

export default router // 对外提供服务对象

/**
 * @description 对外服务
 *              配置加载路由，app 由 main.ts 传递的 vue 对象
 */
export function setupRouter(app: App<Element>) {
  app.use(router)
  initGuard(router)
  app.config.globalProperties.$router = router
}

/**
 * @description 对外服务
 *              重置路由 routes 路由模块集合对象数据，重载路由数据
 */
export function resetRouter() {
  const resetWhiteNameList = ['Login', REDIRECT_NAME]
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
