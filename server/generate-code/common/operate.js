/**
 * @description 文件读写、操作、输出类
 * @author PP
 */
const fs = require('fs')
const path = require('path')

exports.module = {
  basePath: null,
  tableEntity: {},
  CapModuleName: null,
  tempPath: null,
  operateConstructor: {},
  mapParams: {},

  constructor(tableEntity, basePath, CapModuleName, tempPath, operateConstructor = {}, mapParams = {}) {
    const _this = this
    _this.tableEntity = tableEntity
    _this.basePath = basePath
    _this.CapModuleName = CapModuleName
    _this.tempPath = tempPath
    _this.operateConstructor = operateConstructor
    _this.mapParams = mapParams
    return _this
  },
  init: dirName =>
    new Promise((resolve, reject) => {
      const _this = this
      const basePath = _this.module.basePath

      if (!basePath) {
        reject('文件名 | 路径错误')
      }

      // fs.exists(basePath, exists => {
      //   if (!exists) {
      //     fs.mkdirSync(`${basePath}`, () => {
      //       resolve(true)
      //     }) // mkdir
      //   }
      //   resolve(true)
      // })
      mkdirs(basePath, () => {
        // console.log('done')
        resolve(true)
      })
    }),
  downLoad: async (templatePath, fileName, fileType, createDir = true, filePath) => {
    try {
      // create dir && cd views
      if (!fileName) {
        console.log('文件名参数错误')
        return
      }

      const _this = this
      if (filePath) _this.module.basePath = filePath

      // 创建文件夹
      await this.module.init().then(() => {
        process.chdir(`${_this.module.basePath}`) // cd

        fs.writeFileSync(
          `${fileName}.${fileType}`,
          require(_this.module.tempPath + templatePath).template(
            _this.module.tableEntity,
            _this.module.operateConstructor,
            _this.module.mapParams
          )
        ) // create

        if (!createDir) {
          // process.exit(0)
        }
      })
    } catch (e) {
      throw e
    }
  },
}

function mkdirs(dirname, callback) {
  fs.exists(dirname, function(exists) {
    if (exists) {
      // 是个目录则执行callback方法
      callback()
    } else {
      // 递归调用mkdirs
      // console.log(dirname)
      // console.log(path.dirname(dirname))

      mkdirs(path.dirname(dirname), function() {
        fs.mkdir(dirname, callback)
        console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录')
      })
    }
  })
}
