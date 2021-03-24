/**
 * @description 系统全局性参数配置
 * @author PP
 */
import { API_TYPE, LS } from '@/enum/enum' // 导入枚举配置

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
window.SYS_NAME = 'TS-WEB管理系统'

/**
 * @description token
 * @param
 */
window.TOKEN = {
  _AUTH: 'TOKEN',
}

/**
 * @description 系统默认头像图片
 * @param
 */
window.DEFAULT_HEADER_IMG = 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'

/**
 * @description 默认登录用户名称
 */
window.DEFAULT_LOGIN_USER_NAME = '默认管理员'

/**
 * @description 系统侧滑弹窗编辑框
 */
window.DRAWER_WINDOWS_WIDTH = '45%'

/**
 * @description 系统侧滑弹窗编辑框(全屏)
 */
window.DRAWER_FULL_WINDOWS_WIDTH = 'calc(100% - 245px)'

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
window.API_TYPE = API_TYPE.enum.ALL.label

/**
 * @description 系统参数设定 - config配置
 * @author PP
 */
window.config = {
  devUrl: 'http://localhost:8881/', // 非正式环境访问路径（包含MOCK）
  proUrl: 'http://192.168.150.42:8880/', // 正式部署环境域名（http）地址
  fileUrl: 'http://192.168.150.42:8081/static/', // 图片查看地址
  generateUrl: 'http://localhost:3000/', // 自动生成代码服务地址
  mockUrl: '/service', // mock地址
}

/**
 * @description 系统整体的服务请求地址配置基础 api 接口，如果API中配置 http或者https 将不启用该选项配置
 *              生产环境使用正式地址
 *              非生产环境 使用 no mock数据
 */
window.config.baseUrl = process.env.NODE_ENV === 'production' ? window.config.proUrl : window.config.devUrl
