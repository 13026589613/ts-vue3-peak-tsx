import { BASE } from '@/store/normal/mutations'

/**
 * @description 常规 常规 Store 模块 样例
 *              PS：建议在上一层的 getters.ts 集中化管理值获取
 */
const exampleStore: any = {
  namespaced: true,
  state: {
    showSpin: true, // 遮罩控制
  },
  actions: {
    /**
     * @description 初始化存储登录用户信息
     * @param context
     * @param status
     */
    InitLoginUserInfo(context: any, userInfo: object) {
      context.commit(BASE.INIT_LOGIN_USER, userInfo)
    },
  },
  mutations: {
    [BASE.INIT_LOGIN_USER]: (state: any, userInfo: object) => {
      state.loginUser = userInfo
    },
  },

  getters: {
    showSpin: (state: any): number => state.showSpin,
  },
}

export default exampleStore
