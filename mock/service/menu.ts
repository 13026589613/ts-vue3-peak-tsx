/**
 * @description 菜单 - 获取菜单数据
 * @author PP
 */
const Mock = require('mockjs2')
const { getQueryParameters, getBody, builder } = require('../utils')

/**
 * @description 获取用户的菜单权限列表清单
 * @params 检索条件 查询参数
 */
const userMenuNav = params => {
  let listBase = []
  const queryParams = params.type === 'POST' ? getBody(params) : getQueryParameters(params)

  const userNav = [
    {
      name: 'example',
      parentId: 0,
      id: 100000,
      path: '/example',
      meta: {
        title: '样例代码',
        icon: 'user',
        show: true,
        menuLink: true,
      },
      componentPath: 'views/modules/example/base',
    },
    {
      name: 'eip',
      parentId: 0,
      id: 200,
      path: '/eip',
      meta: {
        title: '系统管理',
        icon: 'user',
        show: true,
      },
      redirect: '/eip/area',
      componentPath: null,
    },
    {
      name: 'area',
      parentId: 200,
      id: 2001,
      path: 'area',
      componentPath: 'views/modules/eip/area/index',
      meta: {
        title: '地区管理',
        show: true,
      },
    },
    {
      name: 'threeMenu',
      parentId: 0,
      id: 10000,
      path: '/three-menu',
      meta: {
        title: '多层结构',
        icon: 'user',
        show: true,
      },
      componentPath: null,
    },
    {
      name: 'subMenu',
      parentId: 10000,
      id: 10001,
      path: 'sub-menu',
      meta: {
        title: '二层菜单',
        hideHeader: true,
        hideChildren: true,
        show: true,
        isSubMenu: true,
      },
      componentPath: null,
    },
    {
      name: 'firstSubMenu',
      path: 'first',
      parentId: 10001,
      id: 100011,
      meta: {
        title: '子级一',
        show: true,
      },
      componentPath: 'views/modules/example/subMenuFirst',
    },
    {
      name: 'secondSubMenu',
      path: 'second',
      parentId: 10001,
      id: 100012,
      meta: {
        title: '子级二',
        show: true,
      },
      componentPath: 'views/modules/example/subMenuSecond',
    },
  ]

  const { data } = queryParams // 查询参数位置
  return builder(userNav, '成功获取登录用户的菜单列表数据信息', 200)

  // return builder(queryParams, '未获取到相关数据', 201)
}

Mock.mock(/\/service\/menu\/nav/, 'post', userMenuNav)
export default Mock
