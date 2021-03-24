/**
 * @description 路由的基础Layout 模块
 */
import { Vue, Options } from 'vue-class-component'
import { SideWrapper, HeaderWrapper, ContentWrapper, FooterWrapper } from '@/layouts/components'
import SettingWrapper from '@/components/Setting'
import { useStore } from 'vuex'
@Options({
  name: 'LayoutBase',
  components: {
    LeftSide: SideWrapper,
    HeaderWrapper,
    ContentWrapper,
    FooterWrapper,
    SysSettingsBtn: SettingWrapper,
  },
  // emits: ['countChange'],
})
class LayoutBase extends Vue {
  private store = useStore() // store

  private menuListData = this.store.state.routeStore.allRoutes // 路由菜单数据

  render() {
    return (
      <a-layout class={['layout']} style='min-height: 100%;'>
        {/* 菜单导航部分 */}
        <left-side menuList={this.menuListData}></left-side>

        {/* 右侧部分 */}
        <a-layout>
          {/* 头部导航栏目 */}
          <header-wrapper></header-wrapper>

          {/* 中部内容展示区域 */}
          <content-wrapper></content-wrapper>

          {/* footer 底部页脚部分 */}
          <footer-wrapper></footer-wrapper>
        </a-layout>

        {/* 系统参数配置模块 */}
        <sys-settings-btn></sys-settings-btn>

        {/* 返回顶部按钮 */}
        {this.renderBackTopDom('right-content-wrapper')}
      </a-layout>
    )
  }

  /**
   * @description 返回头部按钮Dom渲染
   */
  renderBackTopDom(dom: any) {
    return <a-back-top visibilityHeight={50} target={() => document.getElementsByClassName(dom)[0]} />
  }
}

export default LayoutBase
