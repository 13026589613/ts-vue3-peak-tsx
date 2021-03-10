/**
 * @description 树形数据转换
 * @param {*} params 父子孙的关联标识必须是parentId
 * @author YXM
 */
export function treeDataTranslate(data: any, id = 'id', pid = 'parentId') {
  const res: any = []
  const temp: any = {}
  for (let i = 0; i < data.length; i++) {
    data[i].id = data[i][id]
    temp[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]].children) {
        temp[data[k][pid]].children = []
        temp[data[k][pid]].list = []
      }
      if (!temp[data[k][pid]]._level) {
        temp[data[k][pid]]._level = 1
      }
      data[k]._level = temp[data[k][pid]]._level + 1
      temp[data[k][pid]].children.push(data[k])
      if (temp[data[k][pid]].type !== 1) {
        temp[data[k][pid]].list.push(data[k])
      }
    } else {
      res.push(data[k])
    }
  }
  return res
}
