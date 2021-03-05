/**
 * @description 字典 - 要素基本代码档表 -> 服务 API-Node-SQL
 * @author PP
 */
const url = require('url')
const MySQL = require('../../../common/mysql.js')

/**
 * 查询列表 - 获取字典 - 要素基本代码档信息列表
 */
exports.initElementCodeListData = (req, res, next) => {
  const params = req.body
  MySQL.SQLSelect(
    'select id AS id, parent_id AS parentId, level AS level, category AS category, name AS name, type AS type, order_num AS orderNum, remark AS remark, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime from `t_element_code` where parent_id like ? limit ? offset ?',
    [`%${params.parentId || ''}%`, params.pageSize, params.pageNum * params.pageSize],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `t_element_code` where parent_id like ?',
          [`%${params.parentId || ''}%`],
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
 * 查询信息 - 根据参数获取字典 - 要素基本代码档信息
 */
exports.getElementCode = (req, res, next) => {
  const urlParams = url.parse(req.url, true)
  MySQL.SQLSelect(
    'select id AS id, parent_id AS parentId, level AS level, category AS category, name AS name, type AS type, order_num AS orderNum, remark AS remark, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime from `t_element_code` where id = ?',
    [urlParams.query.id],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询字典 - 要素基本代码档信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询字典 - 要素基本代码档信息', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 修改信息 - 编辑保存字典 - 要素基本代码档信息
 */
exports.updateElementCode = (req, res, next) => {
  const params = req.body
  MySQL.SQLUpdate(
    '`t_element_code`',
    {
      parent_id: params.parentId,
      level: params.level,
      category: params.category,
      name: params.name,
      type: params.type,
      order_num: params.orderNum,
      remark: params.remark,
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
        res.json({ message: '操作成功，已编辑保存字典 - 要素基本代码档', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 新增信息 - 新增保存字典 - 要素基本代码档信息
 */
exports.insertElementCode = (req, res, next) => {
  const params = req.body
  MySQL.SQLInsert(
    '`t_element_code`',
    {
      id: params.id,
      parent_id: params.parentId,
      level: params.level,
      category: params.category,
      name: params.name,
      type: params.type,
      order_num: params.orderNum,
      remark: params.remark,
      create_user_id: params.createUserId,
      create_time: params.createTime,
      update_user_id: params.updateUserId,
      update_time: params.updateTime,
    },
    (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，已新增保存字典 - 要素基本代码档', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 删除信息 - 删除字典 - 要素基本代码档信息
 */
exports.deleteElementCode = (req, res, next) => {
  const params = req.body
  // MySQL.SQLSelect('delete from `t_element_code` where id in (?)', [params.id], (error, rows) => {
  MySQL.SQLDelete('`t_element_code`', { id: params.id }, (error, rows) => {
    if (error) {
      res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
    } else {
      res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
    }
    res.end('is over')
  })
}

/**
 * @description  字典 - 要素基本代码档 服务请求 API-Node-SQL
 *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
 */
// const RouteElementCode = require('./modules/elementCode')
// app.post('/t/initElementCodeListData', RouteElementCode.initElementCodeListData)
// app.delete('/t/deleteElementCode', RouteElementCode.deleteElementCode)
// app.get('/t/getElementCode', RouteElementCode.getElementCode)
// app.put('/t/updateElementCode', RouteElementCode.updateElementCode)
// app.post('/t/insertElementCode', RouteElementCode.insertElementCode)
