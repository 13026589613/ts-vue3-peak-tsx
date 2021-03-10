/**
 * @description 常用工具类.一大堆杂七杂八.什么都有反正可以抄袭过来的
 * @author PP
 */
import Vue from 'vue'
// import router from '@/router'
import store from '@/store'

/**
 * @description 自定义工具包插件
 */
const toolsUtil = {
  dictServe: {
    /**
     * @description 业务提取-> 构造table 表的数据结构与初始化数据集
     *              通过字典获取对应要素的层级结构数据，解析构建初始化的表格表单数据。
     *              通过服务获取的表格数据需要回灌覆盖「data、problem、reason」等业务字段
     * @param collectChildren 「值：true」 查询要素的下级标示
     * @param parentCategory 「值：本级别要素的category」该标示只查询要素的下级元素
     * @param noTypeArray 「值：0」不需要查询的type类型。用于剔除「type=0&&dictType=1」的要素类「父类要素不查询」
     * @param saveTypeArray 页面包含查询字典项的集合 逗号拼接
     * @param dictCategory 要素字典category
     */
    initTableConstruction(_this: any, parentCategory: string, saveTypeArray: string, dictCategory: string) {
      return new Promise((reject, resolve) => {
        // 获取包含子集合为数据集合的 checkbox 的对象
        const lsConstructionList = _this.$tools.ls.get(`LS_CONSTRUCTION_${dictCategory}`)

        if (typeof lsConstructionList !== 'undefined' && lsConstructionList && lsConstructionList !== null) {
          reject(JSON.parse(lsConstructionList))
        } else {
          let tableConstructionList: any = []
          let maxColumnsSize: number = 0
          let dictArrayList: any = []

          _this.$ModuleApis.elementCode
            .initElementCodeListData({
              data: {
                collectChildren: true,
                parentCategory: parentCategory,
                // noTypeArray: '0',
              },
            })
            .then((res: any) => {
              try {
                // 重构初始化数据结构
                let parentsDictLevelList: any = []
                res.list.map((item: any, index: number) => {
                  // 去除type===0的层级结构
                  if (item.type !== '0') {
                    // 初始化表格结构，所有的数据反馈值。重构表单表格组成的必要参数
                    tableConstructionList.push({
                      key: item.category,
                      editable: _this.operateType === 'update', // 编辑状态
                      hasSave: false, // 初始化
                      data: item.type === '2' ? [] : null,
                      problem: null,
                      reason: null,
                      rowSpan: '-1',
                      ...item,
                    })

                    if (item.parentsDictLevel && item.parentsDictLevel !== '-1') {
                      // 包含父要素数据的子集数据处理：去重复、统计、回写tableList对象
                      const parentsDictLevel = item.parentsDictLevel.split(',')
                      if (parentsDictLevel.length > maxColumnsSize && parentsDictLevel !== '-1') {
                        maxColumnsSize = parentsDictLevel.length // 获取最大列合并，用于不具备上级层级的要素合并列
                      }

                      // 获取同级数量，构建「父级item,数据归属索引,自身顺序索引」的格式Array数据集合
                      parentsDictLevel.map((parentsDictLevelItem: any, parentsDictLevelIndex: number) => {
                        parentsDictLevelList.push(
                          `${parentsDictLevelItem},${tableConstructionList.length - 1},${parentsDictLevelIndex}`
                        )
                      })
                    }
                  } else {
                    // 获取包含子集合为数据集合的 checkbox 的对象
                    if (
                      !lsConstructionList ||
                      typeof lsConstructionList === 'undefined' ||
                      lsConstructionList === null ||
                      lsConstructionList === ''
                    ) {
                      if (item.dictType === '2') {
                        dictArrayList.push({ ...item })
                      }
                    }
                  }
                })

                // 统计重复row合并数量，获取row合并的集合对象，赋值到对应行
                let repeatCountArray: any = []
                parentsDictLevelList.sort() // 排序用于去重复并合并统计数量

                // 统计重复row合并数量
                for (var i = 0; i < parentsDictLevelList.length; ) {
                  var count = 0

                  // 将构建的结构数据解构，获取父层名称进行去重复并同级
                  const parentsDictLevelInfo = parentsDictLevelList[i].split(',')
                  for (var j = i; j < parentsDictLevelList.length; j++) {
                    if (parentsDictLevelInfo[0] == parentsDictLevelList[j].split(',')[0]) {
                      count++
                    }
                  }

                  // 构建rowArray，用于数据回写table数据集合，进行数据绑定用于row合并判定
                  repeatCountArray.push({
                    count,
                    parentsDictLevelIndex: parentsDictLevelInfo[2],
                    index: parentsDictLevelInfo[1],
                    data: parentsDictLevelInfo[0],
                  })
                  i += count
                }

                // 改下初始化的tableDataList集合，row对象合并行操作标示
                repeatCountArray.map((repeatCountItem: any) => {
                  for (let index = 0; index < repeatCountItem.count; index++) {
                    // 构建行索引的数组集合，多级别父要素时依次设置row合并数量与方式，第一个数据「-1」为站位数据。
                    const tableIndex: number = Number(repeatCountItem.index) + index
                    if (index === 0) {
                      tableConstructionList[tableIndex].rowSpan += `,${repeatCountItem.count}`
                    } else {
                      tableConstructionList[tableIndex].rowSpan += ',0'
                    }
                  }
                })
                const LS_CONSTRUCTION = [maxColumnsSize + 1, tableConstructionList, dictArrayList]
                _this.$tools.ls.set(`LS_CONSTRUCTION_${dictCategory}`, JSON.stringify(LS_CONSTRUCTION))
                reject(LS_CONSTRUCTION)
              } catch (e) {
                console.log(e)
                reject(false)
              }
            })
        }
      })
    },

    /**
     * @description 业务提取->根据参数获取要素字典的下级集合数据的数据列表
     * @param _this
     * @param saveTypeArray 下级集合类型数据的字符串集合
     */
    loadBaseElementCode(_this: any, saveTypeArray: string) {
      return new Promise((reject, resolve) => {
        const lsInfo = _this.$tools.ls.get(`DICT_${saveTypeArray}`)
        if (typeof lsInfo !== 'undefined' && lsInfo && lsInfo !== null) {
          reject(JSON.parse(lsInfo))
        }

        _this.$ModuleApis.elementCode
          .initElementCodeListData({
            data: {
              status: '0',
              saveTypeArray: saveTypeArray,
            },
          })
          .then((res: any) => {
            if (res.code === window.CROSS_CODE) {
              _this.$tools.ls.set(`DICT_${saveTypeArray}`, JSON.stringify(res.list))
              reject(res.list)
            } else {
              reject(false)
            }
          })
      })
    },
  },
  /**
   * @description localStorage 对象操作事件
   *              localStorage 对象处理集合.如果爱动弹引入ls包也可以
   */
  ls: {
    get(key: string) {
      return localStorage.getItem(key)
    },
    set(key: string, val: any) {
      return localStorage.setItem(key, val)
    },
    remove(key: string) {
      return localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear() // 慎用
    },
  },
  /**
   * @description 字符串类型 String 对象操作
   */
  string: {
    // 下划线转换驼峰
    toHumpOfLine(string: string) {
      // return string.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())
    },
    // 转化为驼峰格式 table_name -> tableName
    toHumpClassName: (string: string, formatter: string = '_'): string => {
      const stringArray = string.split(formatter).filter(str => str && str.trim())
      stringArray.map((item, index) => {
        if (index > 0) {
          stringArray[index] = item.substring(0, 1).toUpperCase() + item.substring(1)
        }
      })
      return stringArray.join('')
    },
    // 驼峰转化为数据表  tableName -> table_name 格式
    toTableName: (string: string): string => string.replace(/([A-Z])/g, '_$1').toLowerCase(),
    // 首字母大写 -> TableName 格式
    toClassName: (string: string): string => string.substring(0, 1).toUpperCase() + string.substring(1),
    // 转化字符串全体大写 -> TABLE_NAME 格式
    toUpperCase: (string: string): string => string.toUpperCase(),
    // 转化字符串全体小写 -> tablename 格式
    toLowerCase: (string: string): string => string.toLowerCase(),
  },

  /**
   * @description 日期 Date对象操作
   */
  date: {
    /**
     * @description 前端时间转换 xxxx-xx-xx T16:00:00.000Z 转换成格式 xxxx-xx-xx hh:mm:ss
     */
    formateTZDateToDate: (time: string): string => {
      const date = new Date(time)
      const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${
        date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
      }:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}:${
        date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
      }`
      return formatDate
    },

    /**
     * @description 格式化Date -> WeekTime
     */
    formatDateToWeekend: (data: Date): object => {
      const weekDataList = ['天', '一', '二', '三', '四', '五', '六']

      const _Year: string | number = data.getFullYear()
      const _Month: string | number = data.getMonth() + 1
      const _Day: string | number = data.getDate()

      let _Hours: string | number = data.getHours()
      let _Min: string | number = data.getMinutes()
      let _Sec: string | number = data.getSeconds()
      let _Weekend: string | number = data.getDay()

      _Hours = _Hours < 10 ? `0${_Hours}` : _Hours
      _Min = _Min < 10 ? `0${_Min}` : _Min
      _Sec = _Sec < 10 ? `0${_Sec}` : _Sec
      _Weekend = weekDataList[_Weekend]

      return {
        YMD: `${_Year}年${_Month}月${_Day}日`,
        WEEK: `星期${_Weekend}`,
        TIME: `${_Hours}:${_Min}:${_Sec}`,
      }
    },
  },
  /**
   * @description 清除登录信息
   */
  clearLoginInfo() {
    Vue.prototype.$Cookies.remove('token')
    store.commit('ResetStore')
  },
  /**
   * 是否有权限
   * @param {*} key
   */
  isAuth(key: any) {
    return JSON.parse(sessionStorage.getItem('sessionPermissions') || '[]').indexOf(key) !== -1 || false
  },
  /**
   * @description 转换、转化、格式化等工具
   */
  transer: {
    /**
     * @description 根据某个值的大小排序
     */
    sortByKey(array: Array<any>, key: number | string) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return x < y ? -1 : x > y ? 1 : 0
      })
    },
    /**
     * @description 树形数据转换
     * @param {*} params 父子孙的关联标识必须是parentId
     */
    treeDataTranslate(data: any, id = 'id', pid = 'parentId', type = 1, transer: any = {}, transerParent: any = {}) {
      const res: any = []
      const temp: any = {}
      for (let i = 0; i < data.length; i++) {
        data[i][id] = data[i][id] + ''
        data[i][pid] = data[i][pid] + ''
        temp[data[i][id]] = data[i]
        data[i].sumNumber = 5
        data[i].olderSumNumber = 10
        data[i].changeNumber = -5
        data[i].insertNumber = 0
        data[i].outerNumber = -6
        data[i].innerNumber = 1
        data[i].backNumber = 0

        data[i]['slots'] = {}
        data[i]['slots']['icon'] = 'default'

        Object.keys(transer).map((key: any) => {
          if (key) {
            data[i][key] = data[i][transer[key]]
          }
        })

        Object.keys(transerParent).map((key: any) => {
          data[i][key] = null
        })

        // 处理成树结构需要的对象
        // data[i]['key'] = data[i][id] + ''
        // if (data[i]['name']) {
        //   data[i]['title'] = data[i]['name'] + ''
        // }

        // 特殊字段清除转换
        data[i]['delFlag'] = data[i]['status'] + ''
      }

      for (let k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
          if (!temp[data[k][pid]].children) {
            temp[data[k][pid]].children = []
          }
          if (!temp[data[k][pid]].list) {
            temp[data[k][pid]].list = []
          }

          if (!temp[data[k][pid]]._level) {
            temp[data[k][pid]]._level = 1
          }

          data[k]._level = temp[data[k][pid]]._level + 1

          Object.keys(transerParent).map((key: any) => {
            if (temp[data[k][pid]][transerParent[key]]) {
              data[k][key] = temp[data[k][pid]][transerParent[key]]
            }
          })

          temp[data[k][pid]].children.push(data[k])
          if (temp[data[k][pid]].type !== type) {
            temp[data[k][pid]].list.push(data[k])
          }
        } else {
          res.push(data[k])
        }
      }
      return res
    },
  },
}

export default toolsUtil
