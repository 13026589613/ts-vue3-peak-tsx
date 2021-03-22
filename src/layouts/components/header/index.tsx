/**
 * @description 页面布局 - 头部组件
 * @author PP
 */
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import './index.scss'

@Options({
  name: 'HeaderWrapper',

  components: {},
})
class HeaderWrapper extends Vue {
  private spinning: boolean = true
  private defaultHeader: string = window.DEFAULT_HEADER_IMG
  private defaultName: string = window.DEFAULT_LOGIN_USER_NAME

  private loginUser: any = {}

  @Prop({ default: () => [] }) private noticeList: any

  /**
   * @description 渲染头部内容
   * @returns
   */
  render() {
    return (
      <a-layout-header class={['']}>
        <a-icon class='trigger' type={this.collapsed ? 'menu-unfold' : 'menu-fold'} />

        {/* 界面页签 */}
        <breadcrumb
          vShow={this.showBreadcrumb && this.showTopBreadcrumb}
          class={['header-breadcrumb']}
          key='transition-breadcrumb'
          showBreadcrumb={this.showBreadcrumb}
          showTopBreadcrumb={this.showTopBreadcrumb}
        />

        {/* 导航签 */}
        {this.showTagTabsPosition === 'top' ? (
          <tag-tabs
            key='transition-tag-tabs'
            vShow={this.showTagTabs}
            menuTabsArray={this.menuTabsArray}
            on-change-tabs={this.emitChangeTabs}
            activeMenuItem={this.activeMenuItem}
            isHeaderTab={true}
          />
        ) : null}

        {/* 头部按钮集成区域 */}
        <section class='right-user-wrapper'>
          <full-screen className={['i-font25', 'pad-all-5']} shrink={true} />

          {/* 数据中心-大屏界面 */}
          <section
            class='census-route'
            on-click={() => {
              // this.$router.replace({ name: 'censusMain' })
              this.$router.replace({ name: 'censusAnalysysTarget' })
            }}
          >
            <a-icon type='pie-chart' class='i-font25 pad-all-5' />
          </section>

          <section>
            <a href={''} target='_blank' style='line-height:1;color:#303133;'>
              <a-icon type='global' class='i-font25 pad-all-5' />
            </a>
          </section>

          {/* 系统通知服务 */}
          <section class='notice-list'>{this.renderNoticeContent()}</section>

          {/* 系统用户管理中心 */}
          <section class='user-info'>{this.renderUserHeaderContent()}</section>
        </section>
      </a-layout-header>
    )
  }
  /**
   * @description 菜单收缩状态控制
   */
  handleChangeCollapsed() {
    this.$emit('change-collapsed', this.collapsed)
  }

  /**
   * @description 菜单收缩状态控制
   */
  handleClickNotice() {
    this.$emit('open-notice', true)
  }

  /**
   * 用户退出登录
   */
  handleLogout() {
    this.$ModuleApis.user
      .logout({
        data: {},
      })
      .then((res: any) => {
        if (res.success === true) {
          this.$tools.clearLoginInfo()
          this.$router.replace('/login')
          this.$emit('logout', true)
        } else {
          this.$emit('logout', false)
        }
      })
  }

  /**
   * @description 导航进行切换
   * @param list
   */
  emitChangeTabs(list: any) {
    this.$emit('change-tabs', list)
  }

  /**
   * @description 渲染通知信息
   */
  renderNoticeContent() {
    return (
      <a-popover
        placement='bottomRight'
        trigger='click'
        onVisibleChange={this.handleNoticeVisible}
        autoAdjustOverflow={true}
        arrowPointAtCenter={true}
        overlayStyle={{ width: '400px', top: '50px' }}
      >
        <template v-slots='content'>
          <a-spin tip='数据加载中...' spinning={this.spinning}>
            <a-tabs defaultActiveKey='0'>
              {this.noticeList.map((item: any, index: number) => (
                <a-tab-pane tab={item.tabName} key={index + 1}>
                  {this.renderNoticeTabList(item)}
                </a-tab-pane>
              ))}
            </a-tabs>
          </a-spin>
        </template>
        <a-badge count={this.badgeNumber}>
          <a-icon type='smile' class='i-font25 pad-all-5' />
        </a-badge>
      </a-popover>
    )
  }

  /**
   * @description 渲染公告tab分类信息列表
   */
  renderNoticeTabList(tabItem: any = []) {
    return (
      <a-list itemLayout='horizontal' dataSource={tabItem.list || []}>
        {tabItem.list.map((item: any) => (
          <a-list-item slot='renderItem'>
            <a-list-item-meta>
              <a v-slots='title' on-click={() => this.handleClickNoticeItem(item)}>
                {item.title}
              </a>
              <a-avatar slot='avatar' src={item.avatar} />
            </a-list-item-meta>
          </a-list-item>
        ))}
      </a-list>
    )
  }

  /**
   * @description 渲染用户头像 -> 用户信息
   */
  renderUserHeaderContent() {
    return (
      <a-popover
        placement='bottomRight'
        trigger='click'
        onVisibleChange={this.handleHeaderVisible}
        autoAdjustOverflow={true}
        arrowPointAtCenter={true}
        overlayClassName={'header-content'}
      >
        <a-badge count={this.badgeNumber}>
          <a-avatar icon='user' src={this.loginUser.headerImg || this.defaultHeader} />
        </a-badge>

        <template v-slots='content'>
          <section class='header-info-wrapper'>
            <a-avatar size={80} src={this.loginUser.headerImg || this.defaultHeader} />
            <span class='user-name-title'>{this.loginUser.name || this.defaultName}</span>

            <time-clock />
          </section>

          <a-menu class='header-content-list'>
            <a-menu-item key='0'>
              <router-link to={{ name: 'Home' }}>
                <a-icon type='user' />
                <span>个人中心</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key='1'>
              <router-link to={{ name: 'Home' }}>
                <a-icon type='setting' />
                <span>修改密码</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key='2'>
              <router-link to={{ name: 'Home' }}>
                <a-icon type='setting' />
                <span>消息中心</span>
              </router-link>
            </a-menu-item>
            <a-menu-divider />

            <a-menu-item key='3'>
              <a on-click={this.handleLogout}>
                <a-icon type='logout' />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-popover>
    )
  }

  /**
   * @description 系统通知公告信息 -> 浮窗显隐
   */
  handleNoticeVisible(value: any) {
    this.spinning = true
    if (value) {
      this.handleClickNotice()
      setTimeout(() => {
        this.spinning = false
      }, 1500)
    }
  }

  /**
   * @description 头像信息 -> 浮窗显隐
   */
  handleHeaderVisible(value: any) {
    this.spinning = true
    if (value) {
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    }
  }

  /**
   * @description 点击通知item -> 跳转路由展示详情
   */
  handleClickNoticeItem(item: any) {
    this.$router.push({ name: 'notice', params: { noticeId: item.noticeId } })
  }
}

export default HeaderWrapper
