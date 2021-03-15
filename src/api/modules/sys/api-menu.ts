import { useMock } from '@/utils/tools/env'
/**
 * @description 样例功能 - 接口API
 */
const API_BASE = {
  BASE: useMock() ? '/service' : '', // RESTFUL 风格基础路径
  MODUlES_NAME: '/menu',
}

export default {
  /**
   * @description 获取用户的菜单权限列表清单
   */
  userMenuNav: {
    url: `${API_BASE.BASE}${API_BASE.MODUlES_NAME}/nav`,
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // contentType: 'qs',
  },
}
