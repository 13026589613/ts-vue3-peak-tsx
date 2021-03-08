import { Enum } from '@/enum/enum-class' // 导入枚举配置

/**
 * @description 请求模式枚举对象
 * @author PP
 */
export const API_TYPE = new Enum()
  .add('MODULE_LIST', '模块化全局加载模式', 'modulesList')
  .add('LIST', '全局加载模式', 'list')
  .add('NORMAL', 'import引用模式', 'normal')
  .add('ALL', '全部模式', 'all')

/**
 * 系统全局性缓存参数
 */
export const LS = new Enum()
  .add('SYS_SETTING', '系统设置', 'SYS_SETTING')
  .add('FIXED_HEADER', '头部固定设置', 'FIXED_HEADER')
  .add('FIXED_SIDE', '菜单固定设置', 'FIXED_SIDE')
  .add('SHOW_BREAD_CRUMB', '界面页签', 'SHOW_BREAD_CRUMB')
  .add('SHOW_TOP_BREAD_CRUMB', '头部显示界面页签', 'false')
  .add('SHOW_TAG_TABS', '导航页签', 'SHOW_TAG_TABS')
  .add('SHOW_TAG_TABS_POSITION', '导航页签显示位置', 'content')
  .add('SHOW_FOOTER_LAYOUT', '底部布局', 'SHOW_FOOTER_LAYOUT')
  .add('LOGIN_USER_INFO', '登录用户', 'LOGIN_USER_INFO')
  .add('SQL_CONNECTION', '数据库连接配置信息', 'SQL_CONNECTION')

/**
 * 系统生产 - 类型转换配置参数
 */
export const COLUMNS_TRANS_TYPE = new Enum()
  .add('varchar', '文本框', 'Input')
  .add('bigint', '文本框', 'Input')
  .add('longtext', '多行文本框', 'TextArea')
  .add('int', '数字文本', 'InputNumber')
  .add('tinyint', '文本框', 'Input')
  .add('integer', '数字文本', 'InputNumber')
  .add('decimal', '数字文本', 'InputNumber')
  .add('float', '数字文本', 'InputNumber')
  .add('double', '数字文本', 'InputNumber')
  .add('double', '数字文本', 'InputNumber')
  .add('char', '单选框', 'Radio')
  .add('datetime', '日期选择器', 'DatePicker')
  .add('timestamp', '时间选择器', 'TimePicker')

/**
 * 系统生产 - 类型转换配置参数
 */
export const COLUMNS_IS_NULL = new Enum().add('NO', '非空', 'notNull').add('YES', '空', 'canNull')
