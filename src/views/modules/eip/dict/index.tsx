import { onMounted, ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'

@Options({
  name: 'DictComponent',
})
export default class DictComponent extends Vue {
  data: any = ref('DictComponent')
  mounted = onMounted(() => {})
  render() {
    return <div>{this.data}</div>
  }
}
