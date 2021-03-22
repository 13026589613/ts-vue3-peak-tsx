/**
 * @description 路由的基础Layout 模块
 */
import { Vue, Options } from 'vue-class-component'
import { SideWrapper, HeaderWrapper, ContentWrapper, FooterWrapper } from '@/layouts/components'

@Options({
  name: 'LayoutBase',
  components: {
    LeftSide: SideWrapper,
    HeaderWrapper,
    ContentWrapper,
    FooterWrapper,
  },
  // emits: ['countChange'],
})
class LayoutBase extends Vue {
  render() {
    return (
      <a-layout class={['layout']}>
        {/* 菜单导航部分 */}
        <left-side></left-side>

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
