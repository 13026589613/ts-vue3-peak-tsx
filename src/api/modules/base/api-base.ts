import { useMock } from '@/utils/tools/env'
/**
 * @description 样例功能 - 接口API
 */
const API_BASE = {
  BASE: useMock() ? '/service' : '', // RESTFUL 风格基础路径
  MODUlES_NAME: '',
}

export default {
  /**
   * @description 系统登录接口
   * @param username 账号
   * @param password 加密的密码
   * @param verifyCode 验证码
   * @param verifyId 服务随机码进行匹配认证
   * @param client 登录端
   * @param uuid 登录随机码用于加密
   */
  userLogin: {
    url: `${API_BASE.BASE}${API_BASE.MODUlES_NAME}/userLogin`,
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // contentType: 'qs',
  },
}
