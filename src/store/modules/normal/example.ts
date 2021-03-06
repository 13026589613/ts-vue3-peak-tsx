import { BASE } from '@/store/modules/normal/mutations'

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
}

export default exampleStore
