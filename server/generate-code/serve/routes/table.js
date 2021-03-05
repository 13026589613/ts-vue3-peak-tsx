/**
 * @description 数据表生产
 * @author PP
 */
const MySQL = require('../../common/mysql.js')
const utils = require('../../common/utils')

/**
 * @description 获取全部的数据表的组成结构
 */
exports.initTableInfo = (req, res, next) => {
  const params = req.body
  MySQL.SQLSelect(
    utils.SQLAllTable(),
    [params.database, `%${params.tableName || ''}%`, `%${params.tableName || ''}%`],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询异常', status: 500, data: rows })
      } else {
        res.json({ message: '查询成功', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * @description 获取表所有列的组合结构
 */
exports.initTableColumnsConstruct = (req, res, next) => {
  const params = req.body

  MySQL.SQLSelect(
    utils.SQLColumns(),
    [...params.tableParams, `%${params.columnName || ''}%`, `%${params.columnName || ''}%`],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询异常', status: 500, data: res })
      } else {
        res.json({ message: '查询成功', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * @description 根据沟通和配置项目生产代码
 * @param 参数说明
 */
exports.changeDataSource = (req, res, next) => {
  try {
    /**
     * @param host 主机地址 127.0.0.1
     * @param port 数据库端口号 3306
     * @param user 数据库访问账号 root
     * @param password 数据库访问密码 123456
     * @param database 要访问的数据库 web_data
     * @param charset 字符编码 ( 必须大写 ), 默认 UTF8_GENERAL_CI
     */
    const params = req.body
    const mysqlDB = require('../../common/mysql')
    mysqlDB.connect(params).then(data => {
      if (data.status) {
        const productTemp = require('../product-temp.js')
        productTemp.initSQLConnectionConfTemplate(params).then(data => {
          res.json({ message: data.message, status: data.status ? 200 : 500, data: data.status })
        })
        // res.json({ message: '数据源设定成功', status: 200, data: true })
      } else {
        res.json({ message: '数据源配置时异常', status: 500, data: false })
      }
    })
  } catch (e) {
    console.log(' -------------------------- 数据库连接时异常 -------------------------- ')
    console.log(e)
    res.json({ message: '数据源配置时异常', status: 500, data: false })
  }
}

/**
 * @description 根据沟通和配置项目生产代码
 * @param 参数说明
 * @param tableName 操作数据表名 sys-user-table
 * @param dataDB 操作数据库名 web_data
 * @param moduleName 生产模块名称，与生产表有重复开头文件命名将剔除该部分内容 sys-user  ->  User(FileName) -> sys
 * @param tableParams 表相关参数 ->【生产表名, 操作数据库名】
 */
exports.productVueByTable = async (req, res, next) => {
  const params = req.body
  const mapParams = {
    dataDB: params.dataDB, // 操作数据库
    tableName: params.tableName, // 操作表集合
    tableParams: [params.tableName, params.dataDB], // 处理数据库、表集合
    moduleName: params.moduleName, // 模块名称，写入生产配置。写入的文件位置指向和变量命名
    replaceModule: params.replaceModule || true, // 全局配置是否替换模块名称开头 如 表sys-user-table -> sysUserTable || userTable(变量、文件、api命名)
    apiReplaceModule: params.apiReplaceModule || true, // api 替换模块名称的前缀 如 表sys-user-table -> sysUserTable(api路径) || userTable(api路径)
    mapTransColumnsPlugins: params.mapTransColumns, // 用户配置的表单对象属性(全部 columns 字段属性)
    selectColumnsRows: params.selectColumnsRows, // 勾选的表字段 columns
    spiltSign: params.spiltSign, // 表区分符
    isOnlyTable: params.isOnlyTable, // 要素模块只生产表格部分
    author: params.author, // 作者
    type: params.type, // java 或者前端代码标示
    packageName: params.moduleName, // java 包地址
    requestMapping: params.requestMapping, // java 请求mapping地址
  }

  try {
    const operateConstructor = {}
    await resetTableColumns(mapParams, 0, operateConstructor, params => {
      const productTemp = require('../product-temp.js') // 转化数据格式到 table-entity 对象
      const keyArr = Object.keys(params) // 对象Keys集合

      // 执行模版生产
      if (mapParams.type === 'java') {
        productTemp.initJavaTemplate(mapParams, params[keyArr[0]], params, res).then(data => {
          // res.json({ message: '已完成代码生产', status: 200, data: true })
        })
      } else {
        productTemp.initTemplate(mapParams, params[keyArr[0]], params, res).then(data => {
          // res.json({ message: '已完成代码生产', status: 200, data: true })
        })

        // 本地启动服务时可选择开启，格式化代码
        // require('child_process').exec('xl_close_port -p 3000', (err, stdout, stderr) => {
        //   if (err) {
        //     console.log(err)
        //     // throw err
        //   }
        // })
      }
    })
  } catch (e) {
    console.log(e)
    res.json({ message: '代码生产异常', status: 500, data: false })
  }
}

/**
 * 重装组构table结构 -> table对象: {tableName: TableEntity}
 * @param {*} mapParams
 * @param {*} tableIndex
 * @param {*} operates
 */
function resetTableColumns(mapParams, tableIndex, operates, callback) {
  // return new Promise((resolve, reject) => {
  const tableNameArray = mapParams.tableName.split(',')
  mapParams.tableParams = [tableNameArray[tableIndex], mapParams.dataDB]

  /**
   * 获取表结构
   */
  MySQL.SQLSelect(utils.SQLTable(), mapParams.tableParams, (error, tableResult) => {
    if (error) {
      console.log(' ** 生产代码 - 获取表结构异常')
      return
    }

    /**
     * 获取表-全部列结构或者勾选参数匹配
     */
    MySQL.SQLSelect(utils.SQLColumns(), [...mapParams.tableParams, '%%', '%%'], (error, columnsResult) => {
      if (error) {
        console.log(' ** 生产代码 - 获取表-全部列字段信息异常')
      }

      // try {
      const productTemp = require('../product-temp.js') // 转化数据格式到 table-entity 对象

      // important 清除 require 缓存对象，防止缓存干扰！！！
      Object.keys(require.cache).map((item, index) => {
        delete require.cache[item]
      })

      const tableEntity = require('../../generatte/EntityTable') // table-entity
      tableEntity.tableName = tableNameArray[tableIndex]

      productTemp.transformTableRequest(mapParams, { table: tableResult[0], columns: columnsResult }, tableEntity)
      operates[tableNameArray[tableIndex]] = tableEntity
      console.log(' ** table 结构获取完成并转化完成')

      if (tableIndex < tableNameArray.length - 1) {
        tableIndex += 1
        resetTableColumns(mapParams, tableIndex, operates, callback)
      } else {
        callback(operates)
      }
      // console.log(tableEntity)

      // 初始化模版
      // productTemp.initTemplate(mapParams, tableEntity)

      // // 格式化代码
      // require('child_process').exec('npm run lint', (err, stdout, stderr) => {
      //   if (err) {
      //     console.log(err)
      //     // throw err
      //   }
      // })
      // res.json({ message: '已完成代码生产', status: 200, data: true })
      // } catch (e) {
      //   console.log(e)
      //   // res.json({ message: '代码生产异常', status: 500, data: false })
      // }
    })
  })
  // })
}

/**
 * @description 根据要素字典生成表单代码
 * @param 参数说明
 * @param tableName 操作数据表名 sys-user-table
 * @param dataDB 操作数据库名 web_data
 * @param moduleName 生产模块名称，与生产表有重复开头文件命名将剔除该部分内容 sys-user  ->  User(FileName) -> sys
 * @param tableParams 表相关参数 ->【生产表名, 操作数据库名】
 */
exports.productVueFormByParams = async (req, res, next) => {
  const params = req.body

  // 构建初始化操作参数
  let mapParams = {
    tableName: params.tableName,
    modulePathName: params.modulePathName || 'views/modules', // 模块+写入文件夹名称，写入生产配置。写入的文件位置指向和变量命名
    replaceModule: params.replaceModule | true, // 全局配置是否替换模块名称开头 如 表sys-user-table -> sysUserTable || userTable(变量、文件、api命名)
    spiltSign: params.spiltSign || '_', // 表区分符
  }

  // 拼接形成写入路径
  const pathTableNameFrontChar = utils.toFrontChars(mapParams.tableName, mapParams.spiltSign)
  let pathLowerTableName = utils.toHumpClassName(
    mapParams.tableName.replace(pathTableNameFrontChar, ''),
    mapParams.spiltSign || '-'
  )

  let moduleLowerTableName = utils.toHumpClassName(
    mapParams.tableName.replace(pathTableNameFrontChar, ''),
    mapParams.spiltSign
  )

  pathLowerTableName = utils.toFileName(pathLowerTableName) // 文件名 file-name
  mapParams.modulePathName = mapParams.modulePathName + '/' + pathLowerTableName

  // 操作总体对象
  const transLevelListData = JSON.parse(params.transLevelListData)

  // 构建表结构
  let tableEntity = require('../../generatte/EntityTable') // table-entity

  // 填充API, 数据表中的表名备份
  let moduleUpperTableName = utils.toClassName(moduleLowerTableName) // 驼峰大写 ModuleName
  tableEntity.remark1 = moduleLowerTableName
  tableEntity.remark2 = moduleUpperTableName

  const tableInfo = transLevelListData[0]
  tableEntity.tableName = tableInfo.category
  tableEntity.tableComment = tableInfo.name

  // 获取前缀开头
  const frontChar = utils.toFrontChars(tableEntity.tableName, mapParams.spiltSign)
  tableEntity.frontChar = frontChar

  // 根据参数 replaceModule 判断是否去除模块前缀，如sys，增加限制防止错误参数执行
  tableEntity.lowerTableName = utils.toHumpClassName(tableEntity.tableName.replace('', ''), mapParams.spiltSign) // 驼峰小写 sysUser，去除模块前缀
  tableEntity.upperTableName = utils.toClassName(tableEntity.lowerTableName) // 驼峰大写 ModuleName
  tableEntity.fullUpperTableName = utils.toUpperCase(utils.toTableName(tableEntity.lowerTableName)) // 大写 FULL
  tableEntity.tableFileName = utils.toFileName(tableEntity.lowerTableName) // 文件名 file-name
  tableEntity.columnComment = tableEntity.columnComment || '无备注'

  // 构建表下的列表字段结构
  if (transLevelListData[0].children) {
    const colunmsArray = transLevelListData[0].children
    tableEntity = transtionFormColumns(tableEntity, colunmsArray, null)
  }

  try {
    const productTemp = require('../product-temp.js') // 转化数据格式到 table-entity 对象
    const tableParams = {}
    tableParams[tableEntity.lowerTableName] = tableEntity

    productTemp.initBaseFormTemplate(mapParams.modulePathName, tableEntity, tableParams) // 执行模版生产

    // 格式化代码刷新本地
    require('child_process').exec('npm run lint', (err, stdout, stderr) => {
      if (err) {
        // console.log(err)
        // throw err
      }
    })

    res.json({
      message: '已完成表单代码生产',
      status: 200,
      data: true,
    })
  } catch (e) {
    console.log(e)
    res.json({
      message: '表单代码生产过程异常',
      status: 500,
      data: false,
    })
  }
}

/**
 * @description 数据基础表单的column解构
 */
function transtionFormColumns(tableEntity, colunmsArray, columnsEntity) {
  const parentColumnsEntity = columnsEntity ? columnsEntity : null
  colunmsArray.map((item, index) => {
    columnsEntity = { ...require('../../generatte/EntityColumn') }

    // 根据是否包含子级和子级类型判定operateType
    if (item.type === '2') {
      // 集合数据
      columnsEntity.operateType = 'CheckBox'

      // 设置业务参数
      columnsEntity.objectKey = item

      // 集合数据，将值抽取出来，用于生成对应的组件赋值
      if (item.children) {
        item.children.map(values => {
          columnsEntity.valuesArray.push({
            ...values,
            label: values.name,
            value: values.category,
          })
        })
      }
    } else {
      // 默认状态为 ipnut
      columnsEntity.operateType = 'Input'
    }

    columnsEntity.parentColumnsEntity = parentColumnsEntity // 上层父类属性
    columnsEntity.columnName = item.category // 将字典属性转换为column操作对象。懒 -=-
    columnsEntity.columnComment = item.name || columnsEntity.lowerColumnName
    columnsEntity.dataType = 'varchar2' // 此处可根据字典进行配置

    // 大小写等列属性转换
    columnsEntity.lowerColumnName = utils.toHumpClassName(columnsEntity.columnName) // // 驼峰小写 userName
    columnsEntity.upperColumnName = utils.toClassName(columnsEntity.lowerColumnName) // 驼峰大写 ColumnsName
    columnsEntity.upperAttrName = utils.toUpperCase(columnsEntity.columnName) // 原生列名称 -> USER_NAME
    columnsEntity.lowerAttrName = utils.toLowerCase(columnsEntity.columnName) // 原生列名称 -> user_name

    // 语言转化，varchar 转化 string 等。暂定Any || to-do 修改 此处可以修改成 java 或者其他语言的转化，相应模版自行编写
    const formatData = utils.initColumnsType(item.dataType)
    columnsEntity.defaultValue = formatData.defaultValue
    columnsEntity.attrType = formatData.type

    // columnsEntity.operateType = item.operateType // 用户配置的对应表单的类型
    // columnsEntity.apiColumnsName = item.apiColumnsName // 用户配置对应的字段转换API的名称
    // columnsEntity.needValidate = item.needValidate // 字段非空字段
    // columnsEntity.validateType = item.validateType // 字段验证方式 - 数组格式

    // 特殊组件的格式处理，数据库类型设置对象的type后匹配组件需求
    if (
      columnsEntity.operateType === 'CheckBox' ||
      columnsEntity.operateType === 'Cascader' ||
      columnsEntity.operateType === 'MultipleSelect'
    ) {
      columnsEntity.attrType = 'String[]'
      columnsEntity.defaultValue = '[]'
    }

    if (columnsEntity.operateType === 'RangePicker') {
      columnsEntity.attrType = 'Date[]'
      columnsEntity.defaultValue = '[]'
    }

    if (columnsEntity.operateType === 'Switch') {
      columnsEntity.attrType = 'boolean'
      columnsEntity.defaultValue = false
    }

    if (columnsEntity.operateType === 'Radio' || columnsEntity.operateType === 'RadioButton') {
      columnsEntity.attrType = 'boolean | number | string'
      columnsEntity.defaultValue = false
    }

    if (columnsEntity.operateType === 'Rate' || columnsEntity.operateType === 'InputNumber') {
      columnsEntity.attrType = 'number'
      columnsEntity.defaultValue = 0
    }

    // 包含子集的要素内容
    if (item.type === '0') {
      if (item.children && item.children.length > 0) {
        transtionFormColumns(tableEntity, item.children, columnsEntity)
      }
    } else {
      // 存储columns 属性到 table entity -> 列表勾选的字段
      tableEntity.columnsArray.push(columnsEntity)
    }
  })

  return tableEntity
}
