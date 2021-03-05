/**
 * @description axios请求列表
 * @author PP
 */
import axios, { AxiosPromise, AxiosInstance } from 'axios'
// import { clearLoginInfo } from '@/utils'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
import Cookies from 'js-cookie'
import './axios-interface'

// 默认头部 application/x-www-form-urlencoded multipart/form-data
const defaultAccept = 'application/json; charset=utf-8'
const axiosAPI: AxiosInstance = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': defaultAccept,
  },
})

/**
 * 请求拦截
 */
axiosAPI.interceptors.request.use(
  config => {
    // config.headers = config.headers || { Accept: defaultAccept, 'Content-Type': 'application/x-www-form-urlencoded' }
    config.headers = config.headers || { Accept: defaultAccept, 'Content-Type': 'application/json' }

    // 请求头带上token
    // const token = window.localStorage.getItem('token') || null
    const token = Cookies.get('token') || null
    if (token) {
      config.headers.token = token
      config.headers['x-access-token'] = token
    }
    // config.headers['J-SESSION-ID'] = token // 请求头带上 session
    return config
  },
  error => Promise.reject(error)
)

/**
 * 响应拦截
 */
axiosAPI.interceptors.response.use(
  response => {
    const responseData = merge(cloneDeep(response.data), {
      status: true,
    })
    const { msg, code, result } = responseData

    // 弹出提示信息前，先删除上一个提示信息
    antd.message.destroy()

    // 401, token失效||用户session超时
    if (responseData && code === 401) {
      // clearLoginInfo()
      // antd.message.error('未登录 / 登录失效，请重新登录系统')
      // setTimeout(() => {
      //   Cookies.remove('token')
      //   router.replace({ name: 'login' })
      // }, 500)
      if (result == 'Unauthorized') {
        antd.message.error(msg)
        setTimeout(() => {
          Cookies.remove('token')
          router.replace({ name: 'login' })
        }, 500)
      } else if (result == 'UnauthorizedData') {
        antd.message.error('当前用户权限不足')
      }
    } else if (code === 404) {
      antd.message.error(msg || '请求页面不存在')
    } else if (code === 500) {
      antd.message.error(msg || '服务器异常, 请联系系统管理员')
    } else if (code === 405) {
      antd.message.error(msg || '服务请求异常, 请联系系统管理员')
    } else if (code === 408) {
      antd.message.error(msg || '请求超时')
    }

    return responseData
  },
  error => {
    const errorData = merge(cloneDeep(error.response.data), {
      status: true,
    })
    const { message } = errorData
    // 弹出提示信息前，先删除上一个提示信息
    antd.message.destroy()
    if (errorData && message === 'java.net.SocketTimeoutException: Read timed out') {
      antd.message.error('服务连接失败, 请求超时')
    } else if (message === 'Could not get a resource from the pool') {
      antd.message.error('未能连接到数据库, 请联系系统管理员')
    } else {
      antd.message.error('服务请求失败, 内部系统异常')
    }
    return Promise.reject(error)
  }
)
export default axiosAPI
