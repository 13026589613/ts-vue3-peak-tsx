#!/bin/sh
#执行服务器部署过程
#获取环境名
echo '开始执行 - 项目服务部署'
echo '脚本配置 - 读取配置参数 - 兼容不同系统 - 采用传参方式'
product_host=$1
product_name=$2
product_source_path=$3
product_serivce_path=$4
product_log_path=$5
product_script_name=$6

echo '防止express服务无安装'
cd ${product_serivce_path}/${product_name}
cnpm install express --save

echo '打包迁移 - 可进行正常部署，关闭占用端口号：'${product_host}
xl_close_port -p ${product_host}
pm2 stop node-${product_name}
pm2 delete node-${product_name}

echo '服务容器部署 - 执行PM部署，部署端口号:'${product_host}
pm2 start ${product_serivce_path}/${product_name}/${product_script_name} -o ${product_log_path}/${product_name}-run.log -e ${product_log_path}/${product_name}-error.log --name=node-${product_name} -- product_name=${product_name} product_host=${product_host}
#node ./${product_name}/${product_script_name} -- product_name=${product_name} product_host=${product_host} > ${product_log_path}/${product_name}.log 2>&1 &
echo '------------- 项目启动端口: '${product_host}', WEB-VUE项目部署成功 -------------'