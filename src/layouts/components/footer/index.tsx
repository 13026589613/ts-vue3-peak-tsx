/**
 * @description 页面布局 - footer 组件
 * @author PP
 */
import { Vue, Options } from 'vue-class-component'
import '@/assets/design/base/_common.scss'
import './index.scss'

export default class FooterWrapper extends Vue {
  /**
   * @description 渲染底部内容
   * @returns
   */
  render() {
    return (
      <a-layout-footer class='layout-footer'>
        <section class='text-left'>2021 @ PP 版权标识</section>
      </a-layout-footer>
    )
  }
}
