/**
 * @description 系统首页 - 分析统计界面路由配置
 */
const _import = require(`@/router/import/import_${process.env.NODE_ENV}`)
import type { AppRouteModule } from '@/router/libs/types'

import { LAYOUT } from '@/router/libs/constant'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/workbench',
  meta: {
    icon: 'bx:bx-home',
    title: 'routes.dashboard.dashboard',
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: _import('common/dashboard/workbench'),
      meta: {
        title: 'routes.dashboard.workbench',
      },
    },
  ],
}

export default dashboard
