/**
 * @description logo组件
 * @author PP
 */
import { Prop } from 'vue-property-decorator'
import { Options, Vue } from 'vue-class-component'
import './logo.scss'

@Options({
  name: 'Logo',
})
export default class Logo extends Vue {
  @Prop({ default: () => window.SYS_NAME }) private title?: string

  @Prop({ default: require('@/assets/img/logo.png') }) private logoImage?: string

  render() {
    let titleArray = (this.title || '').split('/')
    return (
      <div class='side-logo'>
        <router-link to={"{name:'dashboard'}"}>
          <img src={this.logoImage} />

          <ul>{titleArray.map((item: any) => (item ? <li>{item}</li> : ''))}</ul>
        </router-link>
      </div>
    )
  }
}
