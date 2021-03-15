/**
 * @description axios请求列表
 * @author PP
 */
import axios, { AxiosPromise, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import Cookies from 'js-cookie'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

import { ContentType } from '@/api/plugins/libs/request.type' // 枚举常量
import { checkRequestStatus } from '@/api/plugins/libs/request.status'

/**
 * @description 构造 axios class 操作类
 */
export class AxiosClass {
  private axiosInstance: AxiosInstance // Axios主对象
  private readonly axiosOptions: AxiosInstance // 配置对象

  constructor(configOptions: any) {
    this.axiosOptions = configOptions // 配置类主对象，接收并配置请求服务的参数
    this.axiosInstance = this.createRequest(this.axiosOptions) // 初始化装载axios，构造请求类操作核心主对象
    this.initAxiosConfig() // 配置 axios 拦截处理
  }

  /**
   * @description 配置 axios 参数拦截处理服务请求
   */
  initAxiosConfig() {
    this.initRequestInterceptors()
    this.initResponseInterceptors()
    this.initResponseErrorInterceptors()
  }

  /**
   * @description Request 请求前 服务拦截处理
   */
  initRequestInterceptors() {
    // 处理多次重复点击请求
    // CancelToken
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers = config.headers || { Accept: ContentType.JSON_TYPE, 'Content-Type': 'application/json' }

        // 请求头带上token
        const token = Cookies.get(window.TOKEN._AUTH) || null
        if (token) {
          config.headers.token = token
          config.headers['x-access-token'] = token
        }

        return config
      },
      error => Promise.reject(error)
    )
  }

  /**
   * @description Response 反馈结果 服务拦截处理
   * @returns AxiosResponse<any>
   */
  initResponseInterceptors() {
    this.axiosInstance.interceptors.response.use((response: any) => {
      // 统一格式化 -- 同构转化后台反馈的Map-key规则。集中化管理 response 内容
      const responseData = merge(cloneDeep(response.data), {
        status: true,
      })

      const { code, message } = responseData

      // 处理异常错误码，提醒错误信息
      checkRequestStatus(code, message)

      return { data: responseData.result, message: responseData.message, success: responseData.status } as any
    }, undefined)
  }

  /**
   * @description Response 发生错误信息时 服务拦截处理
   */
  initResponseErrorInterceptors() {
    this.axiosInstance.interceptors.response.use(undefined, error => {
      const errorData = merge(cloneDeep(error?.response?.data), {
        status: false,
      })
      const { code, message } = errorData

      // 处理异常错误码，提醒错误信息
      checkRequestStatus(code, message)
      return Promise.reject(error)
    })
  }

  /**
   * @description 对外引用加载axios对象
   */
  getRequest() {
    return this.axiosInstance
  }

  /**
   * @description 对外引用加载axios对象
   */
  createRequest(
    config: any = {
      timeout: 1000 * 30,
      withCredentials: true,
      headers: {
        'Content-Type': ContentType.JSON_TYPE,
      },
    }
  ) {
    this.axiosInstance = axios.create(config)
    return this.axiosInstance
  }

  /**
   * @description: 重新配置axios
   */
  reloadInitAxios(config: any) {
    if (!this.axiosInstance) {
      return
    }

    this.createRequest(config)
  }
}
