
  /**
   * @description 系统管理 - 机构表表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取系统管理 - 机构表信息列表
   */
  exports.initOrganListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select id AS id, organ_code AS organCode, organ_name AS organName, level AS level, type AS type, parent_id AS parentId, remark AS remark, del_flag AS delFlag, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime from `sys_organ` where organ_code like ? limit ? offset ?', [`%${params.organCode || ''}%`, params.pageSize , params.pageNum * params.pageSize], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_organ` where organ_code like ?', [`%${params.organCode || ''}%`],
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
   * 查询信息 - 根据参数获取系统管理 - 机构表信息
   */
  exports.getOrgan = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select id AS id, organ_code AS organCode, organ_name AS organName, level AS level, type AS type, parent_id AS parentId, remark AS remark, del_flag AS delFlag, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime from `sys_organ` where id = ?', [urlParams.query.id], (error, rows) => {
      if (error) {
        res.json({ message: '查询系统管理 - 机构表信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询系统管理 - 机构表信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存系统管理 - 机构表信息
   */
  exports.updateOrgan = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`sys_organ`',
      {
organ_code: params.organCode,
organ_name: params.organName,
level: params.level,
type: params.type,
parent_id: params.parentId,
remark: params.remark,
del_flag: params.delFlag,
create_user_id: params.createUserId,
create_time: params.createTime,
update_user_id: params.updateUserId,
update_time: params.updateTime,
},
      { id: params.id },
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已编辑保存系统管理 - 机构表', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存系统管理 - 机构表信息
   */
  exports.insertOrgan = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`sys_organ`',
      {
id: params.id,
organ_code: params.organCode,
organ_name: params.organName,
level: params.level,
type: params.type,
parent_id: params.parentId,
remark: params.remark,
del_flag: params.delFlag,
create_user_id: params.createUserId,
create_time: params.createTime,
update_user_id: params.updateUserId,
update_time: params.updateTime,
},
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已新增保存系统管理 - 机构表', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除系统管理 - 机构表信息
   */
  exports.deleteOrgan = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `sys_organ` where id in (?)', [params.id], (error, rows) => {
    MySQL.SQLDelete('`sys_organ`', { id: params.id }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  系统管理 - 机构表 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteOrgan = require('./modules/organ')
  // app.post('/sys/initOrganListData', RouteOrgan.initOrganListData)
  // app.delete('/sys/deleteOrgan', RouteOrgan.deleteOrgan)
  // app.get('/sys/getOrgan', RouteOrgan.getOrgan)
  // app.put('/sys/updateOrgan', RouteOrgan.updateOrgan)
  // app.post('/sys/insertOrgan', RouteOrgan.insertOrgan)
