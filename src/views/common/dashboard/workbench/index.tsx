/**
 * @description 普通TSX 写法，不使用注解
 */
import { defineComponent, ref, getCurrentInstance, onMounted, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import './index.scss'

export default defineComponent({
  // 采用render 方式渲染
  render() {
    const msg = ref<string>('Vue3 + TypeScript + TSdX')
    return (
      <div class='example-wrapper'>
        <h3>1、路由跳转</h3>
        <div class='example-content' onClick={this.handleRoute}>
          {' '}
          返回 welcome 界面
        </div>

        <h3>2、赋值</h3>
        <div class='example-content' onClick={this.handleClick}>
          {msg.value}
        </div>

        {/* 循环遍历 */}
        <h3>3、遍历循环</h3>
        {this.dataList.map((item: string, index: number) => (
          <div class='example-content'>
            行内渲染：
            <span>{item}</span> - <span>{index}</span>
            <br />
          </div>
        ))}

        {/* 循环遍历 */}
        <h3>4、render 遍历循环</h3>
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
      console.log('------------------- 获取route ------------------ ')
      console.log(toRaw(useRoute()))
      // currentInstance.ctx 相当于 vue2 this
      console.log(currentInstance.ctx.$router.currentRoute.value)
    })

    /**
     * @description 渲染 Item 内容
     * @param item
     * @param index
     */
    const renderItem = (item: string, index: number) => {
      return (
        <div onClick={() => handleClickItem(item)} class='example-content'>
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
      // currentInstance.ctx.$router.replace({ name: 'Welcome' })
      currentInstance.ctx.$router.go(-1)
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
