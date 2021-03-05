/**
 * @description 欢迎欢迎。tsx 使用注解方式的写法
 */
// import { Emit } from 'vue-property-decorator'
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options } from 'vue-class-component'
import router from '@/router'

import HelloWord from '@/views/components/hello-word.vue'
import HelloWordTs from '@/views/components/hello-word-ts.vue'
import HelloWordTsClass from '@/views/components/hello-word-ts-class.vue'
import HelloWordTsx from '@/views/components/hello-word-tsx'
import HelloWordClassTsx from '@/views/components/hello-word-class-tsx'
import './index.scss'

@Options({
  name: 'WelcomeComponent',
  components: {
    HelloWord,
    HelloWordTs,
    HelloWordTsClass,
    HelloWordTsx,
    HelloWordClassTsx,
  },
  emits: ['countChange'],
})
export default class WelcomeComponent extends Vue {
  dataValue: string | null = '点击前往登录' // 声明一个data
  dataList: string[] = ['1', '2', '10'] // 声明一个 数组集合 data
  countData: number = 0 // 响应组件反馈的值

  currentInstance: any = getCurrentInstance() as any

  /**
   * @description 初始化加载
   */
  moment: any = onMounted(() => {
    console.log(this.dataList[0])
  })

  /**
   * @description 渲染界面主体内容
   */
  render() {
    return (
      <div>
        <span onClick={this.handleLogin}>{this.dataValue}</span>

        {/* 遍历循环事例 */}
        <p>循环遍历展示</p>
        {this.dataList?.map((item: string, index: number) => (
          <div>
            <span>值：{item}</span>
            <span>索引：{item}</span>
            <br />
          </div>
        ))}

        {/* 遍历循环事例 */}
        <p>使用方法 render 渲染内容</p>
        {this.dataList?.map((item: string, index: number) => this.renderHtml(item, index))}

        {/* 组件展示 */}
        <h3>各类组件和传输等操作展示</h3>
        <div class='component-wrapper'>
          {/* 普通 vue 文件组件 */}
          <hello-word msg={'msg-props'}></hello-word>

          {/* ts-vue 文件组件 */}
          <hello-word-ts msg={'ts-msg-props'} onCountChange={this.emitCountChange}>
            <p>ts-vue 组件 事件反馈值 ---- {this.countData}</p>
          </hello-word-ts>

          {/* ts-vue-class 文件组件 */}
          <hello-word-ts-class msg={'ts-msg-props-class'} onCountChange={this.emitCountChange}>
            <p> ts-vue-class 组件 事件反馈值 ---- {this.countData}</p>
          </hello-word-ts-class>

          {/* tsx 文件组件 */}
          <hello-word-tsx msg={'ts-msg-props'} onCountChange={this.emitCountChange}>
            {/* <template #appendFooter></template> */}
            <p v-slot='slot'>tsx 文件组件 事件反馈值 ---- {this.countData}</p>
          </hello-word-tsx>

          {/* tsx - class 注解模式组件 */}
          <hello-word-class-tsx msg={'tsx - class -msg-props'} onCountChange={this.emitCountChange}>
            <p>tsx - class组件 事件反馈值 ---- {this.countData}</p>
          </hello-word-class-tsx>
        </div>
      </div>
    )
  }

  /**
   * @description 渲染html 内容
   */
  renderHtml(item: string, index: number) {
    return (
      <div onClick={() => this.handleTargetItem(item)}>
        <span>值：{item}</span>
        <span>索引：{item}</span>
        <br />
      </div>
    )
  }

  /**
   * @description 登录事件
   */
  handleLogin = () => {
    this.currentInstance.ctx.$router.push({ name: 'Workbench' })
    // router.push({ name: 'Workbench' })
  }

  /**
   * @description 触发Item的点击事件
   * @param item
   */
  handleTargetItem = (item: string) => {
    console.log(`点击行数据 - 获取值${item}`)
  }

  /**
   * @description 组件变更
   */
  emitCountChange(value: number) {
    this.countData = value
    console.log(`响应组件反馈的值--${value}`)
  }
}
