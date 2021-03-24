/**
 * @description 固定的系统配置按钮
 */
import { Vue } from 'vue-class-component'
import './index.scss'

export default class SettingWrapper extends Vue {
  render() {
    return (
      <section class='sys-setting-wrapper'>
        <section class={['sys-setting', 'sys-setting-inner']}>
          <a-icon type='setting' />
        </section>
      </section>
    )
  }
}
