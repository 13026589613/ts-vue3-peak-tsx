/**
 * @description APP 初始化引导界面
 */
import { defineComponent, ref, onMounted } from 'vue'
import store from '@/store'
export default defineComponent({
  render() {
    const msg = ref<string>('Vue3 + TypeScript + TSdX')
    // return <div>{msg.value}</div>
    return <router-view></router-view>
  },
  setup() {
    /**
     * @description 处理刷新缓存store 。 插件不支持动态vuex 渲染。建议使用普通版本store 便于缓存处理
     */
    onMounted(() => {
      if (sessionStorage.getItem('store') !== null) {
        store.replaceState(JSON.parse(sessionStorage.getItem('store') as string))
      }

      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(store.state))
      })
    })
    // const msg = ref<string>('Vue3 + TypeScript + TSdX')
    // return () => <div>{msg.value}</div>
    // return () => <hello-world msg={msg.value}></hello-world>
  },
})
