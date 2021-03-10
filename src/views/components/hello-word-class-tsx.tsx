/**
 * @description TSX + class-component 组件写法
 */
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { Watch, Prop, Emit } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// 引入base - store，导入操作对象
import { baseStore } from '@/store/modules/base'

// 导入example - store 。根据命名空间获取store 数据
const exampleModule = namespace('example')

// 定义props 参数
const PropsInfo = prop({
  msg: {
    type: String,
    required: true,
    default: '默认参数',
  },
})

@Options({
  name: 'TSXClassComponent',
  emits: ['countChange'],
  props: PropsInfo,
})
export default class TSXClassComponent extends Vue {
  @exampleModule.State('storeExamData')
  protected storeExamData!: boolean

  @exampleModule.Getter('getTestGetterData')
  protected testGetterData!: boolean

  @exampleModule.Action('ActionStoreExamData')
  protected actionStoreExamData: any

  private count: any = ref(1)
  private dataValue: string | null = '默认文字2' // 声明一个data

  // 通过 vue-property-decorator 获取参数
  @Prop({
    type: String,
    default: '你好',
  })
  private propsWord?: string

  moment: any = onMounted(() => {
    console.log('----------------- slots操作 ------------------')
    console.log(this.$slots)
  })

  /**
   * @description 渲染界面主体内容
   */
  render() {
    const defaultString = ref<string>('hello-word')

    return (
      <div>
        <div>
          <h1>TSX - class 组件</h1>
          props 参数传递:
          <br />
          参数 1 ：{this.msg}
          <br />
          参数 2 ：$props 获取参数 - {this.$props.msg}
          <br />
          参数 3 ： {this.propsWord}
          <br />
          默认文字显示：{defaultString.value} ｜｜ {this.dataValue}
        </div>

        <button onClick={this.handleInsert}>Store 点击记录: {this.count} </button>

        {/* 插槽 */}
        {this.$slots.slotName()}

        {/* 注解式 base - store 调用 */}
        <p onClick={() => this.actionChangeBaseStoreValue(`${new Date().getTime()}`) as any}>
          {`store-token配置：${baseStore.getTokenState} 点击变更`}
        </p>

        {/* 操作变更&&调用查看 example store 中 的样例值 */}
        <p onClick={this.actionChangeExampleStoreValue}>
          {`store样例值当前：${this.storeExamData} -- ${this.testGetterData} 点击变更`}
        </p>
      </div>
    )
  }

  /**
   * @description 切换 example 常规 store 样例值
   */
  actionChangeExampleStoreValue() {
    this.actionStoreExamData(!this.storeExamData)
  }

  /**
   * @description 注解式base - store 切换token 样例值
   */
  actionChangeBaseStoreValue(value: string) {
    baseStore.ActionChangeToken(value)
  }

  /**
   * @description Emit传值样例
   */
  @Emit('countChange')
  handleInsert() {
    this.count++
    return this.count
    // this.$emit('countChange', this.count) // 普通emit 使用方式
  }

  /**
   * @description Watch 值变更监听
   */
  @Watch('count')
  watchCountChange = (value: string) => {
    console.log('监听值变化-----' + this.count)
  }
}
