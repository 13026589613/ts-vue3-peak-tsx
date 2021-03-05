/**
 * @description 数据库 - 业务操作类
 * @author PP
 */
const connection = require('../common/mysql.js')
const SQLServe = {
  /**
   * @description 查询表格基础结构
   * @param conn 数据库链接对象
   */
  async operateTableConstructor(connectionParams, sql, sqlParams) {
    const conn = await connection({
      host: '127.0.0.1', // 主机地址
      user: 'root', // 数据库访问账号
      password: '123456', // 数据库访问密码
      database: 'web_data', // 要访问的数据库
    })

    let resultInfo = null
    // 开启数据库事物
    resultInfo = await new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })

    // 执行语句
    resultInfo = await new Promise((resolve, reject) => {
      conn.query(sql, sqlParams, (error, result) => {
        if (error) {
          return conn.rollback(() => {
            resolve(error)
          })
        }
        console.log(`\n数据库执行语句如下：${sql}`)
        console.log(`数据库语句配置参数：${sqlParams}`)
        console.log(`数据库执行结果如下：${JSON.stringify(result)}\n`)
        resolve(result)
      })
    })

    // 关闭链接,释放资源
    await conn.release()
    console.log('数据库已释放关闭链接')

    return await resultInfo
  },
}
module.exports = SQLServe
