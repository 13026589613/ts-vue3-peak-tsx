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
    // dashboard
    // {
    //   name: 'dashboard',
    //   parentId: 0,
    //   id: 1,
    //   meta: {
    //     icon: 'dashboard',
    //     title: '仪表盘',
    //     show: true,
    //   },
    //   component: 'RouteView',
    //   redirect: '/dashboard/workplace',
    // },
    // {
    //   name: 'workplace',
    //   parentId: 1,
    //   id: 7,
    //   meta: {
    //     title: '工作台',
    //     show: true,
    //   },
    //   component: 'Workplace',
    // },
    // {
    //   name: 'monitor',
    //   path: 'https://www.baidu.com/',
    //   parentId: 1,
    //   id: 3,
    //   meta: {
    //     title: '监控页（外部）',
    //     target: '_blank',
    //     show: true,
    //   },
    // },

    // account
    {
      name: 'eip',
      parentId: 0,
      id: 10028,
      path: '/eip',
      meta: {
        title: 'eip',
        icon: 'user',
        // show: true,
      },
      // redirect: '/eip/area',
      component: null,
    },
    {
      name: 'area',
      parentId: 10028,
      id: 10029,
      path: 'area',
      component: 'views/modules/eip/area/index',
      meta: {
        title: '地区',
        // show: true,
      },
    },
    // 特殊三级菜单
    // {
    //   name: 'settings',
    //   parentId: 10028,
    //   id: 10030,
    //   path: '/eip',
    //   meta: {
    //     title: '个人设置',
    //     hideHeader: true,
    //     hideChildren: true,
    //     show: true,
    //   },
    //   redirect: '/eip/area',
    //   component: 'AccountSettings',
    // },
    // {
    //   name: 'BaseSettings',
    //   path: '/eip/area',
    //   parentId: 10030,
    //   id: 10031,
    //   meta: {
    //     title: '基本设置',
    //     show: false,
    //   },
    //   component: 'BaseSettings',
    // },
    // {
    //   name: 'SecuritySettings',
    //   path: '/account/settings/security',
    //   parentId: 10030,
    //   id: 10032,
    //   meta: {
    //     title: '安全设置',
    //     show: false,
    //   },
    //   component: 'SecuritySettings',
    // },
  ]

  const { data } = queryParams // 查询参数位置
  return builder(userNav, '成功获取登录用户的菜单列表数据信息', 200)

  // return builder(queryParams, '未获取到相关数据', 201)
}

Mock.mock(/\/service\/menu\/nav/, 'post', userMenuNav)
export default Mock
