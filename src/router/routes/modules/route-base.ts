import type { AppRouteModule } from '@/router/libs/types'
import { PageEnum } from '@/enum/pageEnum'
import { LAYOUT } from '@/router/libs/constant'

/**
 * @description 系统基础主配置路由
 */
const _import = require(`@/router/import/import_${process.env.NODE_ENV}`)

const RootRoute: AppRouteModule[] = [
  {
    path: '/',
    name: 'Root',
    meta: { title: '重定向' },
    redirect: { name: 'Login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('common/login/index.vue'),
    // component: require('common/login/Login'),
    meta: {
      title: 'routes.basic.login',
    },
  },
]

// 基础布局
export const MainRoot: AppRouteModule = {
  path: '/',
  name: 'Main',
  component: LAYOUT,
  meta: {
    title: '主入口',
  },
  children: [],
}

// RootRoute.push(MainRoot)

export default RootRoute
