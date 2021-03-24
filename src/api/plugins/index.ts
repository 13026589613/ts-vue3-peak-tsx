import qs from 'qs'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { AxiosClass } from './axios' // 导入axios对象
import APIS from '@/api/modules'
import { ContentType } from '@/api/plugins/libs/request.type' // 枚举常量

export default class Api {
  // 对外 api 接口函数
  apis: Apis<any> = {}

  // 对象模块化 api 接口函数
  moduleApis: ModuleApis<any> = {}

  // 系统接口清单
  apiList: ApiList = APIS.listAPI

  // 系统模块化接口清单
  apiModulesList: ModulesApiList = APIS.modulesAPI

  // fetch对象
  service: any

  // 全局性 token
  token?: string = window.localStorage.getItem(window.TOKEN._AUTH) || ''

  // 构造器 options: Options
  constructor() {
    this.service = new AxiosClass({
      timeout: 1000 * 30,
      withCredentials: true,
      headers: {
        'Content-Type': ContentType.JSON_TYPE,
      },
    }).getRequest()
  }

  /**
   * @description 注册全局 apis 直接调用 API Methods
   * @author PP
   */
  initApis = () => {
    for (const i in this.apiList) {
      this.apis[i] = (data: any) => this.fetch(merge(data, this.apiList[i]))
    }
  }

  /**
   * @description 注册全局 apis 调用 API Modules对象，然后调用 Methods
   * @author PP
   */
  initModuleApis = () => {
    for (const i in this.apiModulesList) {
      this.moduleApis[i] = {}
      const moduleApi: ApiList = this.apiModulesList[i]
      for (const j in moduleApi) {
        this.moduleApis[i][j] = (data: any) => this.fetch(Object.assign(moduleApi[j], data))
      }
    }
  }

  /**
   * @description 拼装请求执行响应方法
   * @author PP
   */
  fetch = (options: Options) => {
    const { method = 'get' } = options
    switch (method.toLowerCase()) {
      case 'get':
        return this._get(options)
      case 'delete':
        return this._delete(options)
      case 'post':
        return this._post(options)
      case 'put':
        return this._put(options)
      case 'patch':
        return this._patch(options)
      default:
        return this._request(options)
    }
  }

  /**
   * 请求地址处理
   * @param {*} actionURL action方法名称
   */
  mergeUrl = (actionURL: string, baseUrl: string = '') => {
    if (actionURL.indexOf('http') !== -1) return actionURL

    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (
      (process.env.NODE_ENV !== 'production' && typeof process.env.OPEN_PROXY !== 'undefined' && process.env.OPEN_PROXY
        ? '/proxyApi/'
        : baseUrl) + actionURL

      //  || window.config.baseUrl
    )
  }

  /**
   * get请求参数处理
   * @param {*} data 参数对象
   * @param {*} openDefaultParams 是否开启默认参数?
   * @param {*} contentType 请求参数格式
   * @param {*} listParams 是否具备分页标示？
   */
  mergeData = (
    data: object = {},
    openDefaultParams: boolean = true,
    contentType: string = 'json',
    listParams: boolean = false
  ) => {
    const defaults = {
      t: new Date().getTime(),
    }

    // 重组参数
    let cloneData: any = cloneDeep(data)

    // 查询列表进行分页参数拼接
    if (listParams) {
      cloneData = merge(cloneData, {
        current: cloneData.pageNum || null, // 当前页码
        limit: cloneData.pageSize || null, // 显示数量，分页数量
        currentPage: cloneData.pageNum || null, // 当前页码
        showCount: cloneData.pageSize || null, // 显示数量，分页数量
        orderKey: cloneData.orderKey || null, // 字段名称
        orderType: cloneData.orderType || null, // 排序方式
        orderNumber: cloneData.orderNumber || null, // 序号
      })
    } else {
      delete cloneData.showCount
      delete cloneData.currentPage
      delete cloneData.orderKey
      delete cloneData.orderType
      delete cloneData.orderNumber
    }

    cloneData = openDefaultParams ? merge(defaults, cloneData) : cloneData

    // qs => module=value&module=value --- JSON => '{"module": value}'
    cloneData = contentType === 'json' ? JSON.stringify(cloneData) : qs.stringify(cloneData)
    return cloneData
  }

  /**
   * 发起 get 请求
   * @param {*} options 请求参数
   */
  _get = (options: Options) => {
    if (options.contentType === 'json') {
      return this._request(options)
    }
    const { url = '', data, headers } = options
    const params = this.mergeData(data, options.openDefaultParams, options.contentType, options.listParams)
    const requestURL = this.mergeUrl(url, options.baseUrl)

    return this.service.get(`${requestURL}?${params}`, { headers })
  }

  /**
   * 发起 post 请求
   * @param {*} options 请求参数
   */
  _post = (options: Options) => {
    const { url = '', data, headers } = options
    const requestURL = this.mergeUrl(url, options.baseUrl)
    const params = this.mergeData(data, options.openDefaultParams, options.contentType, options.listParams)

    return this.service.post(requestURL, params, { headers })
  }

  /**
   * 发起 multidata post 请求，当前用于上传图片文件
   * @param {*} options 请求参数
   */
  _postMultiData = (options: Options) => {
    const { url = '', data, headers } = options
    const requestURL = this.mergeUrl(url, options.baseUrl)

    return this.service.post(requestURL, data, { headers })
  }

  /**
   * 发起 request 请求
   * @param {*} options 请求参数
   */
  _request = (options: Options) => {
    const { url = '', data, headers } = options
    options.url = this.mergeUrl(url, options.baseUrl)

    options.data = this.mergeData(
      data,
      options.openDefaultParams,
      options.contentType,
      options.data ? options.data.page : {}
    )
    if (options.method === 'get') {
      options.params = JSON.parse(options.data)
    }

    return this.service.request(options, { headers })
  }

  /**
   * 发起 put 请求
   * @param {*} options 请求参数
   */
  _put = (options: Options) => {
    const { url = '', data, headers } = options
    const requestURL = this.mergeUrl(url, options.baseUrl)
    const params = this.mergeData(data, options.openDefaultParams, options.contentType)

    return this.service.put(requestURL, params, { headers })
  }

  /**
   * 发起 delete 请求
   * @param {*} options 请求参数
   */
  _delete = (options: Options) => {
    const { url = '', data, headers } = options
    const requestURL = this.mergeUrl(url, options.baseUrl)
    const params = this.mergeData(data, options.openDefaultParams)

    return this.service.delete(`${requestURL}?${params}`, { headers })
  }

  /**
   * 发起 patch 请求
   * @param {*} options 请求参数
   */
  _patch = (options: Options) => {
    const { url = '', data, headers } = options
    const requestURL = this.mergeUrl(url, options.baseUrl)
    const params = this.mergeData(data, options.openDefaultParams, options.contentType)

    return this.service.patch(requestURL, params, { headers })
  }
}
