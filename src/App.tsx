/**
 * @description APP 初始化引导界面
 */
import { defineComponent, ref, onMounted } from 'vue'
import { resetStore, setStore } from '@/store'

export default defineComponent({
  render() {
    const msg = ref<string>('Vue3 + TypeScript + TSdX')
    // return <div>{msg.value}</div>
    return <router-view></router-view>
  },
  setup() {
    /**
     * @description 处理刷新缓存store
     *              插件不支持动态 vuex 渲染。建议使用普通版本 store 便于缓存处理
     *              因为目前采用了动态注解的 store ， 无法使用插件
     *              如果采用常规 store 写法，可在 store-index 文件中用插件实现 store 持久化缓存
     */
    onMounted(() => {
      if (sessionStorage.getItem('store') !== null) {
        resetStore()
      }

      window.addEventListener('beforeunload', () => {
        setStore()
      })
    })
    // const msg = ref<string>('Vue3 + TypeScript + TSdX')
    // return () => <div>{msg.value}</div>
    // return () => <hello-world msg={msg.value}></hello-world>
  },
})
