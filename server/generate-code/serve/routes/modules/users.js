/**
 * @description 用户 API-Node-SQL
 * @author PP
 */
const url = require('url')
const MySQL = require('../../../common/mysql.js')

/**
 * 查询列表 - 获取用户信息列表
 */
exports.initUserTableListData = (req, res, next) => {
  const params = req.body
  // params.name = params.name || ''
  MySQL.SQLSelect('select * from `sys-user-table` where name like ?', [`%${params.name || ''}%`], (error, rows) => {
    if (error) {
      res.json({ message: '查询异常', status: 500, data: res })
    } else {
      res.json({ message: '查询成功', status: 200, data: rows })
    }
    res.end('is over')
  })
}

/**
 * 查询信息 - 根据参数获取用户信息
 */
exports.getUserTable = (req, res, next) => {
  const urlParams = url.parse(req.url, true)
  MySQL.SQLSelect('select * from `sys-user-table` where id = ?', [urlParams.query.id], (error, rows) => {
    if (error) {
      res.json({ message: '查询异常', status: 500, data: res })
    } else {
      res.json({ message: '查询成功', status: 200, data: rows })
    }
    res.end('is over')
  })
}

/**
 * 修改信息 - 编辑保存用户信息
 */
exports.updateUserTable = (req, res, next) => {
  const params = req.body
  MySQL.SQLUpdate(
    '`sys-user-table`',
    {
      name: params.name,
      sex: params.sex,
      age: params.age,
      text: params.text,
      time: params.time,
      date: params.date,
    },
    { id: params.id },
    (error, rows) => {
      if (error) {
        res.json({ message: '查询异常', status: 500, data: res })
      } else {
        res.json({ message: '查询成功', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 新增信息 - 新增保存用户信息
 */
exports.insertUserTable = (req, res, next) => {
  const params = req.body
  MySQL.SQLInsert(
    '`sys-user-table`',
    {
      id: params.id,
      name: params.name,
      sex: params.sex,
      age: params.age,
      text: params.text,
      time: params.time,
      date: params.date,
    },
    (error, rows) => {
      if (error) {
        res.json({ message: '查询异常', status: 500, data: res })
      } else {
        res.json({ message: '查询成功', status: 200, data: rows })
      }
      res.end('is over')
    }
  )
}

/**
 * 删除信息 - 删除用户信息
 */
exports.deleteUserTable = (req, res, next) => {
  const params = req.body
  // MySQL.SQLSelect('delete from `sys-user-table` where id in (?)', [params.id], (error, rows) => {
  MySQL.SQLDelete('`sys-user-table`', { id: params.id }, (error, rows) => {
    if (error) {
      res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
    } else {
      res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
    }
    res.end('is over')
  })
}

/** @description 用户 服务请求 API-Node-SQL -- 开始 */
/** @description 以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连 */
// app.post('/sys/initUserTableListData', RouteUser.initUserTableListData)
// app.delete('/sys/deleteUserTable', RouteUser.deleteUserTable)
// app.get('/sys/getUserTable', RouteUser.getUserTable)
// app.put('/sys/updateUserTable', RouteUser.updateUserTable)
// app.post('/sys/insertUserTable', RouteUser.insertUserTable)
/** @description 用户 服务请求 API-Node-SQL -- 结束 */
