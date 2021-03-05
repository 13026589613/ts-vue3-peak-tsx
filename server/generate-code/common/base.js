const fs = require('fs')

/**
 * @description 删除文件
 * @param path 操作地址 -> 物理地址
 */
exports.modules = {
  deleteAllFiles: (path) => {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path) // 读取路径文件集合
      files.forEach((file) => {
        const curPath = `${path}/${file}`
        if (fs.statSync(curPath).isDirectory()) {
          deleteAllFiles(curPath) // 循环删除
        } else {
          fs.unlinkSync(curPath) // 同步unlink，删除文件
        }
      })
      fs.rmdirSync(path) // 同步执行删除
    }
  },
}
