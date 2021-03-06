/**
 * @description TSX + class-component 组件写法
 */
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { Watch, Prop, Emit } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const PropsInfo = prop({
  msg: {
    type: Number,
    required: true,
    default: '默认参数',
  },
})

const baseStore = namespace('base')
@Options({
  name: 'TSXClassComponent',
  emits: ['countChange'],
  props: PropsInfo,
})
export default class TSXClassComponent extends Vue {
  private count: any = ref(1)
  private dataValue: string | null = '默认文字2' // 声明一个data

  // @baseStore.State('tokenState')
  // tokenState!: number

  // 通过 vue-property-decorator 获取参数
  // @Prop({
  //   type: String,
  //   default: '你好',
  // })
  // private msg: string = ''

  moment: any = onMounted(() => {})

  /**
   * @description 渲染界面主体内容
   */
  render() {
    const defaultString = ref<string>('hello-word')

    return (
      <div>
        <div>
          <h1>TSX - class 组件</h1>
          props 参数传递: {this.msg} || $props 获取参数 - {this.$props.msg}
          <br />
          默认文字显示：{defaultString.value} ｜｜ {this.dataValue}
        </div>

        <button onClick={this.handleInsert}>Store 点击记录: {this.count} </button>

        {/* 插槽 */}
        {this.$slots.slotName()}

        {/* store 调用 */}
        {/* {`store-token配置：${this.tokenState}`} */}
      </div>
    )
  }

  @Emit('countChange')
  handleInsert() {
    this.count++
    return this.count
    // this.$emit('countChange', this.count)
  }

  @Watch('count')
  watchCountChange = (value: string) => {
    console.log('监听值变化-----' + this.count)
  }
}
