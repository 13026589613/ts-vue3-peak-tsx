/*
    ## Address 字典数据
    字典数据来源 http://www.atatech.org/articles/30028?rnd=254259856
    国标 省（市）级行政区划码表
    华北   北京市 天津市 河北省 山西省 内蒙古自治区
    东北   辽宁省 吉林省 黑龙江省
    华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
    华南   广东省 广西壮族自治区 海南省
    华中   河南省 湖北省 湖南省
    西南   重庆市 四川省 贵州省 云南省 西藏自治区
    西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
    港澳台 香港特别行政区 澳门特别行政区 台湾省

    **排序**

    ```js
    var map = {}
    _.each(_.keys(REGIONS),function(id){
      map[id] = REGIONS[ID]
    })
    JSON.stringify(map)
    ```
*/
const DICT: any = {
  110000: '北京',
  110100: '北京市',
  110101: '东城区',
  110102: '西城区',
  110105: '朝阳区',
  110106: '丰台区',
  110107: '石景山区',
  110108: '海淀区',
  110109: '门头沟区',
  110111: '房山区',
  110112: '通州区',
  110113: '顺义区',
  110114: '昌平区',
  110115: '大兴区',
  110116: '怀柔区',
  110117: '平谷区',
  110228: '密云县',
  110229: '延庆县',
  110230: '其它区',
  990000: '海外',
  990100: '海外',
}

// id pid/parentId name children
const tree = (list: any) => {
  const mapped: any = {}
  let item
  for (let i = 0; i < list.length; i += 1) {
    item = list[i]
    if (!item || !item.id) continue
    mapped[item.id] = item
  }

  const result = []
  for (let ii = 0; ii < list.length; ii += 1) {
    item = list[ii]

    if (!item) continue
    /* jshint -W041 */
    if (item.pid === undefined && item.parentId === undefined) {
      result.push(item)
      continue
    }
    const parent = mapped[item.pid] || mapped[item.parentId]
    if (!parent) continue
    if (!parent.children) parent.children = []
    parent.children.push(item)
  }
  return result
}

const DICT_FIXED = (function dict() {
  const fixed = []
  for (const id in DICT) {
    if ({}.hasOwnProperty.call(DICT, id)) {
      let pid
      if (id.slice(2, 6) !== '0000') {
        pid = id.slice(4, 6) === '00' ? `${id.slice(0, 2)}0000` : `${id.slice(0, 4)}00`
      }
      fixed.push({
        id,
        pid,
        name: DICT[id],
        value: DICT[id],
        label: DICT[id],
      })
    }
  }
  return tree(fixed)
}())

export default DICT_FIXED
