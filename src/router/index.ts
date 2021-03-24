import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

import { basicRoutes } from './routes/' // 加载路由模块
import { scrollBehavior } from '@/router/libs/scrollBehavior' // 加载滚动行为控制
import { initGuard } from '@/router/guard' // 路由导航守卫行为事件
import { REDIRECT_NAME } from '@/router/libs/constant' // 路由导航守卫行为事件
import { createAsyncRoutes } from '@/router/libs/generateRoutes'
import { routeStore } from '@/store/modules/routes'
import store from '@/store'
import { LAYOUT } from '@/router/libs/constant'
// 创建路由主对象
const router = createRouter({
  // history: createWebHistory(), // 访问模式
  history: createWebHashHistory(), // 访问模式
  routes: basicRoutes as any[], // 路由模块
  strict: false, // 严格模式
  scrollBehavior: scrollBehavior, // 滚动行为控制
}) as any

// 抓取服务异常
router.onError((error: any) => {
  console.error(error)
})

export default router // 对外提供服务对象

/**
 * @description 对外服务
 *              配置加载路由，app 由 main.ts 传递的 vue 对象
 */
export function setupRouter(app: App<Element>) {
  // 解决 UI 导航栏中的 vue-router在 3.0 版本以上重复点菜单报错问题
  // const originalPush = router.push
  // router.push = function push(location: any) {
  //   const originalPushCall: any = originalPush.call(app, location)
  //   return originalPushCall ? originalPushCall.catch((err: any) => err) : null
  // } as any

  // 载入 router
  app.use(router)

  // 装载导航守卫
  // initGuard(router)

  // router 拦截
  router.beforeEach(async (to: any, _from: any, next: any) => {
    if (store.state.routeStore.hasAsyncRoutes) {
      next()
    } else {
      await createAsyncRoutes(app).then((res: any) => {
        store.dispatch('routeStore/ActionSetRoutes', res).then(item => {
          // routeStore.getGenerateRoutes.map(info => {})
        })

        const routersList = [...res]
        routersList.map((item: any) => {
          router.addRoute(item)
        })

        console.log('-------------------- 加载的路由对象 --------------------')
        console.log(routersList)

        store.dispatch('routeStore/ActionChangeRouterStatus', true)
      })

      next({ ...to, replace: true })
    }
  })

  // vue 全局赋值引用
  app.config.globalProperties.$router = router
}

/**
 * @description 对外服务
 *              重置路由 routes 路由模块集合对象数据，重载路由数据
 */
export function resetRouter() {
  const resetWhiteNameList = ['Login', REDIRECT_NAME]
  router.getRoutes().forEach((route: any) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
