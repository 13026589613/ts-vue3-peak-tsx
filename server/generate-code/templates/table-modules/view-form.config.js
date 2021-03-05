/**
 * 实体对象
 */
const utils = require('../../common/utils')

exports.template = (tableEntity, operateConstructor) => {
  const baseTemplate = `/**
 * @description 设定Entity 实例对象配置
 */
import { ${tableEntity.upperTableName}Entity } from '@/interface/${tableEntity.tableName}.interface.ts'
${initValidatorItems(operateConstructor)}

/**
 * @description Entity 实例对象
 */
class ${tableEntity.upperTableName}EntityClass {
  ${initEntityClass(tableEntity, operateConstructor)}
}

/**
 * @description 创建默认对象
 */
const ${tableEntity.lowerTableName}Entity = (_this: any): ${tableEntity.upperTableName}Entity => ({
  ${initEntityBean(operateConstructor)}
})

/**
 * @description 开放操作对象
 */
const FormEntity = (_this: any): ${tableEntity.upperTableName}Entity => {
  const formEntity: ${tableEntity.upperTableName}Entity = new ${tableEntity.upperTableName}EntityClass(${
    tableEntity.lowerTableName
  }Entity(_this))
  return formEntity
}

/**
 * @description 表单 Form 验证对象
 */
const FormValidateRule: any = {
  ${renderFormValidate(operateConstructor)}
}

/**
 * @description 表单 Form 对象的col 布局位置
 */
const FormItemLayout: any = {
  ${renderFormCol(operateConstructor)}
}

export {
  FormEntity, ${tableEntity.lowerTableName}Entity, FormValidateRule, FormItemLayout
}`
  return baseTemplate
}

/**
 * 正则验证import 引入
 * @param {*} operateConstructor
 */
function initValidatorItems(operateConstructor) {
  const renderImportArray = []
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map(item => {
    // 存在「必填项」且存在「正则验证」，拼接正则验证规则
    if (item.validateType && item.needValidate === 'notNull') {
      item.validateType.map(validateItem => {
        renderImportArray.push(`ant${validateItem}`)
      })
    }
  })
  const renderImportSet = [...new Set(renderImportArray)]
  return renderImportSet.length !== 0 ? `import { ${renderImportSet.join(', ')} } from '@/util/RegexAnt'` : ''
}

/**
 * 表单 Form 对象的col 布局位置
 * @param {*} operateConstructor
 */
function renderFormCol(operateConstructor) {
  let renderColumnsCol = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map((item, index) => {
    renderColumnsCol += `
     ${item.lowerColumnName}: {
      xs: { span: 8, offset: 0 }, // < 576 px
      sm: { span: 8, offset: 0 }, // >= 576 px
      md: { span: 8, offset: 0 }, // >= 768 px
      lg: { span: 8, offset: 0 }, // >= 992 px
      xl: { span: 8, offset: 0 }, // >= 1200 px
      xxl: { span: 8, offset: 0 }, // >= 1600 px
     },\n`
  })
  return renderColumnsCol
}

/**
 * 根据form对象解析构建 validate 验证
 * @param {*} operateConstructor
 */
function renderFormValidate(operateConstructor) {
  let renderValidateColumns = ''
  let renderRules = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map((item, index) => {
    renderRules = item.needValidate === 'notNull' ? `{ required: true, message: '${item.columnComment}为必填项' },` : ''

    // 存在「必填项」且存在「正则验证」，拼接正则验证规则
    if (item.validateType && item.needValidate === 'notNull') {
      item.validateType.map(validateItem => {
        renderRules += `\n{ validator: (rule: any, value: any, callback: Function) => ant${validateItem}(rule, value, callback) },`
      })
    }

    renderValidateColumns += `
     ${item.lowerColumnName}: (_this: any) => ({
      validateFirst: true,
      initialValue: _this.formEntity.${item.lowerColumnName},
      rules: [${renderRules}],
    }),\n`
  })
  return renderValidateColumns
}

/**
 * 对象适配 interface
 * @param {*} operateConstructor
 */
function initEntityBean(operateConstructor) {
  let renderColumns = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map(item => {
    // renderColumns += `${item.lowerColumnName}: undefined, // ${item.columnComment}\n  `
    renderColumns += `${item.lowerColumnName}: ${item.defaultValue}, // ${item.columnComment} ${
      item.attrType === 'Date' || item.attrType === 'Date[]' ? '_this.$moment(new Date())' : ''
    } \n  `
  })
  return `${renderColumns}`
}

/**
 * 对象 Class 配置
 * @param {*} tableEntity
 */
function initEntityClass(tableEntity, operateConstructor) {
  let renderColumns = ''
  // let constructorItem = ''
  let constructorItemValue = ''
  const columnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'columnsArray'))
  columnsArray.map(item => {
    // renderColumns += `${item.lowerColumnName}: ${item.defaultValue || 'undefined'} // ${item.columnComment}\n\n`
    renderColumns += `${item.lowerColumnName}: ${item.attrType} | null | undefined // ${item.columnComment}\n\n`
    // constructorItem += `${item.lowerColumnName}: ${item.attrType} | any, `
    constructorItemValue += `this.${item.lowerColumnName} = ${tableEntity.lowerTableName}Entity.${item.lowerColumnName} // ${item.columnComment}\n`
  })
  renderColumns +=
    `${
      `constructor(${tableEntity.lowerTableName}Entity: ${tableEntity.upperTableName}Entity` + ') {\n'
    }${constructorItemValue}` + '}'
  return `${renderColumns}`
}
