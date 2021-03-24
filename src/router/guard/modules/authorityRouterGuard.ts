import { App } from 'vue'
import type { Router } from 'vue-router'
import { createAsyncRoutes } from '@/router/libs/generateRoutes'
import { MainRoot } from '@/router/routes/modules/route-base'
import store from '@/store'

/**
 * @description 装载路由请求前拦截处理，处理动态菜单
 */
export function createAuthorityRouterGuard(app: App, router: Router) {
  router.beforeEach(async (to: any, _from: any, next: any) => {
    // 已加载导航菜单数据标示，排除全局配置的可访问路由
    if (store.state.routeStore?.hasAsyncRoutes) {
      next()
    } else {
      /**
       * @description 根据登录用户获取菜单访问和控制权限
       *              生成动态路由TreeList，采用addRoute装配
       */
      await createAsyncRoutes(app).then((res: any) => {
        // 全量存储导航菜单数据，同步设置已加载菜单数据 -> hasAsyncRoutes = true
        store.dispatch('routeStore/ActionSetRoutes', res).then(item => {
          // routeStore.getGenerateRoutes.map(info => {})
        })

        // 装配动态路由
        const routersList = [...res]
        routersList.map((item: any) => {
          // 排除菜单即跳转路由的标示数据
          if (item.meta.menuLink) {
            MainRoot.children?.push(item)
          } else {
            router.addRoute(item)
          }
        })

        // 装载根菜单即路由对象
        router.addRoute(MainRoot as any)

        console.log('-------------------- 加载的路由对象 --------------------')
        console.log(routersList)
      })

      // 定向跳转
      next({ ...to, replace: true })
    }
  })
}
