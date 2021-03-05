<template>
  <div>
    <h1>普通vue文件 组件 </h1>
    props 参数传递: {{ msg }} <br />
    <button @click="count++">Store 点击记录: {{ count }} </button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: '你好',
      },
    },
    data() {
      return {
        count: 0,
      }
    },
  }
</script>
