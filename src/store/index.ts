import type { App } from 'vue'
import { createStore, createLogger, Plugin } from 'vuex'
import { config } from 'vuex-module-decorators'

import { isDevMode } from '@/utils/tools/env'

// 默认在所有@Action装饰器上将rawError设置为true
config.rawError = true

// 创建 store
const store = createStore({
  // modules: {},
  strict: isDevMode(), // 严格模式
  plugins: isDevMode() ? [createLogger()] : [], // 插件集合 Log日志
})

export default store // 对外抛出 store 对象

// vue 捆绑设置 store
export function setupStore(app: App<Element>) {
  app.use(store)
}
