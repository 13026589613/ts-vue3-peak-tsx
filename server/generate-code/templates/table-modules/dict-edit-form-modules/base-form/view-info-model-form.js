/**
 * @description 要素模版->生产表格编辑下的表单对象文件
 * @author PP
 */
const utils = require('../../../../common/utils')
const disabledString = "disabled={this.operateType === 'see'}"

exports.template = (tableEntity, operateConstructor) => {
  const formColumnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))

  return `
/**
 * @description ${tableEntity.tableComment} - 要素表格表单 -> 编辑table+表单
 */
import { Component, Mixins } from 'vue-property-decorator'
import { TableFilterParams } from '@/config/interface' // 接口类
import MixinsEditTableForm from '@/config/mixins/minxins-form-edit-table'

@Component({})
export default class ${tableEntity.upperTableName}EditTableForm extends Mixins(MixinsEditTableForm) {
  // 所有表格表单的集合数据，insert模式通过字典获取数据格式自动生产基础的操作对象。编辑时将查询的数据集合合并到基础的操作对象中。
  // TO-DO -> API需手动配置修改
  tableParams: TableFilterParams = Object.assign(
    {
      ...(this.operateType !== 'insert'
        ? this.$Api.apiModulesList.${tableEntity.remark1}.init${tableEntity.remark2}Sublist
        : { url: null }),
    },
    {
      filterParams: {
        id: this.operateData.id, // 表格归属的数据信息的ID
      },
    }
  )

  tableRefs = 'editFormTable' // 表格操作的ref对象

  dictCategory = '${tableEntity.tableName}' // 要素字典category标示，通过标示查询对应的集合数据

  ${renderElementCodeObject(formColumnsArray)}

  // 表格数据接收服务的参数结果解析对象
  serviceData = {
    code: 'status',
    codeOK: true,
    message: 'msg',
    data: 'result',
    result: 'data.subList',
    total: null,
  }

  mounted() {
    this.initTableConstruction()
  }

  /**
   * @description 渲染编辑table表单
   */
  render() {
    return (
      <div>
        {this.tableConstruction.length > 0 ? (
          <ant-edit-form-table
            ref={this.tableRefs}
            {...{
              props: {
                serviceData: this.serviceData, // 服务解析对象
                // editFormTableDataSource: [...this.editFormTableDataSource], // 表格原始数据，用于先请求后加载表格模式。可以加载表格前先处理好表格数据内容格式
                dictArrayList: [...this.dictArrayList], // 需要加载列表字典标示字段的集合
                tableConstruction: [...this.tableConstruction], // 初始化的基础表格表单数据结构
                maxColumnsSize: this.maxColumnsSize, // 最大列合并的标示数据
                tableParams: this.tableParams, // 服务请求配置对象
                dictKeys: this.dictKeys, // 用于解析接收字典列表结合数据的对象集合。checkboxListData存储对象
                visible: this.visible, // 操作开关
                operateType: this.operateType, // 操作类型
                operateData: this.operateData, // 主表格列表的操作行数据
              },
            }}
          ></ant-edit-form-table>
        ) : null}
      </div>
    )
  }

  /**
   * @description 表格数据强制更新接口
   * @tableDataInfo tableListData 表格新数据
   */
  $UpdateRenderData(tableListData: any) {
    const refEditFormTable: any = this.$refs[this.tableRefs]
    refEditFormTable.$children[0].$UpdateRenderData({
      tableDataInfo: {
        tableListData: [],
      },
    })
  }
}
`
}

/**
 * @description 渲染加载字典数据列表接受对象
 */
function renderElementCodeObject(formColumnsArray) {
  let renderColumns = ''
  let renderDictsArrayKeys = ''

  formColumnsArray.map(item => {
    if (item.valuesArray && item.objectKey && item.objectKey.type === '2') {
      const category = item.objectKey.category
      renderDictsArrayKeys += `'${category}',`
    }
  })

  renderColumns += `dictKeys: Array<string> = [${renderDictsArrayKeys}] // 页面包含查询字典项的集合`

  return renderColumns
}

/**
 * @description 渲染加载字典数据
 */
function renderElementCodeFunction(formColumnsArray) {
  let renderColumns = ''
  renderColumns += `
/**
 * @description 根据参数加载页面全部的数据字典项，分组分配至对象存储
 * @param value KeyboardEvent
 */
initElementCode() {
  this.$tools.dictServe.loadBaseElementCode(this, this.dictKeys.join(',')).then((res: any) => {
    if (res) {
      res.map((item: any, index: number) => {
        const keyInfo = item.saveType
        this.dictInfo[\`\${keyInfo}DictList\`].push(item)
      })
    }
  })
}\n`
  return renderColumns
}
