
  /**
   * @description 字典 - 基本代码档表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取字典 - 基本代码档信息列表
   */
  exports.initBaseCodeListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select id AS id, parent_id AS parentId, level AS level, type AS type, category AS category, code_no AS codeNo, code_name AS codeName, code_seq AS codeSeq, remark AS remark, organrank AS organRank, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, create_role_id AS createRoleId, update_role_id AS updateRoleId from `sys_base_code` where parent_id like ? limit ? offset ?', [`%${params.parentId || ''}%`, params.showCount , params.currentPage * params.showCount], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_base_code` where parent_id like ?', [`%${params.parentId || ''}%`],
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
   * 查询信息 - 根据参数获取字典 - 基本代码档信息
   */
  exports.getBaseCode = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select id AS id, parent_id AS parentId, level AS level, type AS type, category AS category, code_no AS codeNo, code_name AS codeName, code_seq AS codeSeq, remark AS remark, organrank AS organRank, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, create_role_id AS createRoleId, update_role_id AS updateRoleId from `sys_base_code` where id = ?', [urlParams.query.id], (error, rows) => {
      if (error) {
        res.json({ message: '查询字典 - 基本代码档信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询字典 - 基本代码档信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存字典 - 基本代码档信息
   */
  exports.updateBaseCode = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`sys_base_code`',
      {
parent_id: params.parentId,
level: params.level,
type: params.type,
category: params.category,
code_no: params.codeNo,
code_name: params.codeName,
code_seq: params.codeSeq,
remark: params.remark,
organrank: params.organRank,
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
          res.json({ message: '操作成功，已编辑保存字典 - 基本代码档', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存字典 - 基本代码档信息
   */
  exports.insertBaseCode = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`sys_base_code`',
      {
id: params.id,
parent_id: params.parentId,
level: params.level,
type: params.type,
category: params.category,
code_no: params.codeNo,
code_name: params.codeName,
code_seq: params.codeSeq,
remark: params.remark,
organrank: params.organRank,
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
          res.json({ message: '操作成功，已新增保存字典 - 基本代码档', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除字典 - 基本代码档信息
   */
  exports.deleteBaseCode = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `sys_base_code` where id in (?)', [params.id], (error, rows) => {
    MySQL.SQLDelete('`sys_base_code`', { id: params.id }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  字典 - 基本代码档 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteBaseCode = require('./modules/baseCode')
  // app.post('/baseCode/initBaseCodeListData', RouteBaseCode.initBaseCodeListData)
  // app.delete('/baseCode/deleteBaseCode', RouteBaseCode.deleteBaseCode)
  // app.get('/baseCode/getBaseCode', RouteBaseCode.getBaseCode)
  // app.put('/baseCode/updateBaseCode', RouteBaseCode.updateBaseCode)
  // app.post('/baseCode/insertBaseCode', RouteBaseCode.insertBaseCode)
  
  /**
   * @description  字典 - 基本代码档 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteBaseCode = require('./modules/baseCode')
  // app.post('/baseCode/getByList', RouteBaseCode.initBaseCodeListData)
  // app.delete('/baseCode/delete', RouteBaseCode.deleteBaseCode)
  // app.get('/baseCode/findById', RouteBaseCode.getBaseCode)
  // app.put('/baseCode/update', RouteBaseCode.updateBaseCode)
  // app.post('/baseCode/save', RouteBaseCode.insertBaseCode)
