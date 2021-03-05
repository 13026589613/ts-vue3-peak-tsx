/**
 * @description 系统全局性参数配置
 * @author PP
 */
import { API_TYPE, LS } from '@/config/plugins/tools/enum' // 导入枚举配置
import '@/config/plugins/const' // 导入常量数据

/**
 * @description 获取系统已配置参数
 */
const lsFixedHeader = localStorage.getItem(LS.enum.FIXED_HEADER.label) || 'true'
const lsFixedSide = localStorage.getItem(LS.enum.FIXED_SIDE.label) || 'true'
const lsBreadcrumb = localStorage.getItem(LS.enum.SHOW_BREAD_CRUMB.label) || 'true'
const lsTopBreadcrumb = localStorage.getItem(LS.enum.SHOW_TOP_BREAD_CRUMB.label) || 'true'
const lsTagTabs = localStorage.getItem(LS.enum.SHOW_TAG_TABS.label) || 'true'
const lsTagTabsPosition = localStorage.getItem(LS.enum.SHOW_TAG_TABS_POSITION.label) || 'content'
const lsFooterLayout = localStorage.getItem(LS.enum.SHOW_FOOTER_LAYOUT.label) || 'false'

/**
 * @description 设置系统当前布局配置参数
 */
window.FIXED_HEADER = lsFixedHeader === 'true'
window.FIXED_SIDE = lsFixedSide === 'true'
window.SHOW_BREAD_CRUMB = lsBreadcrumb === 'true'
window.SHOW_TAG_TABS = lsTagTabs === 'true'
window.SHOW_FOOTER_LAYOUT = lsFooterLayout === 'true'
window.SHOW_TAG_TABS_POSITION = lsTagTabsPosition // tagtabs true 是 头部，false 在content中
window.SHOW_TOP_BREAD_CRUMB = lsTopBreadcrumb === 'true' // 头部显示界面页签 -> breadcurmb

/**
 * @description 系统非表格反馈对象 response 参数处理
 */
window.SIGNAL_MESSAGE_INFO = {
  code: 'status',
  codeOK: true,
  message: 'msg',
  data: 'result',
  result: 'data',
}

/**
 * @description 系统表格默认返回参数处理 response 参数处理
 *              返回的参数格式化，用于表格等常规处理 API与table等组件中集中处理
 *              可自行设定参数
 */
window.TABLE_BASE_RESPONSE_PARAMS = {
  code: 'status',
  codeOK: true,
  message: 'msg',
  data: 'result',
  result: 'page.list',
  total: 'page.totalCount',
}

/**
 * 默认请求正确，通行CODE编码
 */
window.CROSS_CODE = 200

/**
 * @description 系统名称
 * @param
 */
window.SYS_NAME = '智能管控管理系统'

/**
 * @description 系统默认头像图片
 * @param
 */
window.DEFAULT_HEADER_IMG = 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'

/**
 * @description 系统侧滑弹窗编辑框
 */
window.DRAWER_WINDOWS_WIDTH = '45%'
window.DRAWER_WINDOWS_HALF_WIDTH = '55%'

window.DRAWER_WINDOWS_HALF_WIDTH = '55%'

/**
 * @description 系统侧滑弹窗编辑框(全屏)
 */
window.DRAWER_FULL_WINDOWS_WIDTH = 'calc(100% - 245px)'

/**
 * @description 系统默认登陆用户名称
 * @param
 */
window.DEFAULT_LOGIN_USER_NAME = '系统管理员'

/**
 * @description 系统模块主路径
 */
window.MAIN_ROUTE = 'modulesMain'

/**
 * @description 系统store -> key 配置
 */
window.STORE_STATE = 'STORE_STATE'

/**
 * @description axios请求模式配置，多种配置选项，自行查看 axios提供的请求模式（API_TYPE.enum）。默认为ALL
 */
// window.API_TYPE = API_TYPE.enum.MODULE_LIST.label
window.API_TYPE = API_TYPE.enum.ALL.label

/**
 * @description 装备实力计划的最大层级
 */
window.PLAN_LEVEL_MAX = 3

/**
 * @description 系统参数设定 - config配置
 * @author PP
 */
window.config = {
  devUrl: 'http://localhost:8881/', // 非正式环境访问路径（包含MOCK）
  proUrl: 'http://192.168.150.42:8880/', // 正式部署环境域名（http）地址
  imgShowUrl: 'http://192.168.150.42:8081/static/', // 图片查看地址
  // devUrl: 'http://localhost:8880/', // 非正式环境访问路径（包含MOCK）
  // proUrl: 'http://localhost:8880/', // 正式部署环境域名（http）地址
  generateURL: 'http://localhost:3000/', // 自动生成代码服务地址
  sysBaseUrl: '', // 系统基础API路径，不建议配置，存在http等指定链接设置，废弃参数
  // mockUrl: '/service', // mock
  mockUrl: 'http://localhost:3000/', // mock
  domain: '', // 域名
  version: '1.0.0(2019-10-18)', // 打包的系统的版本号(年-月-日-时分)
  useMock: process.env.NODE_ENV !== 'production', // 系统是否使用mock数据, 真实对接设置为 false
  // useMock: process.env.NODE_ENV !== 'production', // 系统是否使用mock数据, 真实对接设置为 false
}

/**
 * @description 系统整体的服务请求地址配置基础 api 接口，如果API中配置 http或者https 将不启用该选项配置
 *              生产环境使用正式地址
 *              非生产环境 使用 no mock数据
 */
window.config.baseUrl = process.env.NODE_ENV === 'production' ? window.config.proUrl : window.config.devUrl

// 非生产环境 -> 引入mock数据源配置 如果需要服务器前后台的真实对接可设置为 window.config.useMock -> false
process.env.NODE_ENV !== 'production' && window.config.useMock ? require('@/mock') : null

// CDN加速配置
window.config.CDN = `${window.config.domain}${window.config.version}`
