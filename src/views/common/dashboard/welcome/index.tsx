/**
 * @description 欢迎欢迎。tsx 使用注解方式的写法
 */
// import { Emit } from 'vue-property-decorator'
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { useRoute, useRouter } from 'vue-router'
import axios, { AxiosPromise, AxiosInstance } from 'axios'
import router from '@/router'

import HelloWord from '@/views/components/hello-word.vue'
import HelloWordTs from '@/views/components/hello-word-ts.vue'
import HelloWordTsClass from '@/views/components/hello-word-ts-class.vue'
import HelloWordTsx from '@/views/components/hello-word-tsx'
import HelloWordClassTsx from '@/views/components/hello-word-class-tsx'
import './index.scss'

@Options({
  name: 'WelcomeComponent',
  components: {
    HelloWord,
    HelloWordTs,
    HelloWordTsClass,
    HelloWordTsx,
    HelloWordClassTsx,
  },
  emits: ['countChange'],
})
export default class WelcomeComponent extends Vue {
  mockListData: any[] = [] // mock-list
  mockAxiosListData: any[] = [] // mock-axios-list
  dataValue: string | null = '普通路由跳转' // 声明一个data
  dataList: string[] = ['1', '2', '10'] // 声明一个 数组集合 data
  countData: number = 0 // 响应组件反馈的值

  currentInstance: any = getCurrentInstance() as any // vue 当前线程对象

  vueRouter = useRouter() // router 操作对象

  /**
   * @description 初始化加载
   */
  moment: any = onMounted(() => {
    console.log('初始化加载=--= on-mounted =-= 获取mock 数据 ------- ')
    this.handleInitMockListData()
  })

  /**
   * @description 渲染界面主体内容
   */
  render() {
    return (
      <div class='example-wrapper'>
        <h3>1、路由跳转</h3>
        <div>
          <span class='example-content' onClick={() => this.handleRouterLink()}>
            {this.dataValue}
          </span>

          <span class='example-content' onClick={() => this.handleRouterLink('params')}>
            params 传参数
          </span>

          <span class='example-content' onClick={() => this.handleRouterLink('query')}>
            query 传参数
          </span>
        </div>

        {/* 遍历循环事例 */}
        <h3>2、循环遍历展示</h3>
        {this.dataList?.map((item: string, index: number) => (
          <div class='example-content'>
            <span>值：{item}</span>
            <span>索引：{item}</span>
            <br />
          </div>
        ))}

        {/* 遍历循环事例 */}
        <h3>3、使用方法 render 渲染内容</h3>
        {this.dataList?.map((item: string, index: number) => this.renderHtml(item, index))}

        {/* 组件展示 */}
        <h3>4、不同类型文件的各类组件间参数传输、store、emit、props、slots等操作展示</h3>
        <div class='component-wrapper'>
          {/* 普通 vue 文件组件 */}
          <hello-word msg={'msg-props'}></hello-word>

          {/* ts-vue 文件组件 */}
          <hello-word-ts msg={'ts-msg-props'} onCountChange={this.emitCountChange}>
            <p>ts-vue 组件 事件反馈值 ---- {this.countData}</p>
          </hello-word-ts>

          {/* ts-vue-class 文件组件 */}
          <hello-word-ts-class msg={'ts-msg-props-class'} onCountChange={this.emitCountChange}>
            <p> ts-vue-class 组件 事件反馈值 ---- {this.countData}</p>
          </hello-word-ts-class>

          {/* tsx 文件组件 */}
          <hello-word-tsx
            msg={'ts-msg-props'}
            onCountChange={this.emitCountChange}
            v-slots={{
              slotName: () => {
                return <p>tsx - class组件 事件反馈值 ---- {this.countData}</p>
              },
            }}
          ></hello-word-tsx>

          {/* tsx - class 注解模式组件 */}
          <hello-word-class-tsx
            propsWord={'propsWord参数传递'}
            msg={'tsx - class -msg-props'}
            onCountChange={this.emitCountChange}
            v-slots={{
              slotName: () => {
                return <p>tsx - class组件 事件反馈值 ---- {this.countData}</p>
              },
            }}
          ></hello-word-class-tsx>
        </div>

        <h3>5、服务MOCK请求样例</h3>
        {this.mockListData.length > 0
          ? this.mockListData?.map((item: any, index: number) => (
              <div class='example-content'>
                <span>category：{item.category}</span>&nbsp;&nbsp;
                <span>codeName：{item.codeName}</span>&nbsp;&nbsp;
                <span>codeRemark：{item.codeRemark}</span>
                <br />
              </div>
            ))
          : null}

        <h3>6、AXIOS请求 - 服务MOCK请求样例</h3>
        {this.mockAxiosListData.length > 0
          ? this.mockAxiosListData?.map((item: any, index: number) => (
              <div class='example-content'>
                <span>category：{item.category}</span>&nbsp;&nbsp;
                <span>codeName：{item.codeName}</span>&nbsp;&nbsp;
                <span>codeRemark：{item.codeRemark}</span>
                <br />
              </div>
            ))
          : null}
      </div>
    )
  }

  /**
   * @description 渲染html 内容
   */
  renderHtml(item: string, index: number) {
    return (
      <div onClick={() => this.handleTargetItem(item)} class='example-content'>
        <span>值：{item}</span>
        <span>索引：{item}</span>
        <br />
      </div>
    )
  }

  /**
   * @description 路由跳转演示
   *              几种传参和跳转调用方式
   */
  handleRouterLink = (type: string = 'normal') => {
    if (type === 'normal') {
      this.currentInstance.ctx.$router.push({ name: 'Workbench' })
    }

    if (type === 'params') {
      router.push({ name: 'Workbench', params: { myParams: 'myParams' } })
    }

    if (type === 'query') {
      this.vueRouter.replace({ name: 'Workbench', query: { myQueryParams: 'myQueryParams' } })
    }
  }

  /**
   * @description 触发Item的点击事件
   * @param item
   */
  handleTargetItem = (item: string) => {
    console.log(`点击行数据 - 获取值${item}`)
  }

  /**
   * @description 组件变更
   */
  emitCountChange(value: number) {
    this.countData = value
    console.log(`响应组件反馈的值--${value}`)
  }

  /**
   * @description 演示获取mock 基础list 集合数据
   *              get 与 post 与mock 的服务配置需要一致
   */
  handleInitMockListData() {
    // mock axios源对象 请求
    // get 方式
    // axios.get('/service/initExampleList', { params: { delFlag: 1 } }).then(data => {
    //   console.log(data)
    // })
    // post 方式
    axios
      .post('/service/initExampleList', { data: { delFlag: 2 } })
      .then(res => res.data)
      .then(data => {
        if (data.code === 200) {
          this.mockListData = data.result.list
        } else {
          console.log('请求时候数据异常或者没有数据集合')
        }
      })

    // 通过封装axios 对象获取数据
    this.currentInstance.ctx.$ModuleApis.demo
      .initExampleList({
        data: {
          delFlag: 2,
        },
      })
      .then((res: any) => {
        this.mockAxiosListData = res.data.list
      })
  }
}
