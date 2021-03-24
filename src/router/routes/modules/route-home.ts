/**
 * @description 系统首页入口路由配置
 */
import type { AppRouteModule } from '@/router/libs/types'
import { LAYOUT } from '@/router/libs/constant'

const _import = require(`@/router/import/import_${process.env.NODE_ENV}`)

const dashboard: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/welcome',
  meta: {
    icon: 'bx:bx-home',
    title: 'routes.dashboard.welcome',
  },
  children: [
    {
      path: '/home/welcome',
      name: 'Welcome',
      component: _import('common/dashboard/welcome/index'),
      meta: {
        title: 'routes.dashboard.welcome',
        affix: true,
        icon: 'bx:bx-home',
      },
    },
  ],
}

export default dashboard
