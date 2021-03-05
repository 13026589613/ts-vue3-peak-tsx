/**
 * @description 生产代码的生产逻辑类
 * @author PP
 */
const path = require('path')
const fs = require('fs')
const utils = require('../common/utils')
const { resolve } = require('path')

/**
 * @description 请求结果转化为对应需求结构，数据表数据化，转换为可读取操作的组合数据 tableList<columnsList> 组合
 * @param mapParams 外部处理参数 moduleName -> 模块名称
 * @param tableData 需要转化的数据集合 「table-info columns-infos」
 * @param tableEntity 接受转化类
 */
exports.transformTableRequest = (mapParams, tableData, tableEntity) => {
  // 转化table-entity
  tableEntity = Object.assign(tableEntity, tableData.table)

  // 将用户配置的columns对象赋值进行使用
  tableEntity.mapTransColumnsPlugins = JSON.parse(mapParams.mapTransColumnsPlugins)[tableEntity.tableName]
  // console.log(tableEntity.mapTransColumnsPlugins)
  // 获取前缀开头
  const frontChar = utils.toFrontChars(tableEntity.tableName, mapParams.spiltSign || '-')
  tableEntity.frontChar = frontChar

  // 根据参数 replaceModule 判断是否去除模块前缀，如sys，增加限制防止错误参数执行
  tableEntity.lowerTableName =
    mapParams.replaceModule === 'true'
      ? utils.toHumpClassName(tableEntity.tableName.replace(frontChar, ''), mapParams.spiltSign || '-')
      : utils.toHumpClassName(tableEntity.tableName.replace('', ''), mapParams.spiltSign || '-') // 驼峰小写 sysUser，去除模块前缀

  tableEntity.apiPathName =
    mapParams.apiReplaceModule === 'true'
      ? utils.toHumpClassName(tableEntity.tableName.replace(frontChar, ''), mapParams.spiltSign || '-')
      : utils.toHumpClassName(tableEntity.tableName.replace('', ''), mapParams.spiltSign || '-')
  tableEntity.apiPathName = utils.toClassName(tableEntity.apiPathName) // api 路径是否去除模块前缀

  tableEntity.upperTableName = utils.toClassName(tableEntity.lowerTableName) // 驼峰大写 ModuleName
  tableEntity.fullUpperTableName = utils.toUpperCase(utils.toTableName(tableEntity.lowerTableName)) // 大写 FULL
  tableEntity.tableFileName = utils.toFileName(tableEntity.lowerTableName) // 文件名 file-name
  tableEntity.columnComment = tableEntity.columnComment || '无备注'

  // 转化columns-entity
  tableData.columns.map((item, index) => {
    let columnsEntity = require('../generatte/EntityColumn') // columns-entity
    columnsEntity = item
    columnsEntity.lowerColumnName = utils.toHumpClassName(item.columnName) // // 驼峰小写 userName
    columnsEntity.upperColumnName = utils.toClassName(columnsEntity.lowerColumnName) // 驼峰大写 ColumnsName
    columnsEntity.upperAttrName = utils.toUpperCase(item.columnName) // 原生列名称 -> USER_NAME
    columnsEntity.lowerAttrName = utils.toLowerCase(item.columnName) // 原生列名称 -> user_name
    columnsEntity.dataType = item.dataType
    columnsEntity.columnComment = item.columnComment || columnsEntity.lowerColumnName
    columnsEntity.columnKey = utils.toUpperCase(item.columnKey)
    columnsEntity.extra = item.extra

    // 语言转化，varchar 转化 string 等。暂定Any || to-do 修改 此处可以修改成 java 或者其他语言的转化，相应模版自行编写
    const formatData = utils.initColumnsType(item.dataType)
    columnsEntity.defaultValue = formatData.defaultValue
    columnsEntity.attrType = formatData.type

    // 自定义参数转换赋值
    columnsEntity.operateType = tableEntity.mapTransColumnsPlugins[item.columnName].operateType // 用户配置的对应表单的类型
    columnsEntity.apiColumnsName = tableEntity.mapTransColumnsPlugins[item.columnName].apiColumnsName // 用户配置对应的字段转换API的名称
    columnsEntity.needValidate = tableEntity.mapTransColumnsPlugins[item.columnName].needValidate // 字段非空字段
    columnsEntity.validateType = tableEntity.mapTransColumnsPlugins[item.columnName].validateType // 字段验证方式 - 数组格式

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

    // 存储columns 属性到 table entity -> 列表勾选的字段
    tableEntity.columnsArray.push(columnsEntity)

    // 根据勾选字段列生产 Form 表单
    const keyArr = Object.keys(JSON.parse(mapParams.selectColumnsRows)[tableEntity.tableName])
    const columnsIndex = keyArr.findIndex(key => key === columnsEntity.lowerAttrName)
    if (columnsIndex !== -1) {
      tableEntity.formColumnsArray.push(columnsEntity)
    }

    // 处理主键
    if (columnsEntity.columnKey === 'PRI' && tableEntity.pk == null) {
      tableEntity.pk = columnsEntity // 存储主键属性
    }
  })

  if (tableEntity.pk === null) {
    tableEntity.pk = tableEntity.columnsArray[0] // 强制主键存在
  }
  return tableEntity // 包含表内容定义和列全部属性的集合定义
}

