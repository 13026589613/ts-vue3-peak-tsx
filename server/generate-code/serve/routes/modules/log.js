
  /**
   * @description 系统管理 - 系统日志表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取系统管理 - 系统日志信息列表
   */
  exports.initLogListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select id AS id, operation_module AS operationModule, method AS method, params AS params, ip AS ip, operation_describe AS operationDescribe, method_describe AS methodDescribe, create_user_id AS createUserId, create_time AS createTime from `sys_log` where operation_module like ? limit ? offset ?', [`%${params.operationModule || ''}%`, params.pageSize , params.pageNum * params.pageSize], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_log` where operation_module like ?', [`%${params.operationModule || ''}%`],
          (totalError, total) => {
            if (totalError) {
              res.json({ message: '查询列表数据时异常(获取总数量)', status: 500, data: res })
            } else {
              res.json({ message: '成功获取列表数据', status: 200, data: { rows, total: total[0].totalCount } })
            }
            res.end('is over')
          }
        )
      }
    })
  }

  /**
   * 查询信息 - 根据参数获取系统管理 - 系统日志信息
   */
  exports.getLog = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select id AS id, operation_module AS operationModule, method AS method, params AS params, ip AS ip, operation_describe AS operationDescribe, method_describe AS methodDescribe, create_user_id AS createUserId, create_time AS createTime from `sys_log` where id = ?', [urlParams.query.id], (error, rows) => {
      if (error) {
        res.json({ message: '查询系统管理 - 系统日志信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询系统管理 - 系统日志信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存系统管理 - 系统日志信息
   */
  exports.updateLog = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`sys_log`',
      {
operation_module: params.operationModule,
method: params.method,
params: params.params,
ip: params.ip,
operation_describe: params.operationDescribe,
method_describe: params.methodDescribe,
create_user_id: params.createUserId,
create_time: params.createTime,
},
      { id: params.id },
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已编辑保存系统管理 - 系统日志', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存系统管理 - 系统日志信息
   */
  exports.insertLog = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`sys_log`',
      {
id: params.id,
operation_module: params.operationModule,
method: params.method,
params: params.params,
ip: params.ip,
operation_describe: params.operationDescribe,
method_describe: params.methodDescribe,
create_user_id: params.createUserId,
create_time: params.createTime,
},
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已新增保存系统管理 - 系统日志', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除系统管理 - 系统日志信息
   */
  exports.deleteLog = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `sys_log` where id in (?)', [params.id], (error, rows) => {
    MySQL.SQLDelete('`sys_log`', { id: params.id }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  系统管理 - 系统日志 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteLog = require('./modules/log')
  // app.post('/sys/initLogListData', RouteLog.initLogListData)
  // app.delete('/sys/deleteLog', RouteLog.deleteLog)
  // app.get('/sys/getLog', RouteLog.getLog)
  // app.put('/sys/updateLog', RouteLog.updateLog)
  // app.post('/sys/insertLog', RouteLog.insertLog)
