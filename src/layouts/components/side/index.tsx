/**
 * @description 页面布局 - 左侧菜单组件 PC端
 * @author PP
 */
import { Vue, Options } from 'vue-class-component'

import { mapActions, mapState, mapGetters } from 'vuex'
import Cookies from 'js-cookie'

import './index.scss'

@Options({
  name: 'SideWrapper',
  components: {},
})
export default class SideWrapper extends Vue {
  private defaultHeader: string = window.DEFAULT_HEADER_IMG
  private defaultName: string = window.DEFAULT_LOGIN_USER_NAME
  private openKeysCache: any = [] // 缓存打开的菜单数组，收缩状态控制菜单是否打开
  private openKeys: any = [] // 打开的菜单数组
  private selectedKeys: any = [] // 选中菜单数组

  mounted() {
    this.openKeysCache = [...this.defaultOpen] // 缓存打开的菜单数组，收缩状态控制菜单是否打开
    this.openKeys = [...this.defaultOpen] // 打开的菜单数组
    this.selectedKeys = [...this.defaultSelect] // 选中菜单数组
    this.renderMenuStatus()
  }

  /**
   * @description 渲染左侧的导航菜单
   */
  render() {
    return (
      <a-layout-side
        trigger={null}
        vModel={this.collapsed}
        collapsible={this.collapsed}
        class={['left-side', 'side', this.fixedSide ? 'fixed-side' : '']}
        width={`${this.sideWidth}px`}
      >
        <logo-wrapper title={!this.collapsed ? this.title : null} logoImage={this.logoImage} />
        {this.renderUserHeaderContent()}
        {this.initMenu()}
      </a-layout-side>
    )
  }

  /**
   *@description 渲染用户信息资料部分
   */
  renderUserHeaderContent() {
    return <div>user</div>
  }

  /**
   * @description 渲染导航路由-菜单列表
   */
  initMenu() {
    return <div>导航菜单列表</div>
  }
}
