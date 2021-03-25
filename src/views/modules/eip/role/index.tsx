import { onMounted, ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'

@Options({
  name: 'RoleComponent',
})
export default class RoleComponent extends Vue {
  data: any = ref('RoleComponent')
  mounted = onMounted(() => {})
  render() {
    return <div>{this.data}</div>
  }
}
