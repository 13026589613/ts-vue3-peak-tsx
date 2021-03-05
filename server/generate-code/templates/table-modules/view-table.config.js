/**
 * @description 生产表格的配置文件 config.js
 * @author PP
 */
const utils = require('../../common/utils')

exports.template = (tableEntity, operateConstructor) => {
  const baseTemplate = `import {
 TableList, FilterFormList, Operate, TableBtnObjects
} from '@/config/interface'

/**
 * @description 渲染操作栏目
 */
const renderOperate = (_this: any): Operate[] => [
  {
    key: 'btn-edit',
    rowKey: '${tableEntity.pk.lowerColumnName}',
    color: 'org',
    text: '编辑',
    roles: true,
    function: _this.mixinTableOperateColButton, // 回调函数
    functionName: 'mixinTableOperateColButton', // 回调函数名称
    isBus: false, // 开启总线标示
    APIModules: { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.init${
    tableEntity.upperTableName
  }InfoByParams },
    useTableCellData: false, // 「编辑/查看」使用表格数据
    callback: () => {
      // console.log('行内按钮执行完成后回调，修改请求操作执行完成')
    },
  },
  {
    key: 'btn-delete',
    rowKey: '${tableEntity.pk.lowerColumnName}',
    color: 'red',
    text: '删除',
    roles: true,
    confirm: true,
    msg: window.ConstData.TIP_MSG.DELETE_CONFIRM_TIP,
    confirmContent: window.ConstData.TIP_MSG.DELETE_CONFIRM_CONTENT,
    popConfirm: true, // 启动按钮层弹窗提示，pop 和 confirm 冲突，优先执行 confirm
    function: _this.mixinTableDeleteColButton, // 回调函数
    functionName: 'mixinTableDeleteColButton', // 回调函数名称
    isBus: false, // 开启总线标示
    APIModules: { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.delete${
    tableEntity.upperTableName
  }ByParams },
    callback: () => {
      // console.log('行内按钮执行完成后回调，删除操作执行完成')
    },
  },
  {
    key: 'btn-see',
    rowKey: '${tableEntity.pk.lowerColumnName}',
    color: 'blue',
    text: '查看',
    roles: true,
    function: _this.mixinTableOperateColButton, // 回调函数
    functionName: 'mixinTableOperateColButton', // 回调函数名称
    isBus: false, // 开启总线标示
    APIModules: { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.init${
    tableEntity.upperTableName
  }InfoByParams },
    useTableCellData: true, // 「编辑/查看」使用表格数据
    callback: () => {
      // console.log('行内按钮执行完成后回调，查看操作执行完成')
    },
  },
]

/**
 * @description 表格基础返回参数处理配置
 */
const responseParams = Object.assign(
  { ...window.TABLE_BASE_RESPONSE_PARAMS },
  {
    code: 'status',
    codeOK: true,
    message: 'msg',
    data: 'result',
    result: 'page.list',
    total: 'page.totalCount',
  }
)

/**
 * @description 表格按钮集群列
 */
const renderButtonArrays = (_this: any): TableBtnObjects => ({
  insert: Object.assign(
    { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.insert${tableEntity.upperTableName}Form },
    {
      show: true, // 显示/掩藏状态
      title: '新增',
      name: 'insert',
    },
    {
      filterParams: {},
      function: _this.mixinFormPageControl, // 回调函数
    }
  ),
  update: Object.assign(
    { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.modify${tableEntity.upperTableName}Form },
    {
      show: true, // 显示/掩藏状态
      title: '编辑',
      name: 'update',
    },
    {
      filterParams: {},
      function: _this.mixinFormOperateForm, // 按钮点击的回调函数
      callback: (res: any) => {}, // 数据绑定回调函数
      operateFetchAPI: { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.init${
    tableEntity.upperTableName
  }InfoByParams },
    }
  ),
  delete: Object.assign(
    { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.delete${tableEntity.upperTableName}ByParams },
    {
      show: true, // 显示/掩藏状态
      title: '删除',
      name: 'delete',
    },
    {
      filterParams: {},
      function: _this.mixinSelectRowsToDelete, // 回调函数
      callback: (res: any) => {}, // 删除操作完成回调函数
      operateFetchAPI: { ..._this.$Api.apiModulesList.${tableEntity.lowerTableName}.delete${
    tableEntity.upperTableName
  }ByParams },
    }
  ),
})

/**
 * @description 渲染 Table-columns 属性
 */
const renderColumns = (_this: any): TableList[] => [
  ${renderColumns(operateConstructor)}
]

/**
 * @description 表格筛选条件对象
 */
const renderFilter = (_this: any): FilterFormList[] => [
  {
    key: '${tableEntity.columnsArray[1].lowerColumnName}',
    label: '${tableEntity.columnsArray[1].columnComment}',
    type: 'input',
    placeholder: '查询${tableEntity.columnsArray[1].columnComment}',
  },
]

export {
 renderColumns, renderOperate, renderFilter, responseParams, renderButtonArrays
}`
  return baseTemplate
}

/**
 * @description 渲染列配置对象
 * @param {*} tableEntity
 */
function renderColumns(operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  // 组成集合字段，包含勾选的表全部字段属性
  columnsArray.map((item, index) => {
    const renderDate =
      item.attrType === 'Date[]' || item.attrType === 'Date'
        ? `customRender: _this.render${item.upperColumnName}Col,`
        : ''
    renderColumns += `{
    title: '${item.columnComment}',
    dataIndex: '${item.lowerColumnName}',
    width: 200,
    ${renderDate}
  },\n`
  })

  // 扩充列防治表格变形
  renderColumns += `{
    title: '',
    dataIndex: '-100',
    colSpan: 1,
    width: 0,
    className: 'empty-fill-td',
  },\n`
  return renderColumns
}