/**
 * @description 模版文件输出 - 生产ANTD+TS模版文件，支持只生产表格部分或者表格+表单
 * @param mapParams 配置参数
 * @param tableEntity 主表配置
 * @param operateConstructor 表结构组成集合
 */
exports.initTemplate = async (mapParams, tableEntity, operateConstructor, response) => {
  // const tablePath = mapParams.moduleType === 'true' ? `${basePath}` : `${basePath}/views/${mapParams.moduleName}` // moduleType参数可启用
  // 写死创建路径。不提供其他方式路径，定义为 modulesTableName区分。内含其他模块文件
  // basePath = `${basePath}/${mapParams.moduleName}${tableEntity.upperTableName}`

  const basePath = path.resolve(__dirname, '../../src/')
  const generatePath = path.resolve(__dirname, '../../z-generate/')

  // 首字母大写文件夹
  const CapModuleName = utils.toClassName(mapParams.moduleName)
  const tempPath = '../templates/' // 模版文件相对路径
  const tablePath = `${basePath}/views/modules/${mapParams.moduleName}/${tableEntity.tableFileName}` // moduleType参数可启用

  const operate = require('../common/operate.js').module.constructor(
    tableEntity,
    basePath,
    CapModuleName,
    tempPath,
    operateConstructor
  ) // 构建文件操作对象

  // 执行模版参数匹配生产代码结构
  operate.init().then(async () => {
    // api - node - serve 服务脚本
    await operate.downLoad(
      'generate/node-sql.js',
      `${tableEntity.lowerTableName}`,
      'js',
      true,
      `${generatePath}/serve/routes/modules`
    )

    // 只生产表格
    if (mapParams.isOnlyTable === true || mapParams.isOnlyTable === 'true') {
      await operate.downLoad(
        'table-modules/dict-edit-form-modules/view-table-dict-edit-form-table.js',
        'index',
        'tsx',
        true,
        tablePath
      ) // table
      await operate.downLoad('table-modules/view-index.scss.js', 'index', 'scss', true, tablePath) // index-scss
      await operate.downLoad(
        'table-modules/dict-edit-form-modules/view-table-dict-edit-form-table.config.js',
        'table-config',
        'ts',
        true,
        tablePath
      ) // table-config
      await operate.downLoad(
        'table-modules/dict-edit-form-modules/view-table-dict-edit-form-table.api.js',
        `api-${tableEntity.lowerTableName}`,
        'ts',
        false,
        `${basePath}/api/modules`
      ) // api
    } else {
      await operate.downLoad('table-modules/view-table.js', 'index', 'tsx', true, tablePath) // table
      await operate.downLoad('table-modules/view-form.js', 'info-model', 'tsx', true, tablePath) // table-form
      await operate.downLoad('table-modules/view-index.scss.js', 'index', 'scss', true, tablePath) // index-scss
      await operate.downLoad('table-modules/view-table.config.js', 'table-config', 'ts', true, tablePath) // table-config
      await operate.downLoad('table-modules/view-form.config.js', 'table-from-config', 'ts', true, tablePath) // form-config
      await operate.downLoad('interface.js', tableEntity.tableName, 'interface.ts', true, `${basePath}/interface`) // interface
      await operate.downLoad('store.js', tableEntity.tableName, 'ts', true, `${basePath}/store/modules`) // store
      await operate.downLoad('mock.js', tableEntity.tableName, 'ts', true, `${basePath}/mock/service`) // store
      await operate.downLoad('api.js', `api-${tableEntity.lowerTableName}`, 'ts', false, `${basePath}/api/modules`) // api， 结尾参数传递false

      await operate.downLoad('table-modules/view-form.config.js', 'table-from-config', 'ts', false, tablePath) // form-config
      await operate.downLoad('interface.js', tableEntity.tableName, 'interface.ts', false, `${basePath}/interface`) // interface
      await operate.downLoad('mock.js', tableEntity.lowerTableName, 'ts', false, `${basePath}/mock/service`) // store
      await operate.downLoad('api.js', `api-${tableEntity.lowerTableName}`, 'ts', false, `${basePath}/api/modules`) // api
    }

    await console.log(` ** 代码生产 - 路径（views-table、store、interface、mock、api）：${tablePath}`, 'color:#0f0;')

    // await downloadFileZIP(path.join(__dirname, 'src'))

    // var zipper = require('zip-local')
    // zipper.sync
    //   .zip(path.join(__dirname, 'src'))
    //   .compress()
    //   .save(`${path.join(__dirname, './')}.zip`)

    const compressing = require('compressing')
    //folder为自定义要压缩的文件夹

    const time = new Date().getTime()
    const filePath = path.join(__dirname, '../../src')

    // 直接流文件生成压缩包下载
    const destFilePath = filePath + '.tar'
    await compressing.tar
      .compressDir(filePath, destFilePath)
      .then(() => {
        // console.log('success')
        response.setHeader('Content-type', 'application/octet-stream')
        response.setHeader('Content-Disposition', 'attachment;filename=' + time)

        var fileStream = fs.createReadStream(destFilePath)

        fileStream.on('data', function(data) {
          response.write(data, 'binary')
        })
        fileStream.on('end', function() {
          response.end()
          fs.unlink(destFilePath, function(err, data) {
            if (err) return console.log(err)
          })
        })
      })
      .catch(err => {
        console.error(err)
      })

    // 先生成代码再下载
    // await compressing.zip
    //   .compressDir(filePath, `${path.join(__dirname, '../../zip/')}${'web'}_${time}.zip`)
    //   .then(() => {
    //     response.setHeader('Content-Type', 'application/zip')
    //     response.setHeader('Content-Disposition', 'attachment; filename=' + '89992')

    //     var stream = fs.createReadStream(`${path.join(__dirname, '../../zip/')}${'web'}_${time}.zip`)
    //     stream.pipe(response)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     return
    //   })

    return true
  })
}

