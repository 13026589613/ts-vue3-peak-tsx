/**
 * @description 注解自动绑定 store - modules - base
 * @returns base 对象
 */
import store from '@/store/index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

// type
export type BaseInfo = Omit<any, 'roles'>

@Module({ namespaced: true, name: 'base', dynamic: true, store })
class BaseStore extends VuexModule {
  private baseInfoState: BaseInfo | null = null

  // token
  private tokenState = ''

  @Mutation
  commitTokenState(info: string): void {
    this.tokenState = info
  }

  /**
   * @description: login
   */
  @Action
  async login(
    params: any & {
      goHome?: boolean
      mode?: any
    }
  ): Promise<any | null> {
    try {
      const { goHome = true, mode, ...loginParams } = params

      this.commitTokenState('') // 设置 store - token

      return {}
    } catch (error) {
      return null
    }
  }
}

export const userStore = getModule<BaseStore>(BaseStore)
