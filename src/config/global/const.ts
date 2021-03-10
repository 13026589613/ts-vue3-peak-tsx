/**
 * @description 常量数据，window 对象集成
 * @author PP
 */
export const ConstData = {
  TIP_MSG: {
    ERROR: '操作异常，请联系[系统管理人员]',
    INSERT_SUCCESS: '成功保存信息',
    MODIFY_SUCCESS: '成功修改信息',
    OPERATE_SUCCESS: '信息已保存，操作完成',
    DELETE_CONFIRM_TIP: '确定执行[删除]操作？',
    DELETE_CONFIRM_CONTENT: '确定[删除]当前所选择的数据项？',
    TOREPAIR: '确定切换为中修吗？',
    OVERHAUL: '确定切换为大修吗？',
  },
}

window.ConstData = ConstData // 全量存储注意内容大小

export default ConstData
