import Vue from 'vue'
import Api from '@/api/axios-request' // 导入 axios api
import { API_TYPE } from '@/config/plugins/enum' // 导入枚举配置

const API_ALL_TYPE = API_TYPE.enum.ALL.label
const axiosAPI = new Api() // 注册axios控制器

/**
 * @description 注册 this.$api
 */
if (API_ALL_TYPE === window.API_TYPE || API_TYPE.enum.NORMAL.label === window.API_TYPE) {
  Vue.prototype.$Api = axiosAPI
}

/**
 * @description 全局注册api
 * 启用需要预先配置url、method、header等options参数，调用只传递data
 */
if (API_ALL_TYPE === window.API_TYPE || API_TYPE.enum.LIST.label === window.API_TYPE) {
  axiosAPI.initApis()
  Vue.prototype.$Apis = axiosAPI.apis
  window.API_LIST = axiosAPI.apis
}

/**
 * @description 全局注册 modules api
 * 启用需要预先配置url、method、header等options参数，调用只传递data
 */
if (API_ALL_TYPE === window.API_TYPE || API_TYPE.enum.MODULE_LIST.label === window.API_TYPE) {
  axiosAPI.initModuleApis()
  Vue.prototype.$ModuleApis = axiosAPI.moduleApis
  window.API_MODULES = axiosAPI.moduleApis
}

/**
 * @description 全局注册属性
 */
declare module 'vue/types/vue' {
  interface Vue {
    $Api: any
    $Apis: any
    $ModuleApis: any
  }
}
