
  /**
   * @description 系统管理 - 菜单管理表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取系统管理 - 菜单管理信息列表
   */
  exports.initMenuListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select menu_id AS menuId, parent_id AS parentId, name AS name, url AS url, perms AS perms, type AS type, icon AS icon, order_num AS orderNum from `sys_menu` where parent_id like ? limit ? offset ?', [`%${params.parentId || ''}%`, params.pageSize , params.pageNum * params.pageSize], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `sys_menu` where parent_id like ?', [`%${params.parentId || ''}%`],
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
   * 查询信息 - 根据参数获取系统管理 - 菜单管理信息
   */
  exports.getMenu = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select menu_id AS menuId, parent_id AS parentId, name AS name, url AS url, perms AS perms, type AS type, icon AS icon, order_num AS orderNum from `sys_menu` where menu_id = ?', [urlParams.query.menuId], (error, rows) => {
      if (error) {
        res.json({ message: '查询系统管理 - 菜单管理信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询系统管理 - 菜单管理信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存系统管理 - 菜单管理信息
   */
  exports.updateMenu = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`sys_menu`',
      {
parent_id: params.parentId,
name: params.name,
url: params.url,
perms: params.perms,
type: params.type,
icon: params.icon,
order_num: params.orderNum,
},
      { menu_id: params.menuId },
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已编辑保存系统管理 - 菜单管理', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存系统管理 - 菜单管理信息
   */
  exports.insertMenu = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`sys_menu`',
      {
menu_id: params.menuId,
parent_id: params.parentId,
name: params.name,
url: params.url,
perms: params.perms,
type: params.type,
icon: params.icon,
order_num: params.orderNum,
},
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已新增保存系统管理 - 菜单管理', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除系统管理 - 菜单管理信息
   */
  exports.deleteMenu = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `sys_menu` where menu_id in (?)', [params.menuId], (error, rows) => {
    MySQL.SQLDelete('`sys_menu`', { menu_id: params.menuId }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  系统管理 - 菜单管理 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteMenu = require('./modules/menu')
  // app.post('/sys/initMenuListData', RouteMenu.initMenuListData)
  // app.delete('/sys/deleteMenu', RouteMenu.deleteMenu)
  // app.get('/sys/getMenu', RouteMenu.getMenu)
  // app.put('/sys/updateMenu', RouteMenu.updateMenu)
  // app.post('/sys/insertMenu', RouteMenu.insertMenu)
