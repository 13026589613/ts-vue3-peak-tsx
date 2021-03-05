/**
 * @description 数据表 - table bean -> 表对象
 * @author PP
 */
const TableEntity = {
  // 驼峰类名(第一个字母大写)，如：sys_user => SysUser
  upperTableName: null,

  // 驼峰类名(第一个字母小写)，如：sys_user => sysUser
  lowerTableName: null,

  // 全部大写，如：sys_user => USER
  fullUpperTableName: null,

  // 表名称 -> sys_user
  tableName: null,

  // 表注释
  tableComment: null,

  // 文件名 sys-user
  tableFileName: null,

  // api 路径名称
  apiPathName: null,

  // 表的主键
  pk: null,

  // InnoDB
  engine: null,

  // 表的列名(不包含主键)
  columnsArray: [],

  // 表单对象
  formColumnsArray: [],

  // 用户前端界面配置的参数配置, 表对应的全部字段组成的对象
  mapTransColumnsPlugins: [],

  // 表开头标示
  frontChar: null,

  // 备份字段
  remark1: null,

  // 备份字段2
  remark2: null,
}
module.exports = TableEntity
