/**
 * @description 本文件是 自动 import 所有注解式的store 文件。
 *              PS：推荐在使用时 按需 import 相应的modules 模块。 如：import baseStore from '@/store/modules/base'
 *              采用注入式，store 会自动检测并填充 state、modules、getters。注入后可采用 对象化调用或者vue-class 注入式获取值
 * @author PP
 */
require
  .context('./', true, /.ts$/)
  .keys()
  .forEach(fileName => {
    if (fileName.indexOf('index') === -1) {
      import(`${fileName}`)
    }
  })
