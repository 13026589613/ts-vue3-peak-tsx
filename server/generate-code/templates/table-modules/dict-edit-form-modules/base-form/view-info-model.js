/**
 * @description 要素模版->生产表单引导页->步骤控制器
 * @author PP
 */
const utils = require('../../../../common/utils')
exports.template = (tableEntity, operateConstructor) => {
  const formColumnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  return `
/**
 * @description ${tableEntity.tableComment}-表单步骤引导页-步骤控制器
 */
import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import StepControl from '@/views/modules/components/stepControl/index'
import InfoForm from './info-model-form'
import CommonFormBaseInfoModal from '@/views/modules/components/baseForm/common-form-base'
import MixinsFormStep from '@/config/mixins/minxins-form-step'

@Component({
  components: {
    StepControl,
    InfoDataForm: InfoForm,
    baseForm: CommonFormBaseInfoModal,
  },
})
export default class ${tableEntity.upperTableName}InfoModal extends Mixins(MixinsFormStep) {
  // 界面归属数据类型,根据字典写死对象。归属菜单对应字典值。「设备管理：f」
  pageType: any = { name: '归属菜单类型(设备管理)', value: 'f' }

  // 步骤对象集合
  stepArray: Array<any> = [
    {
      title: '基础信息',
      description: '基础信息',
      ref: 'refBaseForm',
      dataInfo: 'baseCommonForm',
    },
    {
      title: '要素信息',
      description: '要素信息',
      ref: 'refInfoForm',
      dataInfo: 'editTableForm',
    },
  ]

  // 步骤操作的表单集合，根据步骤对象排序存储
  stepDataInfo: any = {
    baseCommonForm: null, // 基础公用表单对象存储
    editTableForm: null, // 编辑表单对象 formEntityArray / editTableData
  }

  render() {
    if (!this.showContainer) {
      return <div></div>
    }

    return (
      <div class="step-content-wrapper">
        <a-steps current={this.stepCurrent} class="form-step-wrapper">
          {this.stepArray.map((item: any, index: number) => (
            <a-step on-click={() => this.handleChooseStep(index)} title={item.title} description={item.description} />
          ))}
        </a-steps>

        {/* 对应操作栏目 */}
        <div class="config-wrapper mar-top-10">
          <div class={this.stepCurrent === 0 ? 'block-class' : 'hide-class'}>
            <base-form
              ref="refBaseForm"
              {...{
                props: {
                  pageType: this.pageType,
                  visible: this.visible,
                  operateType: this.operateType,
                  operateData: this.operateData,
                },
              }}
              on-connect-success={this.handleNext}
            />
          </div>

          <div class={this.stepCurrent === 1 ? 'block-class' : 'hide-class'}>
            <info-data-form
              ref="refInfoForm"
              {...{
                props: {
                  title: this.title,
                  visible: this.visible,
                  operateType: this.operateType,
                  operateData: this.operateData,
                },
              }}
            ></info-data-form>
          </div>
        </div>

        {/* 步骤控制器下方操作按钮 */}
        <step-control
          stepCurrent={this.stepCurrent}
          stepArrayInfo={this.stepArray}
          on-next={this.handleNext}
          on-prev={this.handlePrev}
          on-reset-operate={this.handelResetInfo}
          on-commit-operate={() => this.handelCommitInfo().then((res: any) => this.handelCommitData(res))}
        ></step-control>
      </div>
    )
  }

  /**
   * @description 保存信息交互后台服务
   * @param isCanCommit true/false -> true时可提交表单-> 获取step步骤的操作数据集合「stepDataInfo对象」
   */
  handelCommitData(isCanCommit: boolean) {
    if (isCanCommit) {
      // 构建后台服务的对象参数。其中subList和id根据后台对象变更调整
      let dataParams = {
        subList: [...this.stepDataInfo.editTableForm.editTableData],
        ...this.stepDataInfo.baseCommonForm,
        id: this.operateData.id,
      }

      // 发起存储服务请求。 通过表格列表配置的按钮API对象获取对应的操作API对象
      this.$Api
        ._request({
          url: this.operateAPI.url,
          method: this.operateAPI.method,
          contentType: this.operateAPI.contentType,
          headers: this.operateAPI.headers,
          data: dataParams,
        })
        .then((res: any) => {
          if (res.code === window.CROSS_CODE) {
            this.$emit('success', dataParams)
          }
        })
    }
  }
}
`
}
