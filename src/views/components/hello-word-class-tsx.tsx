/**
 * @description TSX + class-component 组件写法
 */
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'

const PropsInfo = prop({
  msg: {
    type: Number,
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
  private count: any = ref(1)
  private dataValue: string | null = '默认文字2' // 声明一个data

  // 通过 vue-property-decorator 获取参数
  // @Prop({
  //   type: String,
  //   default: '你好',
  // })
  // private msg: string = ''

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
        <slot name='slot'></slot>
      </div>
    )
  }

  handleInsert = () => {
    console.log(this.count)
    this.count++
    this.$emit('countChange', this.count)
  }

  @Watch('count')
  watchCountChange = (value: string) => {
    console.log('监听值变化-----' + this.count)
  }
}
