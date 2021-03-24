/**
 * @description 页面布局 - 左侧菜单组件 PC端
 * @author PP
 */
import { Vue, Options } from 'vue-class-component'
import { useStore } from 'vuex'
import { routeStore } from '@/store/modules/routes'
import { Prop } from 'vue-property-decorator'
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
  private isCollapsed: boolean = true

  private sideWidth: number = 240

  private store = useStore()

  @Prop({ default: () => {} }) loginUser!: any

  @Prop({ default: () => [] }) menuList!: Array<any> // 路由菜单数据 - router中动态加载获取数据

  @Prop({ default: () => 'inline' }) mode!: String // 菜单展示模式

  @Prop({ default: () => 'children' }) childrenKey!: String // 菜单展示模式

  @Prop({ default: () => 'menuId' }) menuKey!: String // 菜单展示模式

  // mounted() {
  //   this.openKeysCache = [...this.defaultOpen] // 缓存打开的菜单数组，收缩状态控制菜单是否打开
  //   this.openKeys = [...this.defaultOpen] // 打开的菜单数组
  //   this.selectedKeys = [...this.defaultSelect] // 选中菜单数组
  //   this.renderMenuStatus()
  // }

  /**
   * @description 渲染左侧的导航菜单
   */
  render() {
    return (
      <a-layout-side
        trigger={null}
        vModel={this.isCollapsed}
        collapsible={this.isCollapsed}
        class={['left-side', 'side']}
        width={`${this.sideWidth}px`}
      >
        {/* <logo-wrapper title={!this.isCollapsed ? this.title : null} logoImage={this.logoImage} /> */}
        {this.renderUserHeaderContent()}
        {this.initMenu()}
      </a-layout-side>
    )
  }

  /**
   *@description 渲染用户信息资料部分
   */
  renderUserHeaderContent() {
    return (
      <section class='header-content'>
        <section>
          <section class='header-info-wrapper'>
            <a-avatar
              size={60}
              src={this.loginUser ? this.loginUser.headerImg : this.defaultHeader}
              class='info-img-header'
            />
            {!this.isCollapsed ? <time-clock class='right-user-info' /> : null}
          </section>

          <a-row>
            <a-col span='8'>
              <router-link to={{ name: 'Home' }}>
                <a-icon type='user' />
                {!this.isCollapsed ? <span>&nbsp;个人中心</span> : null}
              </router-link>
            </a-col>
            <a-col span='8'>
              <router-link to={{ name: 'Home' }}>
                <a-icon type='setting' />
                {!this.isCollapsed ? <span>&nbsp;消息中心</span> : null}
              </router-link>
            </a-col>
            <a-col span='8'>
              <a on-click={this.handleLogout}>
                <a-icon type='logout' />
                {!this.isCollapsed ? <span>&nbsp;退出登录</span> : null}
              </a>
            </a-col>
          </a-row>
        </section>
      </section>
    )
  }

  /**
   * @description 渲染导航路由-菜单列表
   */
  initMenu() {
    // const on = {
    //     select: (obj: any) => {
    //       if (obj.key === this.defaultSelect) {
    //         this.openKeys = []
    //         this.$router.push({ name: this.defaultSelect })
    //       }
    //       this.selectedKeys = obj.selectedKeys
    //       this.$emit('select', obj)
    //     },
    //     openChange: this.openMenuItem,
    //   }
    const username = Cookies.get('username') || null

    return (
      <a-menu
        mode={this.mode}
        // theme={this.theme}
        // openKeys={this.openKeys}
        // selectedKeys={this.selectedKeys}
        // defaultOpenKeys={this.openKeys}
        // defaultSelectedKeys={this.selectedKeys}
        // {...{ on }}
      >
        {username === 'admin' ? (
          <a-menu-item key={this.defaultSelect} class='home-side-item'>
            <a-icon type='desktop' />
            <span>系统中控台</span>
          </a-menu-item>
        ) : null}
        {(this.menuList || []).map((item: any) => this.renderSubMenu(item))}
      </a-menu>
    )
  }

  /**
   * 循环子集 children item
   * @param menuData
   */
  renderSubMenu(menuData: any) {
    // routeLink标示，如果菜单携带该标示，则菜单下的所有子菜单失效。点击该菜单执行router-link跳转
    // if (menuData.routeLink) {
    //   return (
    //     <a-menu-item key={menuData.meta[`${this.menuKey}`]}>
    //       {this.renderIcon(menuData.icon)}
    //       <span>{menuData.meta.title || ''}</span>
    //     </a-menu-item>
    //   )
    // }

    const itemArr: any = []
    const childrenList = menuData[`${this.childrenKey}`]
    if (childrenList && childrenList.length > 0) {
      childrenList.forEach((item: any) => itemArr.push(this.renderItem(item)))
    }

    return (
      <a-sub-menu
        key={menuData.meta[`${this.menuKey}`]}
        v-slots={{
          title: () => {
            return (
              <span>
                {this.renderIcon(menuData.icon)}
                <span>{menuData.meta.title || ''}</span>
              </span>
            )
          },
        }}
      >
        {itemArr}
      </a-sub-menu>
    )
  }

  /**
   * 渲染 a-menu-item ，可点击标签（iframe）/ router 路由
   * @param menuData
   */
  renderMenuItem(menuData: any) {
    const TagAttr = menuData.meta.iframeUrl || (null && 'a') || 'router-link'
    return (
      <a-menu-item {...{ key: menuData.meta[`${this.menuKey}`] }}>
        <router-link to={{ name: menuData.name }}>
          <span>{menuData.meta.title}</span>
        </router-link>
        {/* <TagAttr to={{ name: menuData.name }}>
          {this.renderIcon(menuData.meta.icon)}
          <span>{menuData.meta.title}</span>
        </TagAttr> */}
      </a-menu-item>
    )
  }

  /**
   * 判断处理 -> 循环遍历 children || 渲染菜单 item
   * @param menuData
   */
  renderItem(menuData: any) {
    if (!menuData.meta.hidden) {
      // routeLink标示，如果菜单携带该标示，则菜单下的所有子菜单失效。点击该菜单执行router-link跳转
      if (menuData.routeLink) {
        return this.renderMenuItem(menuData)
      }

      return menuData[`${this.childrenKey}`] && menuData[`${this.childrenKey}`].length > 0
        ? this.renderSubMenu(menuData)
        : this.renderMenuItem(menuData)
    }
    return null
  }

  /**
   * 处理菜单 icon, 生成
   * @param icon 两中参数 object ->component || string -> props
   * @param object ->params: {width, height, fill, class, style}
   * @param props-> params: {type}
   */
  renderIcon(icon: string | Object) {
    if (icon === 'none' || icon === undefined) {
      return null
    }
    let props = {}
    typeof icon === 'object' ? (props = { component: icon }) : (props = { type: icon })
    return <a-icon {...{ props }} />
  }

  /**
   * @description 退出登录
   */
  handleLogout() {}
}
