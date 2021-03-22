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

  @Mutation
  commitSetRoutesState(routers: any[]): void {
    this.generateRoutes = routers
    this.allRoutes = [].concat(...routers)
  }

  /**
   * @description: 设置 routes
   */
  @Action
  async ActionSetRoutes(value: any[]): Promise<any | null> {
    try {
      this.commitSetRoutesState(value) // 设置 store - token

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
}

export const routeStore = getModule<RouteStore>(RouteStore)

export default routeStore
