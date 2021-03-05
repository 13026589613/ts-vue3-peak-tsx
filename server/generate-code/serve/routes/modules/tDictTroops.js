
  /**
   * @description 停用 - （现在部队目录使用sys_organ表，此表暂不使用）表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息列表
   */
  exports.initTDictTroopsListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select id AS id, parent_id AS parentId, level AS level, unit_no AS unitNo, unit_code AS unitCode, unit_name AS unitName, superior_name AS superiorName, unit_type AS unitType, brigade_type AS brigadeType, unit_address AS unitAddress, gis_info AS gisInfo, contacts AS contacts, telephone AS telephone, system_no AS systemNo, remark AS remark, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, create_role_id AS createRoleId, update_role_id AS updateRoleId from `old_t_dict_troops` where parent_id like ? limit ? offset ?', [`%${params.parentId || ''}%`, params.showCount , params.currentPage * params.showCount], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `old_t_dict_troops` where parent_id like ?', [`%${params.parentId || ''}%`],
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
   * 查询信息 - 根据参数获取停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息
   */
  exports.getTDictTroops = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select id AS id, parent_id AS parentId, level AS level, unit_no AS unitNo, unit_code AS unitCode, unit_name AS unitName, superior_name AS superiorName, unit_type AS unitType, brigade_type AS brigadeType, unit_address AS unitAddress, gis_info AS gisInfo, contacts AS contacts, telephone AS telephone, system_no AS systemNo, remark AS remark, create_user_id AS createUserId, create_time AS createTime, update_user_id AS updateUserId, update_time AS updateTime, create_role_id AS createRoleId, update_role_id AS updateRoleId from `old_t_dict_troops` where id = ?', [urlParams.query.id], (error, rows) => {
      if (error) {
        res.json({ message: '查询停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息
   */
  exports.updateTDictTroops = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`old_t_dict_troops`',
      {
parent_id: params.parentId,
level: params.level,
unit_no: params.unitNo,
unit_code: params.unitCode,
unit_name: params.unitName,
superior_name: params.superiorName,
unit_type: params.unitType,
brigade_type: params.brigadeType,
unit_address: params.unitAddress,
gis_info: params.gisInfo,
contacts: params.contacts,
telephone: params.telephone,
system_no: params.systemNo,
remark: params.remark,
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
          res.json({ message: '操作成功，已编辑保存停用 - （现在部队目录使用sys_organ表，此表暂不使用）', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息
   */
  exports.insertTDictTroops = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`old_t_dict_troops`',
      {
id: params.id,
parent_id: params.parentId,
level: params.level,
unit_no: params.unitNo,
unit_code: params.unitCode,
unit_name: params.unitName,
superior_name: params.superiorName,
unit_type: params.unitType,
brigade_type: params.brigadeType,
unit_address: params.unitAddress,
gis_info: params.gisInfo,
contacts: params.contacts,
telephone: params.telephone,
system_no: params.systemNo,
remark: params.remark,
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
          res.json({ message: '操作成功，已新增保存停用 - （现在部队目录使用sys_organ表，此表暂不使用）', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除停用 - （现在部队目录使用sys_organ表，此表暂不使用）信息
   */
  exports.deleteTDictTroops = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `old_t_dict_troops` where id in (?)', [params.id], (error, rows) => {
    MySQL.SQLDelete('`old_t_dict_troops`', { id: params.id }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  停用 - （现在部队目录使用sys_organ表，此表暂不使用） 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteTDictTroops = require('./modules/tDictTroops')
  // app.post('/tDictTroops/initTDictTroopsListData', RouteTDictTroops.initTDictTroopsListData)
  // app.delete('/tDictTroops/deleteTDictTroops', RouteTDictTroops.deleteTDictTroops)
  // app.get('/tDictTroops/getTDictTroops', RouteTDictTroops.getTDictTroops)
  // app.put('/tDictTroops/updateTDictTroops', RouteTDictTroops.updateTDictTroops)
  // app.post('/tDictTroops/insertTDictTroops', RouteTDictTroops.insertTDictTroops)
  
  /**
   * @description  停用 - （现在部队目录使用sys_organ表，此表暂不使用） 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteTDictTroops = require('./modules/tDictTroops')
  // app.post('/tDictTroops/getByList', RouteTDictTroops.initTDictTroopsListData)
  // app.delete('/tDictTroops/delete', RouteTDictTroops.deleteTDictTroops)
  // app.get('/tDictTroops/findById', RouteTDictTroops.getTDictTroops)
  // app.put('/tDictTroops/update', RouteTDictTroops.updateTDictTroops)
  // app.post('/tDictTroops/save', RouteTDictTroops.insertTDictTroops)
