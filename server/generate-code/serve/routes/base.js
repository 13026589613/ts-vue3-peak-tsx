const url = require('url')

const fs = require('fs')
const readline = require('readline')
const path = require('path')
const MySQL = require('../../common/mysql.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * @description 系统获取数据库配置文件数据
 * @param 参数说明
 */
exports.initDataSourceConf = (req, res, next) => {
  try {
    const params = req.body

    // 创建默认的数据库连接, 配置文件为 common/mysql-connection.conf
    readFileToArr(resolve('../../common/mysql-connection.conf'), (configParamsList) => {
      const SQLConnectionConfig = {}
      configParamsList.map((item, index) => {
        const itemArray = item.split('=')
        SQLConnectionConfig[itemArray[0]] = itemArray[1]
      })

      res.json({ message: '成功 获取数据源配置文件- mysql-connection.conf', status: 200, data: SQLConnectionConfig })
    })
  } catch (e) {
    res.json({ message: '获取数据源配置时异常', status: 500, data: false })
  }
}

/**
 * @description 系统配置数据库连接，远程连接配置库
 * @param 参数说明
 */
exports.initDataSourceConnection = (req, res, next) => {
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
    MySQL.connect(params).then((data) => {
      if (data.status) {
        res.json({ message: '数据源设定成功 - 数据库已连接', status: 200, data: true })
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

/*
 * 按行读取文件内容
 * 返回：字符串数组
 * 参数：fReadName:文件名路径
 *      callback:回调函数
 * */
function readFileToArr(fReadName, callback) {
  const fRead = fs.createReadStream(fReadName, { encoding: 'utf8' })
  const objReadline = readline.createInterface({
    input: fRead,
  })
  const arr = new Array()
  objReadline.on('line', (line) => {
    arr.push(line)
    // console.log('line:'+ line);
  })
  objReadline.on('close', () => {
    // console.log(arr);
    callback(arr)
  })
}
