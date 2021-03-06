/**
 * @description 注解自动绑定 store - modules - base
 * @returns base 对象
 */
import store from '@/store/index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

// type
export type BaseInfo = Omit<any, 'roles'>

@Module({ namespaced: true, name: 'baseStore', dynamic: true, preserveState: false, stateFactory: true, store })
class BaseStore extends VuexModule {
  private baseInfoState: BaseInfo | null = null

  // token
  private tokenState = 'is null'

  @Mutation
  commitTokenState(info: string): void {
    this.tokenState = info
  }

  /**
   * @description: login
   */
  @Action
  async changeToken(
    params: any & {
      goHome?: boolean
      mode?: any
    }
  ): Promise<any | null> {
    try {
      // const { goHome = true, mode, ...loginParams } = params

      this.commitTokenState('token') // 设置 store - token

      return {}
    } catch (error) {
      return null
    }
  }

  get getTokenState(): string {
    return this.tokenState
  }
}

export const baseStore = getModule<BaseStore>(BaseStore)

export default baseStore
