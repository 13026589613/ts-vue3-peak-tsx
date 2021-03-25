import { onMounted, ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'

@Options({
  name: 'OrganComponent',
})
export default class OrganComponent extends Vue {
  data: any = ref('OrganComponent')
  mounted = onMounted(() => {})
  render() {
    return <div>{this.data}</div>
  }
}
