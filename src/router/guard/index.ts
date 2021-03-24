/**
 * @description 路由导航守卫集合
 */
import { App } from 'vue'
import { Router } from 'vue-router'
import { createScrollGuard } from './modules/scrollGuard' // 滚动守卫
import { createAuthorityRouterGuard } from './modules/authorityRouterGuard' // 动态菜单权限控制守卫

/**
 * @description 初始化导航router 守卫们
 * @param router
 */
export function initGuard(app: App, router: Router) {
  // 滚动控制
  createScrollGuard(router)

  // 动态菜单的权限访问控制
  createAuthorityRouterGuard(app, router)
}
