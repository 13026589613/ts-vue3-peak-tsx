/**
 * @description
 */
const _import = require(`@/router/import/import_${process.env.NODE_ENV}`)

import type { AppRouteModule } from '@/router/libs/types'

const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: _import('common/main-out/index'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
]

// export const mainOutRouteNames = mainOutRoutes.map(item => item.name)

export default mainOutRoutes
