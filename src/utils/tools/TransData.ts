/**
 * @description 列表数组转树结构
 * @param listData 源数组
 * @param treeList 树
 * @param parentId 父ID
 * @param primaryKey 列表主健 key 值
 * @param subListKey 子集对象 key 值
 */
export const listToTreeNode = (
  listData: Array<any>,
  treeList: Array<any>,
  parentId: number | string = 0,
  primaryKey: string = 'id',
  subListKey: string = 'children'
) => {
  // 循环遍历递归数据
  listData.forEach(item => {
    if (item.parentId === parentId) {
      const childList = {
        ...item,
        children: [],
      }

      // 递归循环遍历
      const subChildrenListData = childList[subListKey]
      listToTreeNode(listData, subChildrenListData, item[primaryKey])

      // 清除无下级 children 数据 的 子类标示 key 属性
      if (subChildrenListData && subChildrenListData.length <= 0) {
        delete childList[subListKey]
      }

      treeList.push(childList)
    }
  })
}
