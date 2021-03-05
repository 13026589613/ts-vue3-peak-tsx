import Vue from 'vue'
import Cookies from 'js-cookie'
import FastClick from 'fastclick'
import moment from 'moment' // 时间格式化插件，本包有点大，建议自行构建工具包
moment.locale('zh-cn')

import toolsUtil from '@/util/ToolsUtil' // 装载公用工具包插件
import { LS } from '@/config/plugins/enum'

import '@/config/plugins/antd-plugins' // 导入Ant组件配置
import '@/config/plugins/config' // 导入系统配置文件，注意顺序 axios 需要 config 配置，防止后面
import '@/config/plugins/axios' // 导入 axios 配置

import 'lib-flexible/flexible.js' // 启动 px 转化， 设置rem基准值

import Viser from 'viser-vue'

/**
 * 引入公用样式
 */
// import 'ant-design-vue/dist/antd.less' // ant 插件基础样式
// import '@/assets/font/iconfont.css' // 引入 iconfont 样式
import '@/assets/scss/base/_index.scss' // 系统基础样式

Vue.use(Viser)

/**
 * 绑定全局性Vue实例化对象
 */
Vue.prototype.$Cookies = Cookies // cookie
Vue.prototype.$tools = toolsUtil // 自定义工具包
Vue.prototype.$LSKeys = LS.enum // 枚举类型
Vue.prototype.$moment = moment // 时间格式化工具
Vue.prototype.$Bus = new Vue()
/**
 * @description 手机端兼容毒瘤ios 300ms延迟问题
 *              只适用于手机端，如果项目为PC建议关闭减少报错
 */
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      ;(FastClick as any).attach(document.body)
    },
    false
  )
}

declare module 'vue/types/vue' {
  interface Vue {
    $Cookies: any
    $tools: any
    $LSKeys: any
    $moment: any
    $Bus: any
  }
}
