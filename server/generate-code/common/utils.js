/**
 * @description 公用类（转化、常量、方法）
 * @author PP
 */
module.exports = {
  SQLAllTable() {
    return 'select table_name tableName, engine, table_comment tableComment, create_time createTime from information_schema.tables where table_schema=? and (table_name like ? or table_comment like ?)'
  },
  SQLTable() {
    return 'select table_name tableName, engine, table_comment tableComment, create_time createTime from information_schema.tables where table_name=? and table_schema=?'
  },
  SQLColumns() {
    return 'select column_name columnName, column_name apiColumnsName, data_type dataType, column_comment columnComment, column_key columnKey, is_nullable isNullable, extra from information_schema.columns where table_name=? and table_schema=? and (column_name like ? or column_comment like ?) order by ordinal_position'
  },
  // 下划线转换驼峰
  toHumpOfLine(string) {
    return string.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())
  },
  // 转化为驼峰格式 table_name -> tableName 格式
  toFrontChars: (string, formatter = '_') => {
    const stringArray = string.split(formatter).filter(str => str && str.trim())
    return stringArray[0]
  },
  // 转化为驼峰格式 table_name -> tableName 格式
  toHumpClassName: (string, formatter = '_') => {
    const stringArray = string.split(formatter).filter(str => str && str.trim())
    stringArray.map((item, index) => {
      if (index > 0) {
        stringArray[index] = item.substring(0, 1).toUpperCase() + item.substring(1)
      }
    })
    return stringArray.join('')
  },
  // 驼峰转化为数据表  tableName -> table_name 格式
  toTableName: string => string.replace(/([A-Z])/g, '_$1').toLowerCase(),

  // 驼峰转化为文件名  tableName -> table-name 格式
  toFileName: string => string.replace(/([A-Z])/g, '-$1').toLowerCase(),

  // 首字母大写 -> TableName 格式
  toClassName: string => string.substring(0, 1).toUpperCase() + string.substring(1),

  // 转化字符串全体大写 -> TABLE_NAME 格式
  toUpperCase: string => string.toUpperCase(),

  // 转化字符串全体小写 -> tablename 格式
  toLowerCase: string => string.toLowerCase(),

  // 根据数据库类型设置对象的type
  initColumnsType(type) {
    const arrNumber = ['int', 'double', 'float', 'decimal', 'integer']
    const arrString = ['varchar', 'varchar2', 'longtext', 'bigint', 'tinyint']
    const arrDate = ['date', 'datetime', 'time', 'timestamp']
    const arrBoolean = ['char']
    if (type) {
      if (arrDate.indexOf(type) > -1) return { type: 'Date', defaultValue: null }
      if (arrNumber.indexOf(type) > -1) return { type: 'number', defaultValue: 0 }
      if (arrString.indexOf(type) > -1) return { type: 'string', defaultValue: null }
      if (arrBoolean.indexOf(type) > -1) return { type: 'boolean', defaultValue: false }
    } else {
      return { type: 'any', defaultValue: null }
    }
  },

  // 获取get请求参数
  getQueryParameters(options) {
    const { url } = options
    const search = url.split('?')[1]

    if (!search) {
      return {}
    }
    return JSON.parse(
      `{"${decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`
    )
  },

  // post put 等获取请求体body （json -> string fy）
  getBody: options => options.body && JSON.parse(options.body),

  /**
   * 数组结构去重复
   * @param {*} arrays
   */
  reduceConstructor: arrays => {
    // const obj = {}
    // arrays.reduce((item, next) => {
    //   obj[next.lowerColumnName] ? '' : (obj[next.lowerColumnName] = true && item.push(next))
    //   return item
    // }, [])

    const result = []
    const obj = {}
    for (let i = 0; i < arrays.length; i++) {
      if (!obj[arrays[i].lowerColumnName]) {
        result.push(arrays[i])
        obj[arrays[i].lowerColumnName] = true
      }
    }
    return result
  },

  /**
   * 对象根据字段转换为数组组成
   * @param {*} objectInfo
   * @param {*} objectKey
   */
  objectToArrayObject: (objectInfo, objectKey) => {
    let arrays = []
    const keyArr = Object.keys(objectInfo) // 对象Keys集合
    keyArr.map(item => {
      arrays = [...arrays, ...objectInfo[item][objectKey]]
    })
    return arrays
  },
}
