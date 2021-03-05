
  /**
   * @description 系统管理 - 系统错误日志表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取系统管理 - 系统错误日志信息列表
   */
  exports.initErrorLogListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select id AS id, name AS name, describe AS describe, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, create_role_id AS createRoleId, update_role_id AS updateRoleId from `sys_error_log` where name like ? limit ? offset ?', [`%${params.name || ''}%`, params.pageSize , params.pageNum * params.pageSize], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_error_log` where name like ?', [`%${params.name || ''}%`],
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
   * 查询信息 - 根据参数获取系统管理 - 系统错误日志信息
   */
  exports.getErrorLog = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select id AS id, name AS name, describe AS describe, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, create_role_id AS createRoleId, update_role_id AS updateRoleId from `sys_error_log` where id = ?', [urlParams.query.id], (error, rows) => {
      if (error) {
        res.json({ message: '查询系统管理 - 系统错误日志信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询系统管理 - 系统错误日志信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存系统管理 - 系统错误日志信息
   */
  exports.updateErrorLog = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`sys_error_log`',
      {
name: params.name,
describe: params.describe,
create_user_id: params.createUserId,
create_time: params.createTime,
update_user_id: params.updateUserId,
update_time: params.updateTime,
create_role_id: params.createRoleId,
update_role_id: params.updateRoleId,
},
      { id: params.id },
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已编辑保存系统管理 - 系统错误日志', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存系统管理 - 系统错误日志信息
   */
  exports.insertErrorLog = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`sys_error_log`',
      {
id: params.id,
name: params.name,
describe: params.describe,
create_user_id: params.createUserId,
create_time: params.createTime,
update_user_id: params.updateUserId,
update_time: params.updateTime,
create_role_id: params.createRoleId,
update_role_id: params.updateRoleId,
},
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已新增保存系统管理 - 系统错误日志', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除系统管理 - 系统错误日志信息
   */
  exports.deleteErrorLog = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `sys_error_log` where id in (?)', [params.id], (error, rows) => {
    MySQL.SQLDelete('`sys_error_log`', { id: params.id }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  系统管理 - 系统错误日志 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteErrorLog = require('./modules/errorLog')
  // app.post('/sys/initErrorLogListData', RouteErrorLog.initErrorLogListData)
  // app.delete('/sys/deleteErrorLog', RouteErrorLog.deleteErrorLog)
  // app.get('/sys/getErrorLog', RouteErrorLog.getErrorLog)
  // app.put('/sys/updateErrorLog', RouteErrorLog.updateErrorLog)
  // app.post('/sys/insertErrorLog', RouteErrorLog.insertErrorLog)
