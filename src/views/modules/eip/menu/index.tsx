import { onMounted, ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'

@Options({
  name: 'MenuComponent',
})
export default class MenuComponent extends Vue {
  data: any = ref('MenuComponent')
  mounted = onMounted(() => {})
  render() {
    return <div>{this.data}</div>
  }
}
