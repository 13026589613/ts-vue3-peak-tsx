/**
 * @description 常规的 keep-alive router路由界面
 */
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { Watch, Prop, Emit } from 'vue-property-decorator'

class LayoutRouterBase extends Vue {
  @Prop({
    type: Boolean,
    default: true,
  })
  private isKeepAlive?: boolean

  render() {
    // 缓存路由
    const keepAliveRoute = (
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    )

    // 常规路由
    const noKeepAliveRoute = <router-view></router-view>

    return this.isKeepAlive ? keepAliveRoute : noKeepAliveRoute
  }
}

export default LayoutRouterBase
