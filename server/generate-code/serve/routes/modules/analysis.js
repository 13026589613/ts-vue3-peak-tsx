
  /**
   * @description VIEW表 -> 服务 API-Node-SQL
   * @author PP
   */
  const url = require('url')
  const MySQL = require('../../../common/mysql.js')

  /**
   * 查询列表 - 获取VIEW信息列表
   */
  exports.initAnalysisListData = (req, res, next) => {
    const params = req.body
    MySQL.SQLSelect('select equipmenttype AS equipmentType, materialid AS materialId, materialname AS materialName, failurerate AS failureRate, estimatenum AS estimateNum, thirtynum AS thirtyNum, ninetynum AS ninetyNum, thirtyrate AS thirtyRate, ninetyrate AS ninetyRate, totalchangenum AS totalChangeNum, stocknum AS stockNum, monthrate AS monthRate from `fault_analysis` where materialid like ? limit ? offset ?', [`%${params.materialId || ''}%`, params.showCount , params.currentPage * params.showCount], (error, rows) => {
      if (error) {
        res.json({ message: '查询列表数据时异常(获取列表数据项)', status: 500, data: res })
      } else {
        MySQL.SQLSelect(
          'select count(*) as totalCount from `fault_analysis` where materialid like ?', [`%${params.materialId || ''}%`],
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
   * 查询信息 - 根据参数获取VIEW信息
   */
  exports.getAnalysis = (req, res, next) => {
    const urlParams = url.parse(req.url, true)
    MySQL.SQLSelect('select equipmenttype AS equipmentType, materialid AS materialId, materialname AS materialName, failurerate AS failureRate, estimatenum AS estimateNum, thirtynum AS thirtyNum, ninetynum AS ninetyNum, thirtyrate AS thirtyRate, ninetyrate AS ninetyRate, totalchangenum AS totalChangeNum, stocknum AS stockNum, monthrate AS monthRate from `fault_analysis` where equipmenttype = ?', [urlParams.query.equipmentType], (error, rows) => {
      if (error) {
        res.json({ message: '查询VIEW信息异常', status: 500, data: res })
      } else {
        res.json({ message: '成功查询VIEW信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * 修改信息 - 编辑保存VIEW信息
   */
  exports.updateAnalysis = (req, res, next) => {
    const params = req.body
    MySQL.SQLUpdate(
      '`fault_analysis`',
      {
materialid: params.materialId,
materialname: params.materialName,
failurerate: params.failureRate,
estimatenum: params.estimateNum,
thirtynum: params.thirtyNum,
ninetynum: params.ninetyNum,
thirtyrate: params.thirtyRate,
ninetyrate: params.ninetyRate,
totalchangenum: params.totalChangeNum,
stocknum: params.stockNum,
monthrate: params.monthRate,
},
      { equipmenttype: params.equipmentType },
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，编辑信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已编辑保存VIEW', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 新增信息 - 新增保存VIEW信息
   */
  exports.insertAnalysis = (req, res, next) => {
    const params = req.body
    MySQL.SQLInsert(
      '`fault_analysis`',
      {
equipmenttype: params.equipmentType,
materialid: params.materialId,
materialname: params.materialName,
failurerate: params.failureRate,
estimatenum: params.estimateNum,
thirtynum: params.thirtyNum,
ninetynum: params.ninetyNum,
thirtyrate: params.thirtyRate,
ninetyrate: params.ninetyRate,
totalchangenum: params.totalChangeNum,
stocknum: params.stockNum,
monthrate: params.monthRate,
},
      (error, rows) => {
        if (error) {
          res.json({ message: '操作异常，保存信息失败', status: 500, data: res })
        } else {
          res.json({ message: '操作成功，已新增保存VIEW', status: 200, data: rows })
        }
        res.end('is over')
      }
    )
  }

  /**
   * 删除信息 - 删除VIEW信息
   */
  exports.deleteAnalysis = (req, res, next) => {
    const params = req.body
    // MySQL.SQLSelect('delete from `fault_analysis` where equipmenttype in (?)', [params.equipmentType], (error, rows) => {
    MySQL.SQLDelete('`fault_analysis`', { equipmenttype: params.equipmentType }, (error, rows) => {
      if (error) {
        res.json({ message: '操作异常，删除信息时失败', status: 500, data: res })
      } else {
        res.json({ message: '操作成功，成功删除信息', status: 200, data: rows })
      }
      res.end('is over')
    })
  }

  /**
   * @description  VIEW 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteAnalysis = require('./modules/analysis')
  // app.post('/analysis/initAnalysisListData', RouteAnalysis.initAnalysisListData)
  // app.delete('/analysis/deleteAnalysis', RouteAnalysis.deleteAnalysis)
  // app.get('/analysis/getAnalysis', RouteAnalysis.getAnalysis)
  // app.put('/analysis/updateAnalysis', RouteAnalysis.updateAnalysis)
  // app.post('/analysis/insertAnalysis', RouteAnalysis.insertAnalysis)
  
  /**
   * @description  VIEW 服务请求 API-Node-SQL
   *               以下注释部分放置同级目录 index.js 下 解开注释重启 generate-serve, 界面中进行数据的重连
   */
  // const RouteAnalysis = require('./modules/analysis')
  // app.post('/analysis/getByList', RouteAnalysis.initAnalysisListData)
  // app.delete('/analysis/delete', RouteAnalysis.deleteAnalysis)
  // app.get('/analysis/findById', RouteAnalysis.getAnalysis)
  // app.put('/analysis/update', RouteAnalysis.updateAnalysis)
  // app.post('/analysis/save', RouteAnalysis.insertAnalysis)
