/**
 * @description 页面布局 - 中心内容区域组件
 * @author PP
 */
import { Vue, Options } from 'vue-class-component'
import LayoutRouterBase from '@/layouts/LayoutRouterBase'
import './index.scss'
@Options({
  name: 'ContentWrapper',
  components: {
    LayoutRouterBase,
  },
})
class ContentWrapper extends Vue {
  /**
   * @description 渲染界面内容
   * @returns
   */
  render() {
    return (
      <a-layout-content class={['layout-content-wrapper']}>
        {/* activeMenuItem={this.activeMenuItem} */}
        <transition-group
          on-before-enter={this.beforeEnter}
          on-enter={this.enter}
          on-leave={this.leave}
          on-before-leave={this.beforeLeave}
        >
          {/* 导航签 */}
          {/* {this.showTagTabsPosition === 'content' ? (
            <tag-tabs
              key='transition-tag-tabs'
              vShow={this.showTagTabs}
              menuTabsArray={this.menuTabsArray}
              on-change-tabs={this.emitChangeTabs}
              activeMenuItem={this.activeMenuItem}
              showBreadcrumb={this.showBreadcrumb}
              isHeaderTab={false}
            />
          ) : null} */}

          {/* 界面页签 */}
          {/* <breadcrumb
            vShow={this.showBreadcrumb && !this.showTopBreadcrumb}
            key='transition-breadcrumb'
            showBreadcrumb={this.showBreadcrumb}
            showTopBreadcrumb={this.showTopBreadcrumb}
          /> */}
        </transition-group>
        <section class={['content-wrapper']}>
          <layout-router-base isKeepAlive={this.$route.meta.keepAlive || false}></layout-router-base>
        </section>
      </a-layout-content>
    )
  }

  /**
   * @description TagTabs 触发菜单选项交互事件
   * @param
   */
  emitChnageTagTabsMenu() {
    this.$emit('change-tag-menu')
  }

  /**
   * @description 切换tabs
   * @param {*} list Array[]
   */
  emitChangeTabs(list: any) {
    this.$emit('change-tabs', list)
  }

  /**
   * @description 动画进入前改变样式
   * @param {@} el HTMLElement
   * @param {*} done Function
   */
  beforeEnter(el: any) {
    el.style.transform = 'translateY(0)'
  }

  /**
   * @description 动画进入时改变样式
   * @param {@} el HTMLElement
   * @param {*} done Function
   */
  enter(el: any, done: any) {
    el.style.display = 'flex'
    el.style.opacity = '1'
    el.style.height = '44px'
    el.style.transition = 'opacity .5s ease, height .3s ease-in'
  }

  /**
   * @description 动画离开时改变样式
   * @param {@} el HTMLElement
   * @param {*} done Function
   */
  leave(el: any, done: any) {
    el.style.opacity = '0'
    el.style.height = '0'
    el.style.transform = 'translateY(-44px)'
    el.style.transition = 'opacity .3s ease, height .3s ease-out, transform 1.5s ease'
    setTimeout(() => {
      el.style.display = 'none'
    }, 300)
  }

  /**
   * @description 动画离开前改变样式
   * @param {@} el HTMLElement
   * @param {*} done Function
   */
  beforeLeave(el: any, done: any) {
    el.style.transition = 'all .5s ease-out'
  }
}

export default ContentWrapper
