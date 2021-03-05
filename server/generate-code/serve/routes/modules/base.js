/**
 * @description 字典-基本代码档表 -> 服务 API-Node-SQL
 * @author PP
 */
const url = require('url')
const MySQL = require('../../../common/mysql.js')

/**
 * 查询列表 - 获取字典-基本代码档信息列表
 */
exports.initBaseListData = (req, res, next) => {
  const params = req.body
  MySQL.SQLSelect(
    'select id AS id, category AS category, code_no AS codeNo, code_name AS codeName, code_seq AS codeSeq, code_remark AS codeRemark, code_text AS codeText, code_value AS codeValue, data_status AS dataStatus, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, del_flag AS delFlag from `code_base` where category like ? limit ? offset ?',
    [`%${params.category || ''}%`, params.pageSize, params.pageNum * params.pageSize],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `code_base` where category like ?',
          [`%${params.category || ''}%`],
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
 * 查询信息 - 根据参数获取字典-基本代码档信息
 */
exports.getBase = (req, res, next) => {
  const urlParams = url.parse(req.url, true)
  MySQL.SQLSelect(
    'select id AS id, category AS category, code_no AS codeNo, code_name AS codeName, code_seq AS codeSeq, code_remark AS codeRemark, code_text AS codeText, code_value AS codeValue, data_status AS dataStatus, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, del_flag AS delFlag from `code_base` where id = ?',
    [urlParams.query.id],
    (error, rows) => {
      if (error) {
        res.json({ message: '查询字典-基本代码档信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询字典-基本代码档信息', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 修改信息 - 编辑保存字典-基本代码档信息
 */
exports.updateBase = (req, res, next) => {
  const params = req.body
  MySQL.SQLUpdate(
    '`code_base`',
    {
      category: params.category,
      code_no: params.codeNo,
      code_name: params.codeName,
      code_seq: params.codeSeq,
      code_remark: params.codeRemark,
      code_text: params.codeText,
      code_value: params.codeValue,
      data_status: params.dataStatus,
      create_user_id: params.createUserId,
      create_time: params.createTime,
      update_user_id: params.updateUserId,
      update_time: params.updateTime,
      del_flag: params.delFlag,
    },
    { id: params.id },
    (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，已编辑保存字典-基本代码档', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 新增信息 - 新增保存字典-基本代码档信息
 */
exports.insertBase = (req, res, next) => {
  const params = req.body
  MySQL.SQLInsert(
    '`code_base`',
    {
      id: params.id,
      category: params.category,
      code_no: params.codeNo,
      code_name: params.codeName,
      code_seq: params.codeSeq,
      code_remark: params.codeRemark,
      code_text: params.codeText,
      code_value: params.codeValue,
      data_status: params.dataStatus,
      create_user_id: params.createUserId,
      create_time: params.createTime,
      update_user_id: params.updateUserId,
      update_time: params.updateTime,
      del_flag: params.delFlag,
    },
    (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，已新增保存字典-基本代码档', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 删除信息 - 删除字典-基本代码档信息
 */
exports.deleteBase = (req, res, next) => {
  const params = req.body
  // MySQL.SQLSelect('delete from `code_base` where id in (?)', [params.id], (error, rows) => {
  MySQL.SQLDelete('`code_base`', { id: params.id }, (error, rows) => {
    if (error) {
      res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
    } else {
      res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
    }
    res.end('is over')
  })
}

/**
 * @description  字典-基本代码档 服务请求 API-Node-SQL
 *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
 */
// const RouteBase = require('./modules/base')
// app.post('/code/initBaseListData', RouteBase.initBaseListData)
// app.delete('/code/deleteBase', RouteBase.deleteBase)
// app.get('/code/getBase', RouteBase.getBase)
// app.put('/code/updateBase', RouteBase.updateBase)
// app.post('/code/insertBase', RouteBase.insertBase)
