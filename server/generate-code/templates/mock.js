/**
 * @description mock
 * @author PP
 */
exports.template = tableEntity => `/**
 * @description ${tableEntity.tableComment} MOCK
 * @author PP
 */
const Mock = require('mockjs2')
const { getQueryParameters, getBody, builder } = require('@mock/utils.ts')

/**
 * @description 获取${tableEntity.tableComment}列表数据
 * @params username ${tableEntity.tableComment}名
 */
let list${tableEntity.upperTableName}: any = []
const load${tableEntity.upperTableName}ListInfo = (params: any) => {
  list${tableEntity.upperTableName} = []
  const queryParams = getBody(params)

  for (let index = 0; index < 99; index++) {
    list${tableEntity.upperTableName}.push({
      ${initListColumns(tableEntity)}
    })
  }

  const { data } = queryParams // 查询参数位置
  const ${tableEntity.lowerTableName} = list${
  tableEntity.upperTableName
}.filter((item: any) => (data ? item.data.indexOf(data) !== -1 : item))
  if (${tableEntity.lowerTableName} && ${tableEntity.lowerTableName}.length > 0) {
    return builder(
      {
        list: ${tableEntity.lowerTableName},
      },
      '成功获取 ${tableEntity.tableComment} list 的列表数据信息',
      200
    )
  }
  return builder(queryParams, '未获取到相关数据', 200)
}

Mock.mock(/\\/service\\/init${tableEntity.upperTableName}ListData/, 'post', load${tableEntity.upperTableName}ListInfo)
export default Mock
`
function initListColumns(tableEntity) {
  let renderColumns = ''
  tableEntity.columnsArray.map((item, index) => {
    item.columnKey !== 'PRI'
      ? (renderColumns += `${item.lowerColumnName}: '${item.columnComment}' + index, // ${item.columnComment}\n      `)
      : (renderColumns += `${item.lowerColumnName}: Mock.mock('@guid'), // ${item.columnComment}\n      `)
  })
  return `${renderColumns}`
}
