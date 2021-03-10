import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const path = require('path')

/**
 * @description 自动装载components 组件，加载index文件
 */
export default {
  install: function (app: any) {
    // 获取组件文件
    const componentsArray = require.context('./', true, /index\.(vue|js)$/iu)

    // 遍历装配组件
    componentsArray.keys().forEach((filePath: string): void => {
      // 获取组件内容
      const component = componentsArray(filePath)

      // 处理组件名称
      let comName = path.resolve(filePath, '..')
      comName = upperFirst(
        camelCase(
          comName
            .split('/')
            .pop()
            .replace(/\.\w+$/u, '')
        )
      )

      // App-vue 注册组件
      app.component(comName, component.default || component)
    })
  },
}
