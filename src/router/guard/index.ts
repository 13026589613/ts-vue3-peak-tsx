/**
 * @description 路由导航守卫集合
 */
import { Router } from 'vue-router'
import { createScrollGuard } from './modules/scrollGuard' // 滚动守卫

/**
 * @description 初始化导航router 守卫们
 * @param router
 */
export function initGuard(router: Router) {
  createScrollGuard(router)
}
