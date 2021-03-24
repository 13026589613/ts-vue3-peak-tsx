/**
 * @description Ant 原生Dom操作对象
 */
import Antd, { Layout } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'

// 装载 antd-ui 组件
export function initAntVueDesign(app: any) {
  app.component('a-layout-side', Layout.Sider) // 处理 antd 菜单默认无法加载的问题
  app.use(Antd)
}

// Vue.$AntMessage = message
// Vue.prototype.$AntConfirm = Modal.confirm
// Vue.prototype.$AntNotify = notification
// Vue.prototype.$Antd = antd

// declare module '*.vue' {
//   interface Vue {
//     $Antd: any
//     $AntMessage: any
//     $AntConfirm: any

//     $AntNotify: any
//     Form: any
//   }
// }
