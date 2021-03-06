<template>
  <div>
    <h1>ts vue class 文件 组件 </h1>
    props 参数传递: {{ msg }} <br />
    <button @click="handleInsert">Store 点击记录: {{ count }} </button>

    <!-- 操作变更&&调用查看 example store 中 的样例值 -->
    <p @click="handleChangeStoreValue">
      {{ `store样例值当前：${this.storeExamData} -- ${this.testGetterData} 点击变更` }}
    </p>

    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRaw, onMounted } from 'vue'
  import { Vue, Options, prop } from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  // 导入example - store 。根据命名空间获取store 数据
  const exampleModule = namespace('example')

  @Options({
    name: 'HelloWorld',
    emits: ['countChange'],
  })
  export default class extends Vue {
    protected count = 1

    @exampleModule.State('storeExamData')
    protected storeExamData!: boolean

    @exampleModule.Getter('getTestGetterData')
    protected testGetterData!: boolean

    @exampleModule.Action('ActionStoreExamData')
    protected actionStoreExamData: any

    // get isCollapse(): boolean {
    //   return this.sidebarOpend
    // }

    @Prop({
      type: String,
      requited: true,
      default: '你好',
    })
    readonly msg!: string

    created() {}

    mounted() {}

    /**
     * @description 累加事件
     */
    protected handleInsert() {
      this.count++
      this.$emit('countChange', this.count)
    }

    /**
     * @description 操作变更 store 值
     */
    handleChangeStoreValue() {
      const _this = this
      _this.actionStoreExamData(!this.storeExamData)
    }
  }
</script>
