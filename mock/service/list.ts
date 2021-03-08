/**
 * @description 字典-基本代码档 MOCK
 * @author PP
 */
const Mock = require('mockjs2')
const { getQueryParameters, getBody, builder } = require('../utils')

/**
 * @description list mock 样例
 * @params 检索条件 查询参数
 */
const initExampleList = params => {
  let listBase = []
  const queryParams = params.type === 'POST' ? getBody(params) : getQueryParameters(params)

  for (let index = 0; index < 99; index++) {
    listBase.push({
      id: Mock.mock('@guid'), // 主键ID
      category: `代码类别${index}`, // 代码类别
      codeNo: `代码${index}`, // 代码
      codeName: `代码名称${index}`, // 代码名称
      codeSeq: `代码顺序${index}`, // 代码顺序
      codeRemark: `文字备注${index}`, // 文字备注
      codeText: `文字备注2${index}`, // 文字备注2
      codeValue: `数值备注${index}`, // 数值备注
      dataStatus: `数据状态${index}`, // 数据状态
      createUserId: `建档人员${index}`, // 建档人员
      createTime: `建档时间${index}`, // 建档时间
      updateUserId: `修改人员${index}`, // 修改人员
      updateTime: `修改时间${index}`, // 修改时间
      delFlag: `${index}`, // 删除状态（0:未删除  1：已删除）
    })
  }

  const { data } = queryParams // 查询参数位置
  let base = []
  if (queryParams.delFlag) {
    console.log(queryParams.delFlag)
    base = listBase.filter(item => item.delFlag.indexOf(queryParams.delFlag) > 0)
  } else {
    base = listBase.filter(item => (data ? item.delFlag.indexOf(data.delFlag) > 0 : item))
  }

  if (base && base.length > 0) {
    return builder(
      {
        list: base,
      },
      '成功获取 字典-基本代码档 list 的列表数据信息',
      200
    )
  }
  return builder(queryParams, '未获取到相关数据', 201)
}

Mock.mock(/\/service\/initExampleList/, 'post', initExampleList)
export default Mock
