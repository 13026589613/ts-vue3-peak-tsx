/**
 * @description 普通TSX 写法，不使用注解
 */
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
export default defineComponent({
  // 采用render 方式渲染
  render() {
    const msg = ref<string>('Vue3 + TypeScript + TSdX')
    return (
      <div>
        <div onClick={this.handleRoute}> 返回 welcome 界面</div>

        <div onClick={this.handleClick}>{msg.value}</div>

        {/* 循环遍历 */}
        {this.dataList.map((item: string, index: number) => (
          <div>
            行内渲染：
            <span>{item}</span> - <span>{index}</span>
            <br />
          </div>
        ))}

        {/* 循环遍历 */}
        {this.dataList.map((item: string, index: number) => this.renderItem(item, index))}
      </div>
    )
  },

  // vue
  setup(props, { attrs, slots, emit }) {
    const dataList = ['Vue3', 'TypeScript', 'TSdX'] // data-list
    const msg = ref<string>('Vue3 + TypeScript + TSdX') // data

    const currentInstance = getCurrentInstance() as any // 获取全局vue 的 currentInstance 相当于 this

    /**
     * @description 初始化加载
     */
    onMounted(() => {
      console.log(msg.value)
    })

    /**
     * @description 渲染 Item 内容
     * @param item
     * @param index
     */
    const renderItem = (item: string, index: number) => {
      return (
        <div onClick={() => handleClickItem(item)}>
          renderItem 事件：
          <span>{item} --- </span>
          <span>{index}</span>
          <br />
        </div>
      )
    }

    // 点击事件
    const handleClick = () => {}

    // 点击 render Item 事件
    const handleClickItem = (item: string) => {}

    // 路由跳转，采用 vue-currentInstance 方式
    const handleTurnBack = () => {
      currentInstance.ctx.$router.replace({ name: 'Welcome' })
    }

    return {
      dataList,
      msg,
      handleClick,
      renderItem,
      handleRoute: handleTurnBack,
    }

    // 采用setup return 渲染时不需要 抛出数据data、方法等
    // return () => <div onClick={handleClick}>{msg.value}</div>
  },
})
