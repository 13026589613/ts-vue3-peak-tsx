/**
 * @description 获取modules 文件提供给store。无需填写，moudles下文件自动加载
 *              本文件会自动获取modules 下的 store 配置文件，自动采用namespace命名空间。配合 vue-class 或者 vuex 获取store数据
 * 其他说明：
 *              常规模式的store
 *              采用注入store modules 的方式，getter 可以通过getters.ts 文件集中注入
 *              mutations 用于声明 commit 的 state 的传值事件声明，也可以在store中自定义声明
 * @author PP
 */
// 遍历循环文件，读取文件并require加载
const storeModules: any = {}
const files = require.context('./', true, /.ts$/).keys()
files.forEach(fileName => {
  if (fileName.indexOf('index') === -1) {
    const storeName: string = toHumpClassName(
      fileName.replace('.', '').replace('/', '').replace('ts', '').replace('.', ''),
      '-'
    )
    storeModules[storeName] = require(`${fileName}`).default
  }
})

export default { ...storeModules }

const toHumpClassName = (string: string, formatter: string = '_'): string => {
  const stringArray = string.split(formatter).filter(str => str && str.trim())
  stringArray.map((item, index) => {
    if (index > 0) {
      stringArray[index] = item.substring(0, 1).toUpperCase() + item.substring(1)
    }
  })
  return stringArray.join('')
}

// const path = require('path')
// const requireModules = require.context('./', true, /index\.(ts|js)$/iu)
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
