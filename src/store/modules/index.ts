/**
 * @description 获取modules 文件提供给store。无需填写，moudles下文件自动加载
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
    storeModules[storeName] = require(`${fileName}`).default
  }
})
export default { ...storeModules }
