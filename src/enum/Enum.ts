/**
 * @description 枚举对象接口, 用于创建 [类枚举对象].
 *              ps: TS对于枚举使用不是很友善
 * @author PP
 */
interface EnumType {
  [key: string]: {
    label: string
    value?: any
  }
}

/**
 * @description 枚举类
 * @author PP
 */
export class Enum {
  enum: EnumType = {}

  /**
   * @description 添加枚举字段
   * @param {string} field  枚举类名
   * @param {string} label  枚举名称
   * @param {any} value  枚举值
   */
  add(field: string, value: any, label: string) {
    this.enum[field] = { label, value }
    return this
  }

  /**
   * @description 根据枚举value获取其label
   */
  getLabelByValue(value: object) {
    // 字段不存在返回‘’
    if (value === undefined || value === null) {
      return ''
    }
    for (const i in this.enum) {
      const e = this.enum[i]
      if (e && e.value === value) {
        return e.label
      }
    }

    return ''
  }
}
