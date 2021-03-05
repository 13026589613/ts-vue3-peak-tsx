/**
 * @description 系统管理 - 系统用户表 -> 服务 API-Node-SQL
 * @author PP
 */
const url = require('url')
const MySQL = require('../../../common/mysql.js')

/**
 * 查询列表 - 获取系统管理 - 系统用户信息列表
 */
exports.initUserListData = (req, res, next) => {
  const params = req.body
  MySQL.SQLSelect(
    'select user_id AS userId, organ_id AS organId, dept_id AS deptId, username AS username, password AS password, salt AS salt, name AS name, email AS email, mobile AS mobile, status AS status, create_user_id AS createUserId, create_time AS createTime from `sys_user` where organ_id like ? limit ? offset ?',
    [`%${params.organId || ''}%`, params.pageSize, params.pageNum * params.pageSize],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_user` where organ_id like ?',
          [`%${params.organId || ''}%`],
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
    }
  )
}

/**
 * 查询信息 - 根据参数获取系统管理 - 系统用户信息
 */
exports.getUser = (req, res, next) => {
  const urlParams = url.parse(req.url, true)
  MySQL.SQLSelect(
    'select user_id AS userId, organ_id AS organId, dept_id AS deptId, username AS username, password AS password, salt AS salt, name AS name, email AS email, mobile AS mobile, status AS status, create_user_id AS createUserId, create_time AS createTime from `sys_user` where user_id = ?',
    [urlParams.query.userId],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询系统管理 - 系统用户信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询系统管理 - 系统用户信息', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 修改信息 - 编辑保存系统管理 - 系统用户信息
 */
exports.updateUser = (req, res, next) => {
  const params = req.body
  MySQL.SQLUpdate(
    '`sys_user`',
    {
      organ_id: params.organId,
      dept_id: params.deptId,
      username: params.username,
      password: params.password,
      salt: params.salt,
      name: params.name,
      email: params.email,
      mobile: params.mobile,
      status: params.status,
      create_user_id: params.createUserId,
      create_time: params.createTime,
    },
    { user_id: params.userId },
    (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，已编辑保存系统管理 - 系统用户', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 新增信息 - 新增保存系统管理 - 系统用户信息
 */
exports.insertUser = (req, res, next) => {
  const params = req.body
  MySQL.SQLInsert(
    '`sys_user`',
    {
      user_id: params.userId,
      organ_id: params.organId,
      dept_id: params.deptId,
      username: params.username,
      password: params.password,
      salt: params.salt,
      name: params.name,
      email: params.email,
      mobile: params.mobile,
      status: params.status,
      create_user_id: params.createUserId,
      create_time: params.createTime,
    },
    (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，已新增保存系统管理 - 系统用户', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 删除信息 - 删除系统管理 - 系统用户信息
 */
exports.deleteUser = (req, res, next) => {
  const params = req.body
  // MySQL.SQLSelect('delete from `sys_user` where user_id in (?)', [params.userId], (error, rows) => {
  MySQL.SQLDelete('`sys_user`', { user_id: params.userId }, (error, rows) => {
    if (error) {
      res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
    } else {
      res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
    }
    res.end('is over')
  })
}

/**
 * @description  系统管理 - 系统用户 服务请求 API-Node-SQL
 *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
 */
// const RouteUser = require('./modules/user')
// app.post('/sys/initUserListData', RouteUser.initUserListData)
// app.delete('/sys/deleteUser', RouteUser.deleteUser)
// app.get('/sys/getUser', RouteUser.getUser)
// app.put('/sys/updateUser', RouteUser.updateUser)
// app.post('/sys/insertUser', RouteUser.insertUser)
