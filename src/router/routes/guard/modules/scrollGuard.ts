import type { RouteLocationNormalized, Router } from 'vue-router'

// hash 模式处理 # 字符
const isHash = (href: string) => {
  return /^#/.test(href)
}

// 导航守卫 - scroll 滚动处理
export function createScrollGuard(router: Router) {
  const body = document.body

  router.afterEach(async to => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}
