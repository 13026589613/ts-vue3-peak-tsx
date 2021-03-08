import merge from 'lodash/merge'
import { API_TYPE } from '@/enum/enum' // 导入枚举配置
const files = require.context('./', true, /.ts$/).keys()

// 枚举值与当前axios模式
const ApiAllType = API_TYPE.enum.ALL.label
const ApiType = process.env.VUE_APP_API_TYPE

const testREX = /\.{1}[a-z]{1,}$/ // rex

const modulesAPI: any = {} // 模块化对象
const listAPI: any = {} // list对象
const APIS: any = {
  modulesAPI: {},
  listAPI: {},
} // export object

// LIST模式
if (API_TYPE.enum.LIST.label === ApiType || ApiAllType === ApiType) {
  // 处理LIST模式
  files.forEach(fileName => {
    if (fileName.indexOf('index') === -1) {
      merge(listAPI, require(`${fileName}`).default)
    }
  })

  APIS.modulesAPI = {}
  APIS.listAPI = listAPI
}

// 模块化模式
if (API_TYPE.enum.MODULE_LIST.label === ApiType || ApiAllType === ApiType) {
  files.forEach(fileName => {
    if (fileName.indexOf('index') === -1) {
      const moduleName = fileName.replace(testREX, '').split('-')[1]
      modulesAPI[moduleName] = require(`${fileName}`).default
    }
  })
  APIS.modulesAPI = modulesAPI
  APIS.listAPI = {}
}

// 全开模式
if (ApiAllType === ApiType) {
  APIS.modulesAPI = modulesAPI
  APIS.listAPI = listAPI
}

export default APIS
