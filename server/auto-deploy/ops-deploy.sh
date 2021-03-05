#!/bin/sh
#执行服务器打包和迁移分发过程 */master
#获取环境名
echo '开始执行 - WEB-VUE 项目部署脚本'
env=''
if [ x$1 != x ];then
    env=$1
else
    env='prod'
fi

echo "脚本响应 - 参数"$1

echo '脚本配置 - 读取配置文件:'
deploy_branch=`sed '/^'${env}_branch'=/!d;s/.*=//' ops-deploy.conf`
deploy_host=`sed '/^'${env}_host'=/!d;s/.*=//' ops-deploy.conf`
deploy_user=`sed '/^'${env}_user'=/!d;s/.*=//' ops-deploy.conf`
deploy_path=`sed '/^'${env}_path'=/!d;s/.*=//' ops-deploy.conf`

product_server_ip=`sed '/^'product_server_ip'=/!d;s/.*=//' ops-deploy.conf`
product_server_password=`sed '/^'product_server_password'=/!d;s/.*=//' ops-deploy.conf`

product_host=`sed '/^'product_host'=/!d;s/.*=//' ops-deploy.conf`
product_name=`sed '/^'product_name'=/!d;s/.*=//' ops-deploy.conf`
product_source_path=`sed '/^'product_source_path'=/!d;s/.*=//' ops-deploy.conf`
product_serivce_path=`sed '/^'product_serivce_path'=/!d;s/.*=//' ops-deploy.conf`
product_log_path=`sed '/^'product_log_path'=/!d;s/.*=//' ops-deploy.conf`
product_script_name=`sed '/^'product_script_name'=/!d;s/.*=//' ops-deploy.conf`
linux_node_modules_path=`sed '/^'linux_node_modules_path'=/!d;s/.*=//' ops-deploy.conf`

echo 'GIT - 分支 => '${deploy_branch}
echo 'GIT - 地址 => '${deploy_host}
echo 'GIT - 用户 => '${deploy_user}
echo 'GIT - 路径 => '${deploy_path}
echo '\n'

#进入代码文件夹，必须有git管理
echo '路径配置 - 代码文件路径：'${product_source_path}
cd ${product_source_path}

echo 'GIT - 切换到需发布的分支 => '${deploy_branch}
git checkout $deploy_branch
echo '\n'

echo 'NPM - 下载&&编译项目包'
cnpm i
cnpm install -g express

echo 'NPM - 编译项目'
npm run build

echo 'File - 删除已有文件'${product_source_path}/${product_name} '&&' ${product_serivce_path}/${product_name}
rm -rf ${product_source_path}/${product_name}
rm -rf ${product_serivce_path}/${product_name}

echo 'File - 迁移项目位置'${product_serivce_path}/${product_name}
sudo cp ${product_source_path}/${product_script_name} ${product_source_path}/dist/${product_script_name}

echo 'File - 修改部署项目名称'
mv ${product_source_path}/dist ${product_name}

echo 'File - 创建 node_modules'
cd ${product_source_path}/${product_name}
mkdir node_modules

echo 'File - 迁移文件目录'
sudo cp -rf ${product_source_path}/ops-deploy-start.sh ${product_source_path}/${product_name}/ops-deploy-start.sh
#sudo cp -rf ${product_source_path}/${product_name} ${product_serivce_path}/${product_name}
#sudo cp -rf ${linux_node_modules_path}/express ${product_serivce_path}/${product_name}/node_modules/express
echo '\n'

echo '远程部署服务器'
echo 'File - 压缩为gzip'
cd ${product_source_path}
sudo tar -zcvf ./${product_name}.tar.gz ./${product_name}

# 部署节点- 服务器IP集合
array_product_server_ip=(${product_server_ip//;/ })

# 部署节点- 服务器密码集合
array_product_server_password=(${product_server_password//;/ })

# 部署节点- 服务端口集合
array_product_host=(${product_host//;/ })

# 部署节点- 当配置IP与本机服务器「打包服务器」相同时不执行 ssh登录部署 important！！！
local_ip=$(ifconfig | grep 'inet'| grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $2}' )
local_ip_str=''
for i in ${local_ip[@]};do
  local_ip_str=$local_ip_str$i','
done
wait
echo '本地打包服务器IP -> '${local_ip_str}

# 部署节点-「循环执行节点部署」
i=0
echo ${i}
while [ $i -lt ${#array_product_server_password[@]} ]
do
  # 本机部署配置
  if [[ $local_ip_str =~ "${array_product_server_ip[$i]}" ]]
  then
    echo '部署节点 -> 本机部署 ->' $array_product_server_ip[$i]
    rm -rf ${product_serivce_path}/${product_name}/
    sudo cp -rf ${product_source_path}/${product_name} ${product_serivce_path}/${product_name}
    sh ${product_serivce_path}/${product_name}/ops-deploy-start.sh ${array_product_host[$i]} ${product_name} ${product_source_path} ${product_serivce_path} ${product_log_path} ${product_script_name}
  # 节点服务器部署配置
  else
    echo '部署节点 -> ' $i'号节点 -> 部署服务器IP -> '${array_product_server_ip[$i]} '服务器密码 -> '${array_product_server_password[$i]} '部署端口 -> '${array_product_host[$i]}
    echo '文件迁移至部署服务器'
    sudo sshpass -p ${array_product_server_password[$i]} scp -r ${product_source_path}/${product_name}.tar.gz root@${array_product_server_ip[$i]}:${product_serivce_path}

    echo '部署服务器解压文件'
    sudo sshpass -p ${array_product_server_password[$i]} ssh root@${array_product_server_ip[$i]} rm -rf ${product_serivce_path}/${product_name}/
    sudo sshpass -p ${array_product_server_password[$i]} ssh root@${array_product_server_ip[$i]} tar -xzvf ${product_serivce_path}/${product_name}.tar.gz -C ${product_serivce_path}

    echo '部署服务器执行部署'
    sudo sshpass -p ${array_product_server_password[$i]} ssh root@${array_product_server_ip[$i]} sh ${product_serivce_path}/${product_name}/ops-deploy-start.sh ${array_product_host[$i]} ${product_name} ${product_source_path} ${product_serivce_path} ${product_log_path} ${product_script_name}
  fi
  
  wait
  let i++
done
wait
echo '部署完成'

# 以下配置已废用，迁移至 ops-deploy-start.sh 应用
#echo '打包迁移 - 可进行正常部署，关闭占用端口号：'${product_host}
#xl_close_port -p ${product_host}
#pm2 stop node-${product_name}
#pm2 delete node-${product_name}

#echo '服务容器部署 - 执行PM部署，部署端口号:'${product_host}
#pm2 start ${product_serivce_path}/${product_name}/${product_script_name} -o ${product_serivce_path}/${product_name}/logs/run.log -e ${product_serivce_path}/${product_name}/logs/error.log --name=node-${product_name} -- product_name=${product_name} product_host=${product_host}
#echo '------------- 项目启动端口: '${product_host}', WEB-VUE项目部署成功 -------------'

#node部署方式
#node ./${product_name}/${product_script_name} -- product_name=${product_name} product_host=${product_host} > ${product_log_path}/${product_name}.log 2>&1 &