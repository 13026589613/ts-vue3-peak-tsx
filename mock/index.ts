/**
 * @description 自动装载全部 mock模块
 *              同步加载依赖MOCK放置VUEX,使用MOCK数据方法先运行导致无MOCK请求结果
 * 只在生产环境下生效！！！！
 * @author PP
 */
import { isDev } from '../src/utils/tools/env' // 生产模式
if (isDev()) {
  const files = require.context('./', true, /.ts$/).keys()
  files.forEach(fileName => {
    if (fileName.indexOf('/service/') !== -1) {
      require(`${fileName}`)
    }
  })
}