/**
 * @description 基础表单的模版文件输出 - 行内编辑表格模版生产，antd+ts框架
 * @param modulePathName 配置参数-输出模块的路径
 * @param tableEntity 主表配置参数
 * @param operateConstructor 表结构组成集合
 */
exports.initBaseFormTemplate = async (modulePathName, tableEntity, operateConstructor) => {
  const basePath = path.resolve(__dirname, '../../src/')

  // 首字母大写文件夹
  const CapModuleName = utils.toClassName(modulePathName)
  const tablePath = `${basePath}/views/modules/${modulePathName}` // moduleType参数可启用

  const operate = require('../common/operate.js').module.constructor(
    tableEntity,
    basePath,
    CapModuleName,
    '../templates/',
    operateConstructor
  ) // 构建文件操作对象

  // 执行模版参数匹配生产代码结构
  operate.init().then(async () => {
    await operate.downLoad(
      'table-modules/dict-edit-form-modules/base-form/view-info-model.js',
      'info-model',
      'tsx',
      true,
      tablePath
    )
    await operate.downLoad(
      'table-modules/dict-edit-form-modules/base-form/view-info-model-form.js',
      'info-model-form',
      'tsx',
      true,
      tablePath
    )

    await console.log(` ** 基础表单代码生产 - 路径：${tablePath}`, 'color:#0f0;')
    return true
  })
}

/**
 * @description deploy。conf 项目部署模版文件输出
 * @param mapParams 表单配置内容，完全覆盖模版
 */
