import { App } from 'vue'
import type { Router } from 'vue-router'
import { createAsyncRoutes } from '@/router/libs/generateRoutes'
import store from '@/store'

/**
 * @description 装载路由请求前拦截处理，处理动态菜单
 */
export function createAuthorityRouterGuard(app: App, router: Router) {
  router.beforeEach(async (to: any, _from: any, next: any) => {
    // 已加载导航菜单数据标示，排除全局配置的可访问路由
    if (store.state.routeStore.hasAsyncRoutes) {
      next()
    } else {
      await createAsyncRoutes(app).then((res: any) => {
        // 全量存储导航菜单数据，同步设置已加载菜单数据
        store.dispatch('routeStore/ActionSetRoutes', res).then(item => {
          // routeStore.getGenerateRoutes.map(info => {})
        })

        const routersList = [...res]
        routersList.map((item: any) => {
          router.addRoute(item)
        })

        console.log('-------------------- 加载的路由对象 --------------------')
        console.log(routersList)
      })

      next({ ...to, replace: true })
    }
  })
}
