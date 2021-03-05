/**
 * @description 代码服务器部署 - 本地生产配置服务
 * @author PP
 */

/**
 * @description 生产远程服务部署配置shell文件的配置代码
 *              根据表单写入 ops-deploy.conf文件配置，用于代码部署服务
 */
exports.initDeployTemplate = (req, res, next) => {
  const params = req.body
  const productTemp = require('../product-temp.js')
  productTemp.initDeployTemplate(params).then(data => {
    res.json({ message: data.message, status: data.status ? 200 : 500, data: data.status })
  })
}

/**
 * @description 执行远程服务器部署指令
 *              根据制定服务器的密码等信息执行部署指令
 */
exports.codeServeDeploy = (req, res, next) => {
  const exec = require('child_process').exec
  const params = req.body

  // const serverCode = `npm run jenkins-serve -- -host '${params.host}' -user '${params.user}' -pwd '${params.pwd}' -jb '${params.jobName}'`
  const serverCode = `npm run jenkins-serve -- -host '${params.host}' -user '${params.user}' -pwd '${params.pwd}' -jb '${params.jobName}' -gb '${params.gitBranch}' test_string`
  const child = exec(serverCode, (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    if (err) {
      res.json({ message: '服务器异常', status: 500, data: err })
      throw err
    }
    res.json({ message: '部署服务已发送响应', status: 200, data: null })
  })
}

/**
 * @description 测试指令
 */
exports.codeServeDeployTest = (req, res, next) => {
  const exec = require('child_process').exec
  const params = req.body

  const serverCode =
    'pm2 start /${source_path/node_sever.js} -o /${path}/run.log-e /${path}/error.log --name=${name} -- node_params_1={$params} node_params_2={$params}'
  const child = exec(serverCode, (err, stdout, stderr) => {
    console.log(stdout)
    console.log('stderr', stderr)
    if (err) {
      res.json({ message: '服务器异常', status: 500, data: err })
      throw err
    }
    res.json({ message: '部署服务已发送响应', status: 200, data: stdout })
  })
}
