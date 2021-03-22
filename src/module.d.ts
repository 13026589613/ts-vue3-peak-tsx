declare const BMap: any
declare const antd: any
declare module 'ant-design-vue/es/locale/*' {
  import { Locale } from 'ant-design-vue/es/locale-provider'
  const locale: Locale & ReadonlyRecordable
  export default locale
}

declare module 'moment/locale/*' {
  import { LocaleSpecification } from 'moment'
  const locale: LocaleSpecification & ReadonlyRecordable
  export default locale
}

declare module '@types/node'
declare module 'fastclick'

declare module 'vuex-class'

declare module 'vue-savedata'
declare module 'js-md5'
declare module 'js-cookie'

declare module '@ant-design-vue/pro-layout'

// declare module '@antv/g2plot'
// declare module 'insert-css'
// declare module 'electron'
// declare module 'vue-cli-plugin-electron-builder/lib'
// declare module 'vue-lazyload'
// declare module 'vue-icon-font-pro'
// declare module 'vue-event-calendar-pro'
// declare module '@xunlei/vue-lazy-component'
// declare module 'vue-skeleton-loading'
// declare module '*.json'
// declare module 'wangeditor'
// declare module 'image-conversion'
// declare module 'ant-design-vue'
// declare module 'ant-design-vue/lib/locale-provider/zh_CN'
// declare module 'echarts' // 图表
// declare module 'v-charts' // 图表
// declare module 'vue-seamless-scroll' // 无缝滚动
// declare module 'v-charts/lib/line' // v-chart 折线图
// declare module 'v-charts/lib/bar' // v-char 条状图
// declare module 'v-charts/lib/histogram' // v-chart 柱状图
// declare module 'v-charts/lib/pie' // v-charts 饼图
// declare module 'v-charts/lib/ring' // v-charts 环图
// declare module 'v-charts/lib/funnel' // v-charts 漏斗图
// declare module 'v-charts/lib/waterfall' // v-charts 瀑布图
// declare module 'v-charts/lib/radar' // v-charts 雷达图
// declare module 'v-charts/lib/gauge' // v-charts 仪表盘
