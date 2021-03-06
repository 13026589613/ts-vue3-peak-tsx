<template>
  <div>
    <h1>ts vue class 文件 组件 </h1>
    props 参数传递: {{ msg }} <br />
    <button @click="handleInsert">Store 点击记录: {{ count }} </button>

    <!-- store 中 值 -->
    <br />
    {{ `store中的值展示：${this.showSpin}` }}

    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRaw, onMounted } from 'vue'
  import { Vue, Options, prop } from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const exampleModule = namespace('baseStore')

  @Options({
    name: 'HelloWorld',
    components: {},
    emits: ['countChange'],
  })
  export default class extends Vue {
    @exampleModule.State('tokenState')
    showSpin!: boolean

    @exampleModule.Action('InitLoginUserInfo')
    actionInitLoginUserInfo!: (arg: string) => void

    get isCollapse(): boolean {
      return this.sidebarOpend
    }

    @Prop({
      type: String,
      requited: true,
      default: '你好',
    })
    readonly msg!: string

    mounted = onMounted(() => {
      // this.actionInitLoginUserInfo('')
    })

    protected count = 1
    protected handleInsert = () => {
      this.count++
      this.$emit('countChange', this.count)
    }
  }
</script>
