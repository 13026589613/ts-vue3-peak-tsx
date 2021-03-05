#!/usr/bin/env node
/**
 * @description 本地启动服务，测试运行打包
 *              打包时需要绝对路径打包  使用 base = '/'
 *
 */
const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

const mapParams = {} // 外部参数
process.argv.forEach((val, index, array) => {
  if (index > 1) {
    // console.log(`${index}: ${val}`)
    const valueArray = val.split('=')
    mapParams[valueArray[0]] = valueArray[1]
  }
})
console.log(mapParams)

const ports = mapParams.product_host // 服务启动端口
app.use(express.static(path.resolve(__dirname, `../${mapParams.product_name}`)))

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, `../${mapParams.product_name}/index.html`), 'utf-8')
  res.send(html)
})

app.listen(ports)
console.log(`product - ${mapParams.product_name} -> server start on ${ports}`)
