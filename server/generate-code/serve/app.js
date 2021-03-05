// const bodyParser = require('body-parser')
// const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const createError = require('http-errors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

app.all('*', (req, res, next) => {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token, token')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') {
    res.sendStatus(200) // 让options尝试请求快速结束
  } else {
    next()
  }
})

// view engine setup
// app.set('views', path.join(__dirname, '../../src/views'))
// app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// 如果需要可以默认设置并创建连接
// const mysqlDB = require('../common/mysql')
// mysqlDB.connect({
//   host: '127.0.0.1', // 主机地址
//   user: 'root', // 数据库访问账号
//   password: '123456', // 数据库访问密码
//   database: 'web_data', // 要访问的数据库
// })

// 路由跳转
const route = require('./routes/index.js')
route(app)

// 异常捕捉器和请求处理类
app.use((req, res, next) => {
  if (res.status !== 200) {
    next(createError(404))
  }
  next()
})

// 异常处理类
app.use((err, req, res, next) => {
  // 本地反馈信息
  res.locals.message = req.app.get('env') === 'development' ? err.message : null
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500) // 异常状态设置
  console.log(err)
  // res.render('error')
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,params')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// app.use(
//   bodyParser({
//     jsonLimit: '50mb', // 控制body的parse转换大小 default 1mb
//     formLimit: '4096kb', //  控制你post的大小  default 56kb
//   })
// )

app.use(bodyParser.json({ limit: 1805981 }))
app.use(bodyParser.urlencoded({ limit: 1805981, extended: true }))

module.exports = app
