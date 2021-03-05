/**
 * @description 生产基础表格views
 * @author PP
 */
const utils = require('../../common/utils')
exports.template = (tableEntity, operateConstructor) => `/**
 * @description ${tableEntity.tableComment} - 查询列表界面
 * @author PP
 */
import { Component, Mixins } from 'vue-property-decorator'
import {
 TableList, FilterFormList, Operate, TableFilterParams, TableBtnObjects
} from '@/config/interface' // 接口类
import {
 renderColumns, renderOperate, renderFilter, responseParams, renderButtonArrays
} from './table-config' // 导入表格配置项
import MixinsTableButton from '@/config/mixins/mixins-table-button'
import InfoModel from './info-model' // 导入编辑窗口

import './index.scss' // 导入样式

@Component({
  name: '${tableEntity.upperTableName}Wrapper',
  components: {
    'info-model': InfoModel,
  },
})
export default class ${tableEntity.upperTableName}Wrapper extends Mixins(MixinsTableButton) {
  /**
   * @description table组件参数.包含请求参数与过滤参数，过滤参数分为内部参数和外部参数
   * @param 请求参数 -> url method contentType 3种类型参数
   * @param this.$Api API 中集中管理 -> this.$Api.apiModulesList.$-{model}.$-{API - object}
   */
  tableParams: TableFilterParams = Object.assign(this.$Api.apiModulesList.${tableEntity.lowerTableName}.init${
  tableEntity.upperTableName
}ListData, {
    outParams: {}, // 外部参数 -> 携带性参数
    filterParams: {
      ${tableEntity.columnsArray[1].lowerColumnName}: '',
    }, // 内部参数 -> 过滤表格的查询参数
  })

  showBtnArray: TableBtnObjects = renderButtonArrays(this) // 按钮集群

  filterList: FilterFormList[] = renderFilter(this) // 过滤条件集合

  columnsList: TableList[] = renderColumns(this) // 表格列头

  operateColumns: Operate[] = renderOperate(this) // 行内操作按钮

  operateFormParams: any = {
    title: '${tableEntity.tableComment}信息', // 信息操作Form 窗口标题
    visible: false, // 是否可以操作标示
    modelType: 'insert', // 模态窗口状态
    buttonTitle: null, // 操作按钮title
    operateData: {}, // 编辑的集合
    baseTableRef: 'ref${tableEntity.upperTableName}Table', // 操作对象
  }

  rowKey = '${tableEntity.pk.lowerColumnName}' // 操作数据表主键

  created() {
    // 「总线监听」进行行内按钮的事件响应
    // this.$Bus.$on('mixinTableOperateColButton', (data: any) => {
    //   this.mixinTableOperateColButton(data.key, data.row, data.index)
    // })
  }

  render() {
    return (
      <div class="base-table-wrap ${tableEntity.tableFileName}-wrapper">
        {/* 表格主体 */}
        <ant-filter-table
          bordered={true}
          lisenerSize={true}
          clickOnSelect={false}
          operateWidth={'180px'}
          ref={this.operateFormParams.baseTableRef} // 操作对象
          rowKey={this.rowKey} // 主键，默认‘key’
          scroll={{ x: 'max-content', y: null }} // 触发滚动临界，可传「{}」不启用
          columnsList={this.columnsList} // 原生显示列
          tableParams={this.tableParams} // 表格过滤参数及请求配置
          showBtnArray={this.showBtnArray} // 应用button集合
          filterMapParams={this.tableParams.filterParams} // 过滤表单过滤的字段
          filterNormalList={this.filterList} // 普通过滤集合
          filterHigherList={[]} // 高级过滤集合 this.filterList
          operateColumn={this.operateColumns} // 操作列属性
          serviceData={responseParams} // 服务应用字段
          rowSelection={this.minxinSelectorRowsParams()} // 复选框属性
          on-search={this.emitSearchFormFilter} // 表单查询回调
          on-delete={this.mixinDeleteRowItem} // 删除回调
          on-operate-button={this.mixinTableOperateButton}
          on-init={this.mixinTableInitData}
        />

        {/* 滑层编辑Form */}
        <a-drawer
          getContainer={() => document.querySelector('.${tableEntity.tableFileName}-wrapper')}
          placement={'right'}
          width={window.DRAWER_WINDOWS_WIDTH}
          height={'100%'}
          wrapClassName="table-drawer-wrapper"
          closable={true}
          maskClosable={true}
          title={this.operateFormParams.buttonTitle + this.operateFormParams.title}
          visible={this.operateFormParams.visible}
          on-close={this.mixinFormClosePage}
        >
          {/* form表单内容 */}
          <info-model
            {...{ props: this.operateFormParams }}
            operateType={this.operateFormParams.modelType}
            on-close={this.mixinFormClosePage}
            on-success={(params: any) => this.mixinFormSubmit(params).then(() => this.handleFormSubmitSuccess(params))}
          />
        </a-drawer>
      </div>
    )
  }

  ${renderSpecialColumns(operateConstructor)}

  /**
   * 触发【查询按钮】交互事件
   * @param filterParams 查询表单对象
   */
  emitSearchFormFilter(filterParams: Object) {
    this.tableParams.filterParams = filterParams
    this.$forceUpdate()
  }

  /**
   * @description 样例-表单提交回调
   * @param params 表单提交时的参数
   */
  handleFormSubmitSuccess(params: any) {
    console.log('保存信息回调函数')
  }
}`

/**
 * @description 渲染列的 render 配置对象
 * @param {*} tableEntity
 */
function renderSpecialColumns(operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map((item, index) => {
    if (item.attrType === 'Date[]' || item.attrType === 'Date') {
      renderColumns += `
        /**
          * 「${item.columnComment}」字段转换
          * @param text -> column 值
          */
        render${item.upperColumnName}Col(text: any) {
          const date: string = this.$tools.date.formateTZDateToDate(text)
          return <span>{this.$moment(new Date(date)).format('YYYY-MM-DD')}</span>
        }\n
      `
    }
  })
  return renderColumns
}
