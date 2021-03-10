/**
 * @description csdn 加速网络服务器地址
 */
const CSDN_BASE_LINK =
  process.env.NODE_ENV === 'production' ? 'http://39.107.96.13:8082/cdn' : 'http://39.107.96.13:8082/cdn'

module.exports = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    axios: 'axios',
    moment: 'moment',
    echarts: 'echarts',
    wangeditor: 'wangeditor',
    'vue-router': 'VueRouter',
    'ant-design-vue': 'antd',
    'v-charts': 'VeIndex',
    // 'v-charts': 'VCharts',
    // 'v-charts': 'v-charts',
  },
  // cdn的css链接
  cssLink: [`${CSDN_BASE_LINK}/antd.min.css`, `${CSDN_BASE_LINK}/wangEditor.min.css`],
  // cdn的js链接
  js: [
    'https://cdn.bootcdn.net/ajax/libs/antv-g2/4.1.0-beta.14/g2.min.js',
    `${CSDN_BASE_LINK}/echarts.min.js`,
    `${CSDN_BASE_LINK}/vue.min.js`,
    `${CSDN_BASE_LINK}/vue-router.min.js`,
    `${CSDN_BASE_LINK}/axios.min.js`,
    `${CSDN_BASE_LINK}/wangEditor.min.js`,
    `${CSDN_BASE_LINK}/moment.min.js`,
    `${CSDN_BASE_LINK}/locale/zh-cn.js`,
    `${CSDN_BASE_LINK}/antd.min.js`,
    `${CSDN_BASE_LINK}/v-charts.js`,
  ],
}