exports.initDeployTemplate = mapParams =>
  new Promise((resolve, reject) => {
    const basePath = path.resolve(__dirname, '../../')
    const tempPath = '../templates/' // 模版文件相对路径

    const operate = require('../common/operate.js').module.constructor(mapParams, basePath, null, tempPath, {}) // 构建文件操作对象

    try {
      operate.init().then(async data => {
        try {
          if (data) {
            await operate.downLoad(
              'product/deploy.js',
              'ops-deploy',
              'conf',
              false,
              `${basePath}/` // 写入文件路径
            ) // form-config
            await console.log(' ** 代码部署配置生产 - ops-deploy.conf文件配置改写：/ops-deploy.conf', 'color:#0f0;')
            await fs.exists(`${basePath}/ops-deploy.conf`, exists => {
              if (!exists) {
                resolve({
                  status: false,
                  message: '生产文件异常，检查配置路径',
                })
              }
              resolve({
                status: true,
                message: '代码文件已执行生产',
              })
            })
          }
        } catch (e) {
          console.log(e)
          resolve({
            status: false,
            message: '代码生产异常，查看日志文件',
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  })

/**
 * @description 项目node 服务数据库连接配置 - 数据库连接配置模版
 * @param mapParams 表单配置内容，完全覆盖模版
 */
exports.initSQLConnectionConfTemplate = mapParams =>
  new Promise((resolve, reject) => {
    const basePath = path.resolve(__dirname, '../../src')
    const generatePath = path.resolve(__dirname, '../../z-generate/')
    const tempPath = '../templates/' // 模版文件相对路径

    const operate = require('../common/operate.js').module.constructor(mapParams, basePath, null, tempPath, {}) // 构建文件操作对象

    try {
      operate.init().then(async data => {
        try {
          if (data) {
            await operate.downLoad(
              'generate/connect-sql.js',
              'mysql-connection',
              'conf',
              false,
              `${generatePath}/common`
            ) // 数据库连接配置文件

            await console.log(
              ' ** 数据库配置文件生产 - mysql-connection.conf文件配置改写：z-generate/common/mysql-connection.conf',
              'color:#0f0;'
            )
            await fs.exists(`${generatePath}/common/mysql-connection.conf`, exists => {
              if (!exists) {
                resolve({
                  status: false,
                  message: '数据库配置文件生产异常，检查配置路径',
                })
              }
              resolve({
                status: true,
                message: '数据库配置文件已执行完成生产',
              })
            })
          }
        } catch (e) {
          console.log(e)
          resolve({
            status: false,
            message: '数据库配置文件生产异常，查看日志文件',
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  })

/**
 * @description 模版文件输出 - 生产Java代码 - 科润后台管理java基础版本
 * @param mapParams 配置参数
 * @param tableEntity 主表配置
 * @param operateConstructor 表结构组成集合
 */
exports.initJavaTemplate = async (mapParams, tableEntity, operateConstructor, response) => {
  const basePath = path.resolve(__dirname, '../../java/')

  // 首字母大写文件夹
  const CapModuleName = utils.toClassName(mapParams.moduleName)
  const tempPath = '../templates/' // 模版文件相对路径

  const operate = require('../common/operate.js').module.constructor(
    tableEntity,
    basePath,
    CapModuleName,
    tempPath,
    operateConstructor,
    mapParams
  ) // 构建文件操作对象

  // 执行模版参数匹配生产代码结构
  operate.init().then(async () => {
    // 模版生产代码部分
    await operate.downLoad(
      'java-ftl/controller.ftl.js',
      `${tableEntity.upperTableName}Controller`,
      'java',
      true,
      `${basePath}/controller`
    ) // controller
    await operate.downLoad(
      'java-ftl/baseEntity.ftl.js',
      `Base${tableEntity.upperTableName}`,
      'java',
      true,
      `${basePath}/entity`
    ) // base-entity
    await operate.downLoad(
      'java-ftl/entity.ftl.js',
      `${tableEntity.upperTableName}`,
      'java',
      true,
      `${basePath}/entity`
    ) // entity
    await operate.downLoad(
      'java-ftl/repository.ftl.js',
      `${tableEntity.upperTableName}Repository`,
      'java',
      true,
      `${basePath}/repository`
    ) // repository
    await operate.downLoad(
      'java-ftl/service.ftl.js',
      `${tableEntity.upperTableName}Service`,
      'java',
      false,
      `${basePath}/service`
    ) // service
    // await operate.downLoad('api.js', `api-${tableEntity.lowerTableName}`, 'xml', false, `${basePath}/api/modules`) // mapper

    await console.log(
      ` ** 代码生产 - 路径（controller、baseEntity、Entity、service、repository、mapper）：${basePath}`,
      'color:#0f0;'
    )

    // 下载压缩代码
    const compressing = require('compressing')
    //folder为自定义要压缩的文件夹

    const time = new Date().getTime()
    const filePath = path.join(__dirname, '../../java')

    // 直接流文件生成压缩包下载
    const destFilePath = filePath + '.tar'
    await compressing.tar
      .compressDir(filePath, destFilePath)
      .then(() => {
        // console.log('success')
        response.setHeader('Content-type', 'application/octet-stream')
        response.setHeader('Content-Disposition', 'attachment;filename=' + time)

        var fileStream = fs.createReadStream(destFilePath)

        fileStream.on('data', function(data) {
          response.write(data, 'binary')
        })
        fileStream.on('end', function() {
          response.end()
          fs.unlink(destFilePath, function(err, data) {
            if (err) return console.log(err)
          })
        })
      })
      .catch(err => {
        console.error(err)
      })
    return true
  })
}
