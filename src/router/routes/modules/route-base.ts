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
    redirect: PageEnum.BASE_HOME,
    component: LAYOUT,
    meta: {
      title: 'Root',
    },
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

export default RootRoute
