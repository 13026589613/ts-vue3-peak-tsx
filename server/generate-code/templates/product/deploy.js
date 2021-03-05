/**
 * @description 代码部署配置文件
 * @param mapParams 部署配置参数
 */
exports.template = mapParams => `
product_name=${mapParams.product_name}
product_host=${mapParams.product_host}
product_source_path=${mapParams.product_source_path}/${mapParams.product_name}
product_script_name=${mapParams.product_script_name}

product_server_password=${mapParams.product_server_password}
product_server_ip=${mapParams.product_server_ip}

product_serivce_path=${mapParams.product_serivce_path}
product_log_path=${mapParams.product_log_path}
linux_node_modules_path=${mapParams.linux_node_modules_path}

prod_branch=${mapParams.prod_branch}
prod_host=${mapParams.prod_host}
prod_user=${mapParams.prod_user}
prod_path=${mapParams.prod_path}

test_branch=${mapParams.test_branch}
test_host=${mapParams.test_host}
test_user=${mapParams.test_user}
test_path=${mapParams.test_path}
`
