#!/usr/bin/env node
/**
 * @description 自动化部署脚本 - 编辑jenkins build 发布部署在线代码服务。
 *              本地发布部署脚本远程调用Jenkins后执行Shell脚本执行远程指定节点部署
 * @author PP
 */
const argparse = require('argparse')

// 扩展参数槽
const parser = new argparse.ArgumentParser({
  version: '1.0.0',
  description: 'jenkins 自动化部署 参数扩展.',
})

parser.addArgument(['-host', '--host'], {
  help: 'jenkins服务地址携带端口号.例如：192.168.1.126:1111',
  defaultValue: null,
  type: 'string',
})
parser.addArgument(['-user', '--jenkins_user'], {
  help: 'jenkins登录用户.admin',
  defaultValue: 'admin',
  type: 'string',
})
parser.addArgument(['-pwd', '--jenkins_password'], {
  help: 'jenkins登录密码.kr895623',
  defaultValue: 'kr895623',
  type: 'string',
})
parser.addArgument(['-jb', '--job_name'], {
  help: 'jenkins 任务item对象名称.mg-vue-ts',
  defaultValue: null,
  type: 'string',
})
parser.addArgument(['-gb', '--git_branch'], {
  help: '需要打包的git分支，如：origin/master',
  defaultValue: null,
  type: 'string',
})

parser.addArgument('test', {
  metavar: 'TEST',
  nargs: 1,
  help: '用于传递字符串.',
})

// 参数 namesapce 空间对象
const args = parser.parseArgs()

// 参数赋值
const token = {
  user: args.jenkins_user, // jenkins服务器用户名 root
  password: args.jenkins_password, // 密码 123456
}

const host = args.host // jenkins 服务地址192.168.1.126:1111
const job_name = args.job_name // job-name-> jenkins items（mg-vue-ts）
const baseUrl = `http://${token.user}:${token.password}@${host}` // build 请求

// git 服务分支
const gitBranch = args.git_branch

// crumbIssuer 默认false, true 启用CSRF保护支持
const jenkins = require('jenkins')({ baseUrl, crumbIssuer: false })

/**
 * @description jenkins.job.build() 方法发版
 * @param parameters 传递执行脚本的参数
 */
jenkins.job.build(
  {
    name: job_name,
    parameters: {
      git_branch: gitBranch,
    },
    token: job_name,
  },
  (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('queue item number', data)

    setTimeout(() => {
      /**
       * @description 查看发版状态, 执行 build 之后
       * @param jenkins.job.get() 获取当前 job 的信息。data.lastBuild.number 可以拿到最后一个 build 的 number，最后一个 build 也就是我们刚刚触发的 build。
       * @param jenkins.build.get() 获取当前 build 的信息。data.result 获取当前 build 的结果
       */
      jenkins.job.get(job_name, (err, data) => {
        if (err) throw err

        if (data && data.lastBuild) {
          const lastBuildNumber = data.lastBuild.number
          console.log('last build number', lastBuildNumber)

          jenkins.build.get(job_name, lastBuildNumber, (err, data) => {
            if (err) throw err
            console.log('last build result', data.result)
            // console.log('last build info', data)
          })
        } else {
          console.log('暂无编译记录')
        }
      })
    }, 3000)
  }
)
