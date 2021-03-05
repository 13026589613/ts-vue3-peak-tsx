/**
 * @description 数据表 - 列对象
 * @author PP
 */
const EntityColumn = {
  // 驼峰属性名称(第一个字母大写)，如：user_name => UserName
  upperColumnName: null,

  // 驼峰属性名称(第一个字母小写)，如：user_name => userName
  lowerColumnName: null,

  // 原始列名 大写
  upperAttrName: null, // USER_NAME

  // 原始列名 小写
  lowerAttrName: null, // user_name

  // 列名类型(int double 等 ts 格式需要变更)
  dataType: null,

  // 列名备注
  columnComment: null,

  // 适配 dataType -> 属性类型 （根据语言执行转化算法）
  attrType: null,

  // 适配 ts 默认值
  defaultValue: null,

  // 主键 -> PRI标示 "columnKey":"PRI"
  columnKey: null,

  // 自增
  extra: null,

  // 用户配置的对应表单的类型
  operateType: null,

  // 用户配置对应的字段转换API的名称
  apiColumnsName: null,

  // 字段非空字段
  needValidate: null,

  // 字段验证方式
  validateType: null,

  // 字段限定值集合,主要用于表单多选情况的赋值。也可限定值属性，生成下拉选框等。
  valuesArray: [],

  // 业务参数
  objectKey: {},
}

module.exports = EntityColumn
