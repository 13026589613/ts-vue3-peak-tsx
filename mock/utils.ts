/**
 * @description MOCK请求公用方法类
 * @author PP
 */

// 默认请求返回体对象模板
const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  cookies: {},
  code: 0,
  _status: 0,
  _headers: null,
}

// 返回结果 -> 请求集合体
export const builder = (data, message, code = 0, headers = {}, cookies = {}) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  responseBody.cookies = cookies

  return responseBody
}

// 返回结果 -> 请求集合体。使用该方法可携带 cookie返回体
export const builderWithCookie = (data, message, code = 0, headers = {}) => {
  builder(data, message, code, headers, true)
  return responseBody
}

// get delete 等截取当前访问路径的请求参数 (qs -> string fy）
export const getQueryParameters = options => {
  const { url } = options
  const search = url.split('?')[1]

  if (!search) {
    return {}
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`)
}

// post put 等获取请求体body （json -> string fy）
export const getBody = options => options.body && JSON.parse(options.body)
