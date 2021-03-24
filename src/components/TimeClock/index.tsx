/**
 * @description 时间计时
 * @author PP
 */
import { onMounted, onBeforeUnmount } from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import { Vue, Options } from 'vue-class-component'
import toolsUtil from '@/utils/tools/ToolsUtil'
@Options({
  name: 'TimeClock',
})
export default class TimeClock extends Vue {
  nowTime: any = toolsUtil.date.formatDateToWeekend(new Date())

  timeInterval: any = null // 轮播时间

  @Prop({ default: true }) private visable?: boolean // 控制显示 \ 隐藏

  @Watch('visable')
  watchVisable(value: boolean) {
    value ? this.handleIntervalTime() : this.handleClearInterVal()
  }

  moment: any = onMounted(() => {
    console.log('object')
    this.handleIntervalTime()
  })

  unmount = onBeforeUnmount(() => {
    this.handleClearInterVal()
  })

  /**
   * 关闭时间钟表
   */
  handleClearInterVal() {
    this.timeInterval ? clearInterval(this.timeInterval) : ''
  }

  /**
   * 开启时间钟表
   */
  handleIntervalTime() {
    this.handleClearInterVal()
    this.timeInterval = setInterval(() => {
      this.nowTime = toolsUtil.date.formatDateToWeekend(new Date())
    }, 1000)
  }

  render() {
    return (
      <div style='margin-top: 10px;' data-name='time-clock'>
        {this.visable ? this.renderTime() : ''}
      </div>
    )
  }

  renderTime() {
    return (
      <section>
        <section>今日{this.nowTime.WEEK}</section>
        <section>
          {this.nowTime.YMD}&nbsp;{this.nowTime.TIME}
        </section>
      </section>
    )
  }
}
