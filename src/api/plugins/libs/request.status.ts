import router from '@/router'
import Cookies from 'js-cookie'
import { hookMessage } from '@/hooks/antd/hookMessage'

/**
 * @description 处理request 请求的 状态提醒
 * @param status
 * @param code
 * @param msg
 */
const { Message } = hookMessage()
export function checkRequestStatus(code: number = 200, msg: string | null, status: number = 200): void {
  // 弹出提示信息前，先删除上一个提示信息
  Message.destroy()

  switch (code) {
    // 权限不足
    case 401:
      Message.error(`${msg || '访问权限错误'}`)
      setTimeout(() => {
        Cookies.remove('token') // to-do需改成清除缓存的所有资源
        router.replace({ name: 'login' })
      }, 500)
      break
    // 请求错误异常，请求无效
    case 400:
      Message.error(`${msg || '该请求无效'}`)
      break
    // 请求被禁止
    case 403:
      Message.error(`${msg || '请求已被禁止'}`)
      break
    // 请求路径错误，无文件
    case 404:
      Message.error(`${msg || '请求异常, 无法找到文件资源'}`)
      break
    // 资源禁用
    case 405:
      Message.error(`${msg || '请求异常, 资源已禁用'}`)
      break
    // 请求超时
    case 408:
      Message.error(`${msg || '请求已超时'}`)
      break
    // 内部错误无法解析
    case 500:
      Message.error(`${msg || '请求异常, 内部错误无法解析'}`)
      break
    // 网关代理异常
    case 502:
      Message.error(`${msg || '请求异常, 网关代理异常'}`)
      break
    // 访问服务不存在资源
    case 503:
      Message.error(`${msg || '请求异常, 不存在资源'}`)
      break
    // 网关处理异常
    case 504:
      Message.error(`${msg || '请求异常, 网关处理异常'}`)
      break
    // http拒绝
    case 505:
      Message.error(`${msg || '请求异常, 链接不安全拒绝访问'}`)
      break
    // 代理模式开启
    case 305:
      Message.error(`${msg || '请求异常, 代理模式已开启'}`)
      break
    default:
  }
}
