/**
 * @description 字典-基本代码档 MOCK
 * @author PP
 */
const Mock = require('mockjs2')
const { getQueryParameters, getBody, builder } = require('../utils')

/**
 * @description list mock 样例
 * @params 检索条件 查询参数
 */
const userLogin = params => {
  const queryParams = params.type === 'POST' ? getBody(params) : getQueryParameters(params)
  const { username, password, verifyCode, verifyId, client, uuid } = queryParams // 查询参数位置

  if (username === 'admin' && password === 'admin') {
    return builder(
      {
        userInfo: {
          username: 'admin',
          nickName: '系统管理员',
          token: new Date(),
        },
      },
      '登录成功',
      200
    )
  }
  return builder(queryParams, '用户名或者密码错误', 201)
}

Mock.mock(/\/service\/userLogin/, 'post', userLogin)
export default Mock
