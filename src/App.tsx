/**
 * @description APP 初始化引导界面
 */
import { defineComponent, ref } from 'vue'
export default defineComponent({
  render() {
    const msg = ref<string>('Vue3 + TypeScript + TSdX')
    // return <div>{msg.value}</div>
    return <router-view></router-view>
  },
  // setup() {
  //   const msg = ref<string>('Vue3 + TypeScript + TSdX')
  //   return () => <div>{msg.value}</div>
  //   // return () => <hello-world msg={msg.value}></hello-world>
  // },
})
