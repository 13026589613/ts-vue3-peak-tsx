import { App } from 'vue'
import Api from '@/api/plugins/index' // 导入 axios api
import { API_TYPE } from '@/enum/enum' // 导入枚举配置

/**
 * @description 构造 axios - api 对象
 * @param app
 */
export function initApi(app: App) {
  const API_ALL_TYPE = API_TYPE.enum.ALL.label
  const axiosAPI = new Api() // 注册axios控制器

  /**
   * @description 注册 this.$api
   */
  if (API_ALL_TYPE === process.env.VUE_APP_API_TYPE || API_TYPE.enum.NORMAL.label === process.env.VUE_APP_API_TYPE) {
    app.config.globalProperties.$Api = axiosAPI
  }

  /**
   * @description 全局注册api
   * 启用需要预先配置url、method、header等options参数，调用只传递data
   */
  if (API_ALL_TYPE === process.env.VUE_APP_API_TYPE || API_TYPE.enum.LIST.label === process.env.VUE_APP_API_TYPE) {
    axiosAPI.initApis()
    app.config.globalProperties.$Apis = axiosAPI.apis
    window.API_LIST = axiosAPI.apis
  }

  /**
   * @description 全局注册 modules api
   * 启用需要预先配置url、method、header等options参数，调用只传递data
   */
  if (
    API_ALL_TYPE === process.env.VUE_APP_API_TYPE ||
    API_TYPE.enum.MODULE_LIST.label === process.env.VUE_APP_API_TYPE
  ) {
    axiosAPI.initModuleApis()
    app.config.globalProperties.$ModuleApis = axiosAPI.moduleApis
    window.API_MODULES = axiosAPI.moduleApis
  }

  axiosAPI.initModuleApis()
  app.config.globalProperties.$ModuleApis = axiosAPI.moduleApis
  window.API_MODULES = axiosAPI.moduleApis
}

/**
 * @description 全局注册属性
 */
declare module '*.vue' {
  interface Vue {
    $Api: any
    $Apis: any
    $ModuleApis: any
  }
}
