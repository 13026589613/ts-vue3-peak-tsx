import { useMock } from '@/utils/tools/env'
/**
 * @description 基础功能 - 接口API
 */
const API_CONTRACT_URL = {
  BASE: useMock() ? '/service' : '', // RESTFUL 风格基础路径
  MODUlES_NAME: '',
}

export default {
  /**
   * @description 样例 - 获取列表集合数据
   * @param filterParams -> 表单、表头、隐藏携带参数
   * @param pageParams
   * @param sortParams
   * @param editParams
   */
  initExampleList: {
    url: `${API_CONTRACT_URL.BASE}${API_CONTRACT_URL.MODUlES_NAME}/initExampleList`,
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // contentType: 'qs',
  },
}
