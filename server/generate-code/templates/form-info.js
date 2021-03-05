// api 接口模版
exports.template = tableEntity => {
  const URL = `\${API_${tableEntity.fullUpperTableName}_URL.BASE + API_${tableEntity.fullUpperTableName}_URL.MODUlES_NAME}`
  return `/**
  * ${tableEntity.tableComment}接口API
  */
  const API_${tableEntity.fullUpperTableName}_URL = {
    // BASE: window.config.useMock ? window.config.mockUrl : window.config.baseUrl, // RESTFUL 风格基础路径
    BASE: window.config.baseUrl,
    MODUlES_NAME: '${tableEntity.frontChar || 'default'}'
  }

  module.exports = {
    /**
     * @description 添加${tableEntity.tableComment}表单数据
     * @param formEntity -> Entity
     */
    insert${tableEntity.upperTableName}Form: {
      url: \`${URL}/save\`,
      contentType: 'json',
      method: 'post',
    },
    /**
     * @description 编辑${tableEntity.tableComment}表单数据
     * @param formEntity -> 包含主键或操作标示 Entity
     */
    modify${tableEntity.upperTableName}Form: {
      url: \`${URL}/update\`,
      contentType: 'json',
      method: 'put',
    },
    /**
     * @description 删除${tableEntity.tableComment}数据
     * @param [ids] 操作标示集合 [] 或 String
     */
    delete${tableEntity.upperTableName}ByParams: {
      url: \`${URL}/delete\`,
      contentType: 'qs',
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    /**
     * @description 获取${tableEntity.tableComment}一条数据信息
     * @param [key] 操作标示 String
     */
    init${tableEntity.upperTableName}InfoByParams: {
      url: \`${URL}/get${tableEntity.upperTableName}\`,
      contentType: 'json',
      method: 'get',
    },
    /**
     * @description 获取${tableEntity.tableComment}数据列表信息
     * @param filterParams -> 表单、表头、隐藏携带参数
     * @param pageParams
     * @param sortParams
     * @param editParams
     */
    init${tableEntity.upperTableName}ListData: {
      url: \`${URL}/init${tableEntity.upperTableName}ListData\`,
      contentType: 'json',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  }
`
}
