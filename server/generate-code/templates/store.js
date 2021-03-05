// vuex 模版
exports.template = tableEntity => `/**
 * @description ${tableEntity.upperTableName} -> store 操作
 * @author PP
 */
import { BASE } from '@/store/mutations'
import { ${tableEntity.upperTableName}Store, ${tableEntity.upperTableName}State } from '@/interface/${tableEntity.tableName}.interface'

const ${tableEntity.lowerTableName}: ${tableEntity.upperTableName}Store = {
  state: {
    data: {}
  },
  actions: {
    /**
     * @description 测试用
     * @param commit state data
     */
    ExampleActionTest: ({ commit, state }, data: ${tableEntity.upperTableName}State) => new Promise((resolve, reject) => {
      commit(BASE.ACCESS_TOKEN, data)
      const { token } = state.data
      if (token) {
        resolve(token)
      } else {
        reject()
      }
    }),

    /**
     * @description 测试用
     * @param commit state data
     */
    ExampleAction: (context: any, data: ${tableEntity.upperTableName}State) => new Promise((resolve, reject) => {
        context.store.dispatch('ExampleActionTest', data)
      }),
  },
  mutations: {
    // BASE.ACCESS_TOKEN 为测试使用
    [BASE.ACCESS_TOKEN]: (state: ${tableEntity.upperTableName}State, data: ${tableEntity.upperTableName}State) => {
      for (const key in data.data) {
        if (Object.prototype.hasOwnProperty.call(data.data, key)) {
          state.data[key] = data.data[key]
        }
      }
    },
  },
}

export default ${tableEntity.lowerTableName}
`
