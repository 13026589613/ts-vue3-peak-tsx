<template>
  <div>
    <h3>普通vue文件 组件 </h3>
    <b>一、props 参数传递: </b>{{ msg }} <br />
    <p>
      <b>二、点击事件</b>
    </p>
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
