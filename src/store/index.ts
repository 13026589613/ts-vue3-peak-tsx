import type { App } from 'vue'
import { createStore, createLogger, Plugin } from 'vuex'
import { config } from 'vuex-module-decorators'

// 判断环境模式
import { isDevMode } from '@/utils/tools/env'

/**
 * @description 注入store - modules ，根据实际需要采用某一种合适的方式即可
 */
import normalModules from '@/store/normal/modules' // 普通模式 - 注入所有的normal常规模式的store
import getters from '@/store/normal/getters' // 普通模式 - 可以采用getters 的集中化管理注入
import '@/store/modules/index' // 注入式 store - import 引用全部store - modules 包源。也可以不按需引入，store会自动检测填充

// 默认在所有@Action装饰器上将rawError设置为true
config.rawError = true

// 创建 store
const store = createStore({
  getters, // 注入式store 无需配置
  modules: { ...normalModules }, // 注入式store 无需配置
  strict: isDevMode(), // 严格模式
  plugins: isDevMode() ? [createLogger()] : [], // 插件集合 Log日志
})

export default store // 对外抛出 store 对象

// vue 捆绑设置 store
export function setupStore(app: App<Element>) {
  app.use(store)
}
