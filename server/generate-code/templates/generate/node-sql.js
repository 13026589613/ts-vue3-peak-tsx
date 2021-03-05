// api 接口模版
exports.template = tableEntity => {
  const sqlTableName = `\`${tableEntity.tableName}\``
  const callbackMsg = 'message'
  const callbackError = 'status: 500, data: res'
  const callbackSuccess = 'status: 200, data: rows'
  const callbackListSuccess = 'status: 200, data: { rows, total: total[0].totalCount }'

  const searchParams = tableEntity.columnsArray[1].lowerColumnName
  const searchParamsKey = tableEntity.columnsArray[1].lowerAttrName
  const primaryColumnsKey = tableEntity.columnsArray[0].lowerAttrName
  const primaryKey = tableEntity.columnsArray[0].lowerColumnName

  return `
  /**
   * @description ${tableEntity.tableComment}表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取${tableEntity.tableComment}信息列表
   */
  exports.init${tableEntity.upperTableName}ListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select ${renderSQLSearchNamesCol(
      tableEntity
    )} from ${sqlTableName} where ${searchParamsKey} like ? limit ? offset ?', ${renderParams(
    searchParams
  )}, (error, rows) => {
      if (error) {
        res.json({ ${callbackMsg}: '查询列表数据时异常(获取列表数据项)', ${callbackError} })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from ${sqlTableName} where ${searchParamsKey} like ?', ${renderListCountParams(
    searchParams
  )},
          (totalError, total) => {
            if (totalError) {
              res.json({ ${callbackMsg}: '查询列表数据时异常(获取总数量)', ${callbackError} })
            } else {
              res.json({ ${callbackMsg}: '成功获取列表数据', ${callbackListSuccess} })
            }
            res.end('is over')
          }
        )
      }
    })
  }

  /**
   * 查询信息 - 根据参数获取${tableEntity.tableComment}信息
   */
  exports.get${tableEntity.upperTableName} = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select ${renderSQLSearchNamesCol(
      tableEntity
    )} from ${sqlTableName} where ${primaryColumnsKey} = ?', [urlParams.query.${primaryKey}], (error, rows) => {
      if (error) {
        res.json({ ${callbackMsg}: '查询${tableEntity.tableComment}信息异常', ${callbackError} })
      } else {
        res.json({ ${callbackMsg}: '成功查询${tableEntity.tableComment}信息', ${callbackSuccess} })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存${tableEntity.tableComment}信息
   */
  exports.update${tableEntity.upperTableName} = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '${sqlTableName}',
      ${renderOperateSQLEntity(tableEntity, 'update', primaryKey)},
      { ${primaryColumnsKey}: params.${primaryKey} },
      (error, rows) => {
        if (error) {
          res.json({ ${callbackMsg}: '操作异常，编辑信息失败', ${callbackError} })
        } else {
          res.json({ ${callbackMsg}: '操作成功，已编辑保存${tableEntity.tableComment}', ${callbackSuccess} })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存${tableEntity.tableComment}信息
   */
  exports.insert${tableEntity.upperTableName} = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '${sqlTableName}',
      ${renderOperateSQLEntity(tableEntity, 'insert', primaryKey)},
      (error, rows) => {
        if (error) {
          res.json({ ${callbackMsg}: '操作异常，保存信息失败', ${callbackError} })
        } else {
          res.json({ ${callbackMsg}: '操作成功，已新增保存${tableEntity.tableComment}', ${callbackSuccess} })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除${tableEntity.tableComment}信息
   */
  exports.delete${tableEntity.upperTableName} = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from ${sqlTableName} where ${primaryColumnsKey} in (?)', [params.${primaryKey}], (error, rows) => {
    MySQL.SQLDelete('${sqlTableName}', { ${primaryColumnsKey}: params.${primaryKey} }, (error, rows) => {
      if (error) {
        res.json({ ${callbackMsg}: '操作异常，删除信息时失败', ${callbackError} })
      } else {
        res.json({ ${callbackMsg}: '操作成功，成功删除信息', ${callbackSuccess} })
      }
      res.end('is over')
    })
  }

  /**
   * @description  ${tableEntity.tableComment} 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const Route${tableEntity.upperTableName} = require('./modules/${tableEntity.lowerTableName}')
  // app.post('/${tableEntity.lowerTableName || 'default'}/init${tableEntity.upperTableName}ListData', Route${
    tableEntity.upperTableName
  }.init${tableEntity.upperTableName}ListData)
  // app.delete('/${tableEntity.lowerTableName || 'default'}/delete${tableEntity.upperTableName}', Route${
    tableEntity.upperTableName
  }.delete${tableEntity.upperTableName})
  // app.get('/${tableEntity.lowerTableName || 'default'}/get${tableEntity.upperTableName}', Route${
    tableEntity.upperTableName
  }.get${tableEntity.upperTableName})
  // app.put('/${tableEntity.lowerTableName || 'default'}/update${tableEntity.upperTableName}', Route${
    tableEntity.upperTableName
  }.update${tableEntity.upperTableName})
  // app.post('/${tableEntity.lowerTableName || 'default'}/insert${tableEntity.upperTableName}', Route${
    tableEntity.upperTableName
  }.insert${tableEntity.upperTableName})
  
  /**
   * @description  ${tableEntity.tableComment} 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const Route${tableEntity.upperTableName} = require('./modules/${tableEntity.lowerTableName}')
  // app.post('/${tableEntity.lowerTableName || 'default'}/getByList', Route${tableEntity.upperTableName}.init${
    tableEntity.upperTableName
  }ListData)
  // app.delete('/${tableEntity.lowerTableName || 'default'}/delete', Route${tableEntity.upperTableName}.delete${
    tableEntity.upperTableName
  })
  // app.get('/${tableEntity.lowerTableName || 'default'}/findById', Route${tableEntity.upperTableName}.get${
    tableEntity.upperTableName
  })
  // app.put('/${tableEntity.lowerTableName || 'default'}/update', Route${tableEntity.upperTableName}.update${
    tableEntity.upperTableName
  })
  // app.post('/${tableEntity.lowerTableName || 'default'}/save', Route${tableEntity.upperTableName}.insert${
    tableEntity.upperTableName
  })
`
}

/**
 * 渲染查询SQL的columns as 转化对象
 */
function renderSQLSearchNamesCol(tableEntity) {
  let renderColumns = ''
  tableEntity.columnsArray.map(item => {
    renderColumns += `${item.lowerAttrName} AS ${item.lowerColumnName}, `
  })
  return renderColumns.slice(0, -2)
}

/**
 * 对象循环创建SQL操作对象 -> insert && update
 * @param {*} tableEntity
 * @param {*} operateType -> insert || update
 */
function renderOperateSQLEntity(tableEntity, operateType, primaryKey) {
  let renderColumns = ''
  tableEntity.columnsArray.map(item => {
    if (operateType === 'update' && item.lowerColumnName === primaryKey) {
      renderColumns += ''
    } else {
      renderColumns += `${item.lowerAttrName}: params.${item.lowerColumnName},\n`
    }
  })
  return `{\n${renderColumns}}`
}

/**
 * 渲染条件查询的参数
 */
function renderParams(searchParams) {
  return `[\`%\${params.${searchParams} || ''}%\`, params.showCount , params.currentPage * params.showCount]`
}

/**
 * 渲染条件查询的参数
 */
function renderListCountParams(searchParams) {
  return `[\`%\${params.${searchParams} || ''}%\`]`
}
