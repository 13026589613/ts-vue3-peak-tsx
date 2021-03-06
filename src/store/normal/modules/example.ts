import { EXAMPLE } from '@/store/normal/mutations'

/**
 * @description 常规 常规 Store 模块 样例
 *              PS：建议在上一层的 getters.ts 集中化管理值获取
 */
const exampleStore: any = {
  namespaced: true,
  state: {
    storeExamData: true, // 遮罩控制
    testGetterData: 'getterData',
  },
  actions: {
    /**
     * @description 切换样例值
     * @param context {commit}:any
     * @param status
     */
    ActionStoreExamData(context: any, value: boolean): void {
      context.commit(EXAMPLE.INIT_EXAM_DATA, value)
    },
  },
  mutations: {
    [EXAMPLE.INIT_EXAM_DATA]: (state: any, value: boolean) => {
      state.storeExamData = value
    },
  },

  getters: {
    getStoreExamData: (state: any): number => state.storeExamData,
    getTestGetterData: (state: any): number => state.testGetterData,
  },
}

export default exampleStore
