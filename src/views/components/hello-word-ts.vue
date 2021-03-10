<template>
  <div>
    <h3>ts vue 文件 组件 </h3>
    <b>一、props 参数传递: </b>{{ msg }} <br />
    <p>
      <b>二、点击事件</b>
    </p>
    <button @click="handleInsert">Store 点击记录: {{ count }} </button>

    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRaw, onMounted } from 'vue'
  import { baseStore } from '@/store/modules/base'

  export default defineComponent({
    name: 'HelloWorld',
    components: {},
    emits: ['mounted', 'countChange'],
    props: {
      msg: {
        type: String,
        default: '你好',
      },
    },

    setup(_, { emit }) {
      let count = ref(1)

      onMounted(() => {})

      /**
       * @description 递增事件
       */
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
</script>
