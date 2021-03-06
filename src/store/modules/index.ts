/**
 * @description 本文件是 自动 import 所有注解式的store 文件。
 *              PS：推荐在使用时 按需 import 相应的modules 模块。 如：import baseStore from '@/store/modules/base'
 *              采用注入式，store 会自动检测并填充 state、modules、getters。注入后可采用 对象化调用或者vue-class 注入式获取值
 * @author PP
 */
const toHumpClassName = (string: string, formatter: string = '_'): string => {
  const stringArray = string.split(formatter).filter(str => str && str.trim())
  stringArray.map((item, index) => {
    if (index > 0) {
      stringArray[index] = item.substring(0, 1).toUpperCase() + item.substring(1)
    }
  })
  return stringArray.join('')
}

const storeModules: any = {}
const files = require.context('./', true, /.ts$/).keys()
files.forEach(fileName => {
  if (fileName.indexOf('index') === -1) {
    const storeName: string = toHumpClassName(
      fileName.replace('.', '').replace('/', '').replace('ts', '').replace('.', ''),
      '-'
    )

    import(`${fileName}`)
  }
})

// const path = require('path')
// const requireModules = require.context('./normal', true, /index\.(ts|js)$/iu)
// console.log(requireModules.keys())

// const modules: any = {}
// requireModules.keys().forEach((filePath: string): void => {
//   const modular = requireModules(filePath)

//   let name = path.resolve(filePath, '..')
//   name = name.split('/').pop()
//   modules[name] = {
//     namespaced: true,
//     ...modular.default,
//   }
// })

// console.log(modules)
