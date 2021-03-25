import { onMounted, ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'

@Options({
  name: 'UserComponent',
})
export default class UserComponent extends Vue {
  data: any = ref('UserComponent')
  mounted = onMounted(() => {})
  render() {
    return <div>{this.data}</div>
  }
}
