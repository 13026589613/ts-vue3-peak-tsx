/**
 * @description 链接 -> 操作数据库类
 *              包含初始化建立链接、实际业务操作
 *              确保本机安装 mysql 模块 npm install mysql
 * @author PP
 */
const mysql = require('mysql')

/**
 * 对外暴漏从连接池连接对象，初始化连接状态
 */
let sqlConnection = null

/**
 * 初始化配置数据库连接池 POOL
 * 创建 mysql 连接池并配置参数
 * @param {*} params
 */
function initConnectConfig(params) {
  const pool = mysql.createPool({
    host: params.host, // 主机地址
    port: params.port || 3306, // 端口
    user: params.user, // 数据库访问账号
    password: params.password, // 数据库访问密码
    database: params.database, // 要访问的数据库
    charset: params.charset || 'utf8_general_ci', // 字符编码 ( 必须大写 )
    typeCast: true, // 是否把结果值转换为原生的 javascript 类型
    supportBigNumbers: true, // 处理大数字 (bigint, decimal), 需要开启 ( 结合 bigNumberStrings 使用 )
    bigNumberStrings: true, // 大数字 (bigint, decimal) 值转换为javascript字符对象串
    multipleStatements: false, // 允许每个mysql语句有多条查询, 未防止sql注入不开启
    // connectTimeout: 5000,     // 数据库连接超时时间, 默认无超时
  })
  pool.connectionLimit = 10 // 连接池中可以存放的最大连接数量
  pool.waitForConnections = true // 连接使用量超负荷是否等待, false 会报错
  pool.queueLimit = 0 // 每个连接可操作的 列数 上限, 0 为没有上限

  return pool
}

/**
 * 创建数据库连接
 */
function createConnection() {
  if (sqlConnection === null) return
  return new Promise((resolve, reject) => {
    sqlConnection.getConnection((err, conn) => {
      if (err) {
        console.log('-------------- 数据库连接获取失败! --------------')
        reject('数据库连接获取失败!')
      } else {
        // console.log('-------------- 开启数据库连接，成功连接! --------------')
        resolve(conn)
      }
    })
  })
}

// ---------------------------- MySQL 常规增删改查 ----------------------------
/**
 * MySQL 查询数据
 * @param {*} sql
 * @param {*} callback
 */
const SQLSelect = async (sql, sqlParams, callback) => {
  const connection = await createConnection()
  await connection.query(sql, sqlParams, (err, result) => {
    if (err) {
      console.log('错误信息 - :', err.sqlMessage)
      callback(err.sqlMessage, null)
      return
    }
    console.log(
      ` ** - 执行SQl语句 - ： ${sql}\n ** - SQl参数Params - ：${sqlParams}\n **
      )}\n`
    )
    // console.log(
    //   ` ** - 执行SQl语句 - ： ${sql}\n ** - SQl参数Params - ：${sqlParams}\n ** - SQl执行结果如下：\n${JSON.stringify(
    //     result
    //   )}\n`
    // )
    callback('', result)
  })
  await connection.release()
}

/**
 * MySQL 插入数据
 * @param {*} table
 * @param {*} params
 * @param {*} callback
 */
const SQLInsert = async (table, params, callback) => {
  let fields = ''
  let values = ''
  for (const k in params) {
    fields += `${k}, `
    values = `${values}'${params[k]}', `
  }
  fields = fields.slice(0, -2)
  values = values.slice(0, -2)
  console.log(fields, `\n${values}`)

  const sql = `INSERT INTO ${table} (${fields}) VALUES (${values})`
  console.log(` ** - 新增执行SQl语句 - ： \n${sql}`)

  const connection = await createConnection()
  await connection.query(sql, callback)
  await connection.release()
}

/**
 * MySQL更新数据
 * @param {*} table
 * @param {*} sets
 * @param {*} where
 * @param {*} callback
 */
const SQLUpdate = async (table, sets, where, callback) => {
  let _SETS = ''
  let _WHERE = ''

  // 拼装SET部分
  for (const k in sets) {
    _SETS += `${k}='${sets[k]}', `
  }
  _SETS = _SETS.slice(0, -2)

  // 拼装WHERE 条件部分 解析数组
  for (const k2 in where) {
    _WHERE += `${k2}=${where[k2]}`
  }

  const sql = `UPDATE ${table} SET ${_SETS} WHERE ${_WHERE}`
  console.log(` ** - 编辑执行SQl语句 - ： \n${sql}`)

  const connection = await createConnection()
  await connection.query(sql, callback)
  await connection.release()
}

/**
 * MySQL 删除数据
 * @param {*} table
 * @param {*} where
 * @param {*} callback
 */
const SQLDelete = async (table, where, callback) => {
  let _WHERE = ''

  for (const k2 in where) {
    // 单一条件单属性内容
    if (where[k2].indexOf(',') === -1) {
      _WHERE += `${k2}=${where[k2]}`
    } else {
      _WHERE += `${k2} in (${where[k2]})`
    }
    // _WHERE += `${k2}='${where[k2]}' AND ` // 多个筛选条件使用
  }

  const sql = `DELETE  FROM ${table} WHERE ${_WHERE}`
  console.log(` ** - 删除执行SQl语句 - ： \n${sql}`)

  const connection = await createConnection()
  await connection.query(sql, callback)
  await connection.release()
}

/**
 * 对外暴漏从连接池连接对象
 */
exports.connect = params =>
  new Promise((resolve, reject) => {
    sqlConnection = initConnectConfig(params)
    sqlConnection.getConnection((err, conn) => {
      if (err) {
        console.log(err)
        console.log('----------------------- ** 数据库连接获取失败! ** -----------------------')
        console.log('----------------------- ** 检查配置项(默认、设定配置), 重试.服务关闭！ ** -----------------------')
        // process.exit(0)
        reject({
          status: false,
        })
      } else {
        console.log('----------------------- ** 数据库成功连接! ** -----------------------')
        conn.release()
        resolve({
          status: true,
          sqlConnection,
        })
      }
    })
  })
exports.sqlConnection = sqlConnection

/**
 * 对外暴漏从连接池中获取数据库连接的方法
 */
exports.connection = createConnection()

/**
 * 增删改查基础对象方法
 */
exports.SQLSelect = SQLSelect
exports.SQLInsert = SQLInsert
exports.SQLDelete = SQLDelete
exports.SQLUpdate = SQLUpdate
