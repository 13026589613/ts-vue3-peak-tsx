/**
 * @description 注解式store - RouteStore 样例
 *              import 引入时会自动注入到store中
 *              注解自动绑定 store - modules - base
 * @returns base 对象
 */
import store from '@/store/index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

// type
export type RouteInfo = Omit<any, 'roles'>

@Module({ namespaced: true, name: 'routeStore', dynamic: true, preserveState: false, stateFactory: true, store })
class RouteStore extends VuexModule {
  private allRoutes: any[] = []
  private generateRoutes: any[] = []

  private hasAsyncRoutes = false // 是否已经加载路由

  @Mutation
  commitSetRoutesState(routers: any[]): void {
    this.generateRoutes = routers
    this.allRoutes = [].concat(...routers)
  }

  @Mutation
  commitHasAsyncRoutes(status: boolean): void {
    this.hasAsyncRoutes = status
  }

  @Action
  ActionChangeRouterStatus(status: boolean) {
    this.commitHasAsyncRoutes(status)
  }

  /**
   * @description: 设置 routes
   */
  @Action
  async ActionSetRoutes(value: any[]): Promise<any | null> {
    try {
      this.commitSetRoutesState(value) // 设置 store - token
      this.ActionChangeRouterStatus(true) // 标示已经装载路由
      return { generateRoutes: this.generateRoutes, allRoutes: this.allRoutes }
    } catch (error) {
      return null
    }
  }

  get getGenerateRoutes(): any[] {
    return this.generateRoutes
  }

  get getAllRoutes(): any[] {
    return this.allRoutes
  }

  get getHasAsyncRoutes(): boolean {
    return this.hasAsyncRoutes
  }
}

export const routeStore = getModule<RouteStore>(RouteStore)

export default routeStore
