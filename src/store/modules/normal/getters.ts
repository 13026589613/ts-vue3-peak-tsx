import { GetterTree } from 'vuex'

// export default {
//   showSpin: (state: any) => state.base.showSpin,
//   menuList: (state: any) => state.base.menuList,
// }

const getters: GetterTree<any, any> = {
  // 返回 state 集合
  storeGetter(state) {
    const { exampleStore } = state
    return {
      exampleStore,
    }
  },
  exampleStore: (state: any) => state.exampleStore,
}

export default getters
