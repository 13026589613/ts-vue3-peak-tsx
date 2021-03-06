/**
 * @description 普通TSX 组件写法，不使用注解
 */
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
// import { baseStore } from '@/store/modules/base'

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
          <h1>TSX组件</h1>
          props 参数传递: {this.msg}
          <br />
          默认文字显示：{defaultString.value}
        </div>
        <button onClick={this.handleInsert}>Store 点击记录: {this.count} </button>

        {this.$slots.slotName ? this.$slots.slotName() : null}

        {/* store 调用 */}
        {/* {`store-token配置：${baseStore.getTokenState}`} */}
      </div>
    )
  },

  setup(_, { emit }) {
    let count = ref(1)
    const handleInsert = () => {
      count.value++
      emit('countChange', count.value)
    }

    return {
      count,
      handleInsert,
    }
  },
})
