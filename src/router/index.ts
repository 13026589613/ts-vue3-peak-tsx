import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes/' // 加载路由模块
import { scrollBehavior } from '@/router/libs/scrollBehavior' // 加载滚动行为控制
import { initGuard } from '@/router/guard' // 路由导航守卫行为事件
import { REDIRECT_NAME } from '@/router/libs/constant' // 路由导航守卫行为事件
import { createAsyncRoutes } from '@/router/libs/generateRoutes'
import store from '@/store'
import { routeStore } from '@/store/modules/routes'

// 创建路由主对象
const router = createRouter({
  // history: createWebHistory(), // 访问模式
  history: createWebHashHistory(), // 访问模式
  routes: basicRoutes as any[], // 路由模块
  strict: true, // 严格模式
  scrollBehavior: scrollBehavior, // 滚动行为控制
})

// 抓取服务异常
router.onError(error => {
  console.error(error)
})

// router 拦截
router.beforeEach((to: any, from: any, next: Function) => {
  next()
})

export default router // 对外提供服务对象

/**
 * @description 对外服务
 *              配置加载路由，app 由 main.ts 传递的 vue 对象
 */
export function setupRouter(app: App<Element>) {
  // 解决 UI 导航栏中的 vue-router在 3.0 版本以上重复点菜单报错问题
  const originalPush = router.push
  router.push = function push(location: any) {
    const originalPushCall: any = originalPush.call(app, location)
    return originalPushCall ? originalPushCall.catch((err: any) => err) : null
  } as any

  // 装载导航守卫
  initGuard(router)

  // 加载动态路由
  createAsyncRoutes(app).then(res => {
    store.dispatch('routeStore/ActionSetRoutes', res).then(item => {
      routeStore.getGenerateRoutes.map(info => {
        console.log(info.name)
      })
      console.log(item)
    })
  })

  // 载入 router
  app.use(router)

  // vue 全局赋值引用
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
