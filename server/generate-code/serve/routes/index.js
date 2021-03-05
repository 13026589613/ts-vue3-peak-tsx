const RouteBase = require('./base') // 系统服务
const RouteTables = require('./table') // 代码生产服务对象
const RouteProduct = require('./product') // 代码部署服务对象
const RouteBaseCode = require('./modules/base')
const RouteErrorLog = require('./modules/errorLog')

// 业务服务
const RouteUser = require('./modules/users')

module.exports = app => {
  // 设置数据库配置并连接数据库
  app.post('/SQLServer/createSQLConnection', RouteBase.initDataSourceConnection)

  // 获取数据库连接配置 conf
  app.post('/SQLServer/loadDataSourceConf', RouteBase.initDataSourceConf)

  // 代码生产连接数据库
  app.post('/sql/config', RouteTables.changeDataSource) // 获取/设置表连接

  // 代码生产部分
  app.post('/table/initTableInfo', RouteTables.initTableInfo) // 获取数据库所有表结构
  app.post('/table/initColumnsOfTable', RouteTables.initTableColumnsConstruct) // 获取数据表所有列结构
  app.post('/generate/product', RouteTables.productVueByTable) // 执行生产代码
  app.post('/generate/product/baseForm', RouteTables.productVueFormByParams) // 执行生成表单代码

  // 代码部署
  app.post('/code/product', RouteProduct.initDeployTemplate) // 执行服务器远程部署
  app.post('/code/serveProduct', RouteProduct.codeServeDeploy) // 配置deploy

  app.post('/code/codeServeDeployTest', RouteProduct.codeServeDeployTest) // 测试配置deploy

  /**
   * @description  系统管理 - 系统用户 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  const RouteUser = require('./modules/user')
  app.post('/sys/initUserListData', RouteUser.initUserListData)
  app.delete('/sys/deleteUser', RouteUser.deleteUser)
  app.get('/sys/getUser', RouteUser.getUser)
  app.put('/sys/updateUser', RouteUser.updateUser)
  app.post('/sys/insertUser', RouteUser.insertUser)

  /**
   * @description  字典-基本代码档 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  app.post('/code/initBaseListData', RouteBaseCode.initBaseListData)
  app.delete('/code/deleteBase', RouteBaseCode.deleteBase)
  app.get('/code/getBase', RouteBaseCode.getBase)
  app.put('/code/updateBase', RouteBaseCode.updateBase)
  app.post('/code/insertBase', RouteBaseCode.insertBase)

  /**
   * @description  系统管理 - 系统错误日志 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  app.post('/sys/initErrorLogListData', RouteErrorLog.initErrorLogListData)
  app.delete('/sys/deleteErrorLog', RouteErrorLog.deleteErrorLog)
  app.get('/sys/getErrorLog', RouteErrorLog.getErrorLog)
  app.put('/sys/updateErrorLog', RouteErrorLog.updateErrorLog)
  app.post('/sys/insertErrorLog', RouteErrorLog.insertErrorLog)

  /**
   * @description  系统管理 - 系统日志 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  const RouteLog = require('./modules/log')
  app.post('/sys/initLogListData', RouteLog.initLogListData)
  app.delete('/sys/deleteLog', RouteLog.deleteLog)
  app.get('/sys/getLog', RouteLog.getLog)
  app.put('/sys/updateLog', RouteLog.updateLog)
  app.post('/sys/insertLog', RouteLog.insertLog)

  /**
   * @description  系统管理 - 菜单管理 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  const RouteMenu = require('./modules/menu')
  app.post('/sys/initMenuListData', RouteMenu.initMenuListData)
  app.delete('/sys/deleteMenu', RouteMenu.deleteMenu)
  app.get('/sys/getMenu', RouteMenu.getMenu)
  app.put('/sys/updateMenu', RouteMenu.updateMenu)
  app.post('/sys/insertMenu', RouteMenu.insertMenu)

  /**
   * @description  系统管理 - 机构表 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  const RouteOrgan = require('./modules/organ')
  app.post('/sys/initOrganListData', RouteOrgan.initOrganListData)
  app.delete('/sys/deleteOrgan', RouteOrgan.deleteOrgan)
  app.get('/sys/getOrgan', RouteOrgan.getOrgan)
  app.put('/sys/updateOrgan', RouteOrgan.updateOrgan)
  app.post('/sys/insertOrgan', RouteOrgan.insertOrgan)

  /**
   * @description  系统管理 - 角色 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  const RouteRole = require('./modules/role')
  app.post('/sys/initRoleListData', RouteRole.initRoleListData)
  app.delete('/sys/deleteRole', RouteRole.deleteRole)
  app.get('/sys/getRole', RouteRole.getRole)
  app.put('/sys/updateRole', RouteRole.updateRole)
  app.post('/sys/insertRole', RouteRole.insertRole)
}
