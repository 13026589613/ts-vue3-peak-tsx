import { Emit } from 'vue-property-decorator'
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'MainOutComponent',
})
export default class MainOutComponent extends Vue {
  render() {
    return <div>MainOutComponent</div>
  }
}
