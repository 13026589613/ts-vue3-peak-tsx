import type { App } from 'vue'

declare global {
  declare interface Window {
    // Global vue app instance
    __APP__: App<Element>
    __VERSION__: string
    ConstData: any // 常量数据集合，对象格式，内容不限。不使用全拼大些以做区分

    MAIN_ROUTE: string // 系统主路径
    FIXED_HEADER: boolean // 固定头部栏目
    FIXED_SIDE: boolean // 固定左侧菜单
    SHOW_BREAD_CRUMB: boolean // 界面页签
    SHOW_TOP_BREAD_CRUMB: boolean // 头部显示界面页签
    SHOW_TAG_TABS: boolean // 导航页签
    SHOW_TAG_TABS_POSITION: string | 'top' | 'content' // 导航页签显示位置 top -> 头部 content -> 内容区域
    SHOW_FOOTER_LAYOUT: boolean // 底部布局
    SYS_NAME: string // 系统名称配置
    TOKEN: {
      _AUTH: string
    }

    SIGNAL_MESSAGE_INFO: any // 系统非表格默认response 参数处理
    TABLE_BASE_RESPONSE_PARAMS: any // 系统表格默认response 参数处理

    STORE_STATE: any

    /**
     * @description axios 请求方式配置
     * 共4种格式（方式方法） ->  `modulesList（default模式）` `list`  `normal` `all`
     *
     * @param `list` 请求格式 this.$ModuleApis.`${action}`
     * @param `modulesList` 请求格式 this.$ModuleApis.`${moduleName}`.`${action}`
     * @param `default` 请求格式 import { action } from 'api-module'
     * @param `all` 统一风格, 不推荐全开
     */
    API_TYPE: string

    // 系统侧滑弹窗配置
    DRAWER_WINDOWS_WIDTH: string | number | null

    // 系统侧滑弹窗配置（全屏）
    DRAWER_FULL_WINDOWS_WIDTH: string | number | null

    DRAWER_WINDOWS_HALF_WIDTH: string | number | null

    // 请求通行code编码
    CROSS_CODE: number

    // API对象
    API_LIST: any
    API_MODULES: any

    // 系统默认头像
    DEFAULT_HEADER_IMG: string

    // 系统默认登陆用户名称
    DEFAULT_LOGIN_USER_NAME: string

    // 系统参数控制
    config: {
      proUrl?: string
      devUrl?: string
      fileUrl?: string
      baseUrl?: string
      generateUrl?: string
      domain?: string
      version?: string
      CDN?: string
      useMock?: boolean
      sysBaseUrl?: string
      mockUrl?: string
    }

    api: {
      [key: string]: (
        data: any
      ) => Promise<{
        success: boolean
        message: string
        statusCode: number
        data: any
      }>
    }

    ajax: any
    ApexCharts: any
    BMap: any
    BMapLib: any
    wangEditor: any
    CanvasLayer: any
    pointCollection: any
    File: any

    // 装备实力计划的最大层级
    PLAN_LEVEL_MAX: number
  }
}
