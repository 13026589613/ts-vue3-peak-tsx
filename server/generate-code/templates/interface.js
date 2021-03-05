// interface 模版
const utils = require('../common/utils')

exports.template = (tableEntity, operateConstructor) => `import { MutationTree, ActionTree } from 'vuex'

// ${tableEntity.lowerTableName}.Data 参数类型
export interface ${tableEntity.upperTableName}Data {
  token: string
}

// VUEX ${tableEntity.upperTableName}Store 参数类型
export interface ${tableEntity.upperTableName}Store {
  state: ${tableEntity.upperTableName}State
  actions: ActionTree<${tableEntity.upperTableName}State, any>
  mutations: MutationTree<${tableEntity.upperTableName}State>
}

// VUEX ${tableEntity.upperTableName}State 参数类型
export interface ${tableEntity.upperTableName}State {
  data?: any
}

// 表单操作对象，默认只读取单表对象。默认全部为 ModelType | undefined -> ?
export interface ${tableEntity.upperTableName}Entity {
  ${initEntityBean(operateConstructor)}
}
`
/**
 * 创建form对象interface
 * @param {*} tableEntity
 */
function initEntityBean(operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map((item, index) => {
    renderColumns += `${item.lowerColumnName}?: ${item.attrType} | null // ${item.columnComment}\n  `
  })
  return `${renderColumns}`
}
