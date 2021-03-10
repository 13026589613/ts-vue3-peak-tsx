import type { AppRouteRecordRaw, AppRouteModule } from '@/router/libs/types'

/**
 * @description 遍历文件夹加载路由模块文件 routers - modules 文件
 */
// const modules: any = require.context('./modules', true, /\.index\.ts$/).keys()
const RoutersModules: any = require.context('./', true, /\.ts$/).keys()
const RouteModuleList: AppRouteModule[] = []

// 遍历循环获取 router-js 的配置类
Object.keys(RoutersModules).forEach((key: any) => {
  if (RoutersModules[key].indexOf('modules') > 0) {
    // 加载ts 配置类
    const moduleFile: any = require(`${RoutersModules[key]}`)
    const module = moduleFile.default || {}
    const moduleLists = Array.isArray(module) ? [...module] : [module]

    // 设置router-list 集合
    if (typeof moduleFile === 'object' && JSON.stringify(moduleFile) !== '{}') {
      RouteModuleList.push(...moduleLists)
    }
  }
})

console.log(RouteModuleList)

/**
 * @description 抛出路由集合对象
 */
export const basicRoutes = [...RouteModuleList]
