#!/usr/bin/env node
/**
 * @description 综合数据服务类，默认端口为3000，需要数据库支撑。
 *              主要功能：读取数据库表、列结构生产代码。提供数据表操作服务。初始化启动时默认启动数据库连接，可停用该功能 -> createConnection
 *              提供本地生产代码的基础服务 -> router/table.js + templates 模版服务 + product-temp.js 生产逻辑服务
 *              同时提供本地DEV系列代码的数据操作服务。router/index.js + router/modules 业务模块数据服务
 */
const bodyParser = require('body-parser')
const debug = require('debug')('MG-TS-VUE-BACK-CLI:server')
const http = require('http')
const fetch = require('node-fetch')

// 获取 node 配置
const app = require('./app.js')

// 默认服务端口号
const serverPort = 3000

// 启动服务
const server = http.createServer(app)

/**
 * 异常监控
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof serverPort === 'string' ? `Pipe ${serverPort}` : `Port ${serverPort}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * 创建数据库连接
 * @param {*} configParamsList 数据库连接配置文件
 * @param {*} servePort 当前node服务端口号
 */
function createConnection(configParamsList = {}, servePort = 3000) {
  // 创建服务器数据库连接
  const fetchURL = `http://localhost:${servePort}/SQLServer/createSQLConnection`
  fetch(fetchURL, {
    credentials: 'include', // 为了在当前域名内自动发送 cookie ， 必须提供这个选项
    mode: 'cors', // 请求的模式
    cache: 'force-cache', // 缓存模式
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...configParamsList }),
  })
    .then(response => response.json())
    .then(json => console.log('数据库连接 -> ', json))
    .catch(e => console.log('数据库连接服务请求时异常 -> ', e))
}

/**
 * 启动监听
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
  console.log(`----------------------- ** 端口服务启动${bind} ** -----------------------`)

  // 创建服务器数据库连接
  const fetchURL = `http://localhost:${addr.port}/SQLServer/loadDataSourceConf`
  fetch(fetchURL, {
    method: 'post',
  })
    .then(response => response.json())
    .then(json => {
      console.log('数据库连接配置文件 -> ', json.data)
      createConnection(json.data, addr.port)
    })
    .catch(e => console.log('异常状态 -> 读取数据库连接配置文件异常', e))
}

app.set('port', serverPort)
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(bodyParser.json({ limit: '10mb' }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
server.listen(serverPort)
server.on('error', onError)
server.on('listening', onListening)
