import { App } from 'vue'
import { listToTreeNode } from '@/utils/tools/TransData'
import { LAYOUT, LAYOUT_ROUTER_BASE } from '@/router/libs/constant'

/**
 * @description 通过登录用户的权限动态加载菜单配置，创建routers
 */
export const createAsyncRoutes = (app: App) => {
  return new Promise((resolve, reject) => {
    app.config.globalProperties.$ModuleApis.menu
      .userMenuNav({
        data: {},
      })
      .then(async (res: any) => {
        // 同步构建树形 tree 菜单集合
        const menuTreeList: any[] = []
        await listToTreeNode(res.data, menuTreeList, 0)

        // 同步处理 routes 结构和 meta 参数
        const routersList = await initRoutesList(menuTreeList, null)
        resolve(routersList)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

/**
 * @description 处理菜单数据，转换成动态路由集合
 *              遍历 menuList 集合 生成 对应的 route
 *              调整 component 指向、meta 附加参数的配置等
 */
export const initRoutesList = (menuTreeList: any[], parentMenu: any = null) => {
  return menuTreeList.map((item, index: number) => {
    // meta 参数
    const { title, show, hideChildren, hiddenHead, target, icon, menuLink } = item.meta || {}

    // 当前处理的 router 对象
    const currentRouter = {
      path: item.path || `${(parentMenu && parentMenu?.path) || ''}${item.key ? `/${item.key}` : ''}` || null,
      name: item.name || item.key || '',
      component: null,

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHead: hiddenHead || false,
        menuLink: menuLink || false,
        // target: target,
        // permission: item.name,
      },
    } as any

    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }

    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }

    // 重定向处理
    item.redirect && (currentRouter.redirect = item.redirect)

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (currentRouter.path && !currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')

      currentRouter.component =
        item.componentPath === null || typeof item.componentPath === 'undefined'
          ? item?.meta?.isSubMenu
            ? LAYOUT_ROUTER_BASE
            : LAYOUT
          : () => import(`@/${item.componentPath}`)
    }

    // 递归处理子集 children
    if (item.children && item.children.length > 0) {
      currentRouter.children = initRoutesList(item.children, currentRouter)
    }

    return currentRouter
  })
}
