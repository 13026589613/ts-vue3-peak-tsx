// import { Emit } from 'vue-property-decorator'
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'LoginComponent',
})
export default class LoginComponent extends Vue {
  render() {
    return <div>LoginComponent</div>
  }
}
