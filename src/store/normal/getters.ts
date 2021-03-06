/**
 * @description 集中化管理 vuex 的 getters
 */
import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  // 综合对象集合处理
  storeGetter(state) {
    const { example } = state
    return {
      example,
    }
  },
  example: (state: any) => state.example, // 单独配置store 对象
}

export default getters
