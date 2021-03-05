#!/usr/bin/env node
/**
 * @description 生产代码 - 表格 table code
 *              npm run generate -- moduleName=test moduleType=true
 *
 * @param moduleName 文件夹名
 * @param moduleType true 写入外层单独模块 false 写入对应设定文件夹。内容无差异，便于删除文件
 * @author PP
 */
// 建立数据库链接，获取操作表结构

// 基础访问路径
const path = require('path')
const utils = require('./common/utils')
const basePath = path.resolve(__dirname, '../src/') //  ./z-files

// 转化指令参数为对象
const mapParams = { tableParams: ['sys-user-table', 'web_data'] }
process.argv.forEach((val, index, array) => {
  if (index > 1) {
    // console.log(`${index}: ${val}`)
    const valueArray = val.split('=')
    mapParams[valueArray[0]] = valueArray[1]
    // if (mapParams.moduleType) {
    //   basePath = mapParams.moduleType === 'true'
    //       ? `${basePath}/${mapParams.moduleName}`
    //       : `${basePath}/views/${mapParams.moduleName}`
    // }
  }
})

// 首字母大写文件夹
const CapModuleName = utils.toClassName(mapParams.moduleName)
if (!mapParams.moduleName) {
  console.log('文件夹名称不能为空！\n 示例：npm run tep ${CapModuleName}')
  process.exit(0)
}

// 建立数据库链接，获取操作表结构
// const connection = require('./common/mysql.js').exports
initConnection(utils, mapParams.tableParams).then((data) => {
  let tableEntity = require('./generatte/EntityTable') // table-entity

  // 转化table-entity
  tableEntity = Object.assign(tableEntity, data.table)
  tableEntity.lowerTableName = utils.toHumpClassName(tableEntity.tableName.replace(mapParams.moduleName, ''), '-') // 驼峰小写 sysUser
  tableEntity.upperTableName = utils.toClassName(tableEntity.lowerTableName) // 驼峰大写 ModuleName
  tableEntity.fullUpperTableName = utils.toUpperCase(utils.toTableName(tableEntity.lowerTableName)) // 大写 FULL
  tableEntity.tableFileName = utils.toFileName(tableEntity.lowerTableName) // 文件名 file-name

  // 转化columns-entity
  data.columns.map((item, index) => {
    let columnsEntity = require('./generatte/EntityColumn') // columns-entity
    columnsEntity = item
    columnsEntity.lowerColumnName = utils.toHumpClassName(item.columnName) // // 驼峰小写 userName
    columnsEntity.upperColumnName = utils.toClassName(columnsEntity.lowerColumnName) // 驼峰大写 ColumnsName
    columnsEntity.upperAttrName = utils.toUpperCase(item.columnName) // 原生列名称 -> USER_NAME
    columnsEntity.lowerAttrName = utils.toLowerCase(item.columnName) // 原生列名称 -> user_name
    columnsEntity.dataType = item.dataType
    columnsEntity.columnComment = item.columnComment
    columnsEntity.columnKey = utils.toUpperCase(item.columnKey)
    columnsEntity.extra = item.extra

    // 语言转化，varchar 转化 string 等。暂定Any || to-do 修改
    const formatData = utils.initColumnsType(item.dataType)
    columnsEntity.defaultValue = formatData.defaultValue
    columnsEntity.attrType = formatData.type

    // 存储columns 属性到 table entity
    tableEntity.columnsArray.push(columnsEntity)
    if (columnsEntity.columnKey === 'PRI' && tableEntity.pk == null) {
      tableEntity.pk = columnsEntity // 存储主键属性
    }
  })

  if (tableEntity.pk === null) {
    tableEntity.pk = tableEntity.columnsArray[0] // 强制主键存在
  }

  // console.log(`转化完成：\n${tableEntity}`)
  initTemplate(mapParams, tableEntity) // 初始化模版
})

/**
 * @description 查询表结构和表-列内容
 * @param mapParams.prefix 表分割符 默认 _ 下划线
 */
function initConnection(utils, tableParams) {
  const SQLServe = require('./generatte/sql-serve.js') // 建立链接，查询表结构
  return new Promise((resolve, reject) => {
    try {
      SQLServe.operateTableConstructor({}, utils.SQLTable(), tableParams).then((table) => {
        SQLServe.operateTableConstructor({}, utils.SQLColumns(), tableParams).then((columns) => {
          resolve({ table: table[0], columns })
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * @description 模版文件输出
 */
async function initTemplate(mapParams, tableEntity) {
  // const tablePath = mapParams.moduleType === 'true' ? `${basePath}` : `${basePath}/views/${mapParams.moduleName}` // moduleType参数可启用
  // 写死创建路径。不提供其他方式路径，定义为 modulesTableName区分。内含其他模块文件
  // basePath = `${basePath}/${mapParams.moduleName}${tableEntity.upperTableName}`

  const tempPath = '../templates/' // 模版文件相对路径
  const tablePath = `${basePath}/views/modules/${mapParams.moduleName}/${tableEntity.tableFileName}` // moduleType参数可启用
  const operate = require('./common/operate.js').module.constructor(tableEntity, basePath, CapModuleName, tempPath) // 构建文件操作对象
  operate.init().then(async () => {
    // await operate.downLoad('table-modules/view-table.js', 'index', 'tsx', true, tablePath) // table
    // await operate.downLoad('table-modules/view-form.js', 'info-model', 'tsx', true, tablePath) // table-form
    // await operate.downLoad('table-modules/view-index.scss.js', 'index', 'scss', true, tablePath) // index-scss
    // await operate.downLoad('table-modules/view-table.config.js', 'table-config', 'ts', true, tablePath) // table-config
    // await operate.downLoad('table-modules/view-form.config.js', 'table-from-config', 'ts', true, tablePath) // form-config
    // await operate.downLoad('interface.js', tableEntity.tableName, 'interface.ts', true, `${basePath}/interface`) // interface
    // await operate.downLoad('store.js', tableEntity.tableName, 'ts', true, `${basePath}/store/modules`) // store
    // await operate.downLoad('mock.js', tableEntity.lowerTableName, 'ts', true, `${basePath}/mock/service`) // store
    // await operate.downLoad('api.js', `api-${tableEntity.lowerTableName}`, 'ts', false, `${basePath}/api/modules`) // api， 结尾参数传递false

    await operate.downLoad('table-modules/view-form.config.js', 'table-from-config', 'ts', false, tablePath) // form-config
    // await operate.downLoad('interface.js', tableEntity.tableName, 'interface.ts', false, `${basePath}/interface`) // interface
    // await operate.downLoad('mock.js', tableEntity.lowerTableName, 'ts', false, `${basePath}/mock/service`) // store
  })
}
