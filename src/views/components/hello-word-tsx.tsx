/**
 * @description 普通TSX 组件写法，不使用注解
 */
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { baseStore } from '@/store/modules/base'

export default defineComponent({
  name: 'TSXHelloWordComponents',
  components: {},
  emits: ['mounted', 'countChange'],
  props: {
    msg: {
      type: String,
      default: '你好',
    },
  },
  // 采用render 方式渲染
  render() {
    const defaultString = ref<string>('hello-word')
    return (
      <div>
        <div>
          <h3>TSX组件</h3>
          <p>
            <b>一、prop 和 data 赋值</b>
          </p>
          props 参数传递: {this.msg}
          <br />
          默认文字显示：{defaultString.value}
        </div>

        <p>
          <b>二、点击事件</b>
        </p>
        <button onClick={this.handleInsert}>Store 点击记录: {this.count} </button>

        {this.$slots.slotName ? this.$slots.slotName() : null}

        {/* store 调用 */}
        <p>
          <b>三、store 变更事件</b>
        </p>
        <p onClick={() => this.handleChangeStoreValue(`${new Date().getTime()}`) as any}>
          {`store-token配置：${baseStore.getTokenState} 点击变更`}
        </p>
      </div>
    )
  },

  setup(_, { emit }) {
    let count = ref(1)

    // mounted
    onMounted(() => {})

    /**
     * @description 递增事件
     */
    const handleInsert = () => {
      count.value++
      emit('countChange', count.value)
    }

    /**
     * @description 切换baseStore下的token 样例值
     */
    const handleChangeStoreValue = (value: string) => {
      baseStore.ActionChangeToken(value)
    }

    return {
      count,
      handleInsert,
      handleChangeStoreValue,
    }
  },
})
