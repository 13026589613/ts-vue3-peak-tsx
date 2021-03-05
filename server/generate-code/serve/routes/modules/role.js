
  /**
   * @description 系统管理 - 角色表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取系统管理 - 角色信息列表
   */
  exports.initRoleListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select role_id AS roleId, role_name AS roleName, remark AS remark, create_user_id AS createUserId, create_time AS createTime, role_code AS roleCode from `sys_role` where role_name like ? limit ? offset ?', [`%${params.roleName || ''}%`, params.pageSize , params.pageNum * params.pageSize], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_role` where role_name like ?', [`%${params.roleName || ''}%`],
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
   * 查询信息 - 根据参数获取系统管理 - 角色信息
   */
  exports.getRole = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select role_id AS roleId, role_name AS roleName, remark AS remark, create_user_id AS createUserId, create_time AS createTime, role_code AS roleCode from `sys_role` where role_id = ?', [urlParams.query.roleId], (error, rows) => {
      if (error) {
        res.json({ message: '查询系统管理 - 角色信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询系统管理 - 角色信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存系统管理 - 角色信息
   */
  exports.updateRole = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`sys_role`',
      {
role_name: params.roleName,
remark: params.remark,
create_user_id: params.createUserId,
create_time: params.createTime,
role_code: params.roleCode,
},
      { role_id: params.roleId },
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已编辑保存系统管理 - 角色', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存系统管理 - 角色信息
   */
  exports.insertRole = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`sys_role`',
      {
role_id: params.roleId,
role_name: params.roleName,
remark: params.remark,
create_user_id: params.createUserId,
create_time: params.createTime,
role_code: params.roleCode,
},
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已新增保存系统管理 - 角色', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除系统管理 - 角色信息
   */
  exports.deleteRole = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `sys_role` where role_id in (?)', [params.roleId], (error, rows) => {
    MySQL.SQLDelete('`sys_role`', { role_id: params.roleId }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  系统管理 - 角色 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteRole = require('./modules/role')
  // app.post('/sys/initRoleListData', RouteRole.initRoleListData)
  // app.delete('/sys/deleteRole', RouteRole.deleteRole)
  // app.get('/sys/getRole', RouteRole.getRole)
  // app.put('/sys/updateRole', RouteRole.updateRole)
  // app.post('/sys/insertRole', RouteRole.insertRole)
