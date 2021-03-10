import { PageEnum } from '@/enum/pageEnum'

/**
 * @description 系统基础主配置路由
 */
const _import = require(`@/router/import/import_${process.env.NODE_ENV}`)

import type { AppRouteModule } from '@/router/libs/types'

const RootRoute: AppRouteModule[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
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
