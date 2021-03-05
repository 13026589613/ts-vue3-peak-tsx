/** ------------------------- 常规 ------------------------- */
/**
 * @description 邮箱
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antEmail(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '邮箱格式: x@mgdaas.com\n\r'))
  }
  callback(errors)
}

/**
 * @description 长度控制(自行调整)
 * @param {*} message: string 自定义提示信息。参数可不传递
 * @param {*} begin: number 最少长度
 * @param {*} end: number 最多长度
 */
export function antLengthControl(
  rule: any,
  value: any,
  callback: any,
  begin: number = 1,
  end: number = 10,
  message?: string | null
) {
  const reg = new RegExp(`^.{${begin},${end}}$`)
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || `长度范围${begin}-${end}字符\n\r`))
  }
  callback(errors)
}

/**
 * @description 必填防止全空格通过的情况
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function allSpaceControl(rule: any, value: any, callback: any, message?: string | null) {
  const errors = []
  if (value && value.trim() == '') {
    errors.push(new Error(message || `不能全为空格\n\r`))
  }
  callback(errors)
}

/**
 * @description 日期格式 yyyy-mm-dd
 *              hh:mm 格式 09:00 -> /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/
 *              yyyy-mm-dd hh:mm:ss 格式-> /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/
 * @param {*} message: string 自定义提示信息。参数可不传递
 * @param {*} type: 'Date' | 'Time' | 'DateTime' 对应不同正则表达式验证 日期 | 时间 | 日期时间 等
 */
export function antDateStyle(
  rule: any,
  value: any,
  callback: any,
  type: 'Date' | 'Time' | 'DateTime' = 'Date',
  message?: string | null
) {
  let reg = null
  let defaultMsg = null
  switch (type) {
    case 'Date':
      reg = /^\d{4}-\d{1,2}-\d{1,2}$/
      defaultMsg = '日期格式: 2020-01-01'
      break
    case 'Time':
      reg = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/
      defaultMsg = '时间格式: 09:00'
      break
    case 'DateTime':
      reg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/
      defaultMsg = '日期时间格式: 2020-01-01 09:00:00'
      break
    default:
      reg = /^\d{4}-\d{1,2}-\d{1,2}$/
      defaultMsg = '日期格式: 2020-01-01'
      break
  }
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || defaultMsg))
  }
  callback(errors)
}

/** ------------------------- 号码 ------------------------- */
/**
 * @description 国内电话号码
 *              0511 - 440 5222 || 021 - 8788 8822
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antChinaTelPhone(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(\d{3}-\d{8}|\d{4}-\d{7})$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '固定电话号码，如：0531-8867685'))
  }
  callback(errors)
}

/**
 * @description 通用电话号码, 不强制开头和结尾。开头3-4位之间，结尾7-8位之间都为合理，放开了范围。
 *              格式如下：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antTelPhone(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '固定电话号码，如：0531-8867685'))
  }
  callback(errors)
}

/**
 * @description 通用通讯号码, 包含通用固话、手机号。粗略限定。
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antTelNumber(rule: any, value: any, callback: any, message?: string | null) {
  const telReg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
  const phoneReg = /^1[3|4|5|7|8]\d{9}$/
  const errors: any = []

  if (!telReg.test(value) && !phoneReg.test(value)) {
    errors.push(new Error(message || '请输入正确联系方式'))
  }

  callback(errors)
}

/**
 * @description 手机号码 13 14 15 16 17 18 19开头可验证
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antPhoneNumber(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '十一位手机号码:133xxx xxxxx'))
  }
  callback(errors)
}

/** ------------------------- 数字 ------------------------- */
/**
 * @description 数字
 *              /^(([1-9])|([1-9]\d)|100)$/ 验证输入1-100
 *              /^(([1-9])|(1\d)|(2[0-4]))$/ 验证输入1-24
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNumber(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\d+(\.\d+)?$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入数字类型'))
  }
  callback(errors)
}

/**
 * @description n位的正数
 * @param {*} message: string 自定义提示信息。参数可不传递
 * @param {*} count: number 位数
 */
export function antNumberN(rule: any, value: any, callback: any, count: number = 3, message?: string | null) {
  const errors = []
  if (!new RegExp('^\\d{3}$').test(value)) {
    errors.push(new Error(message || `请输入${count}位的正数`))
  }
  callback(errors)
}

/**
 * @description n位以上正数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNumberNStart(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\d{n,}$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description m-n位正数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNumberMN(
  rule: any,
  value: any,
  callback: any,
  begin: number = 1,
  end: number = 10,
  message?: string | null
) {
  const reg = new RegExp(`^\\d{${begin},${end}}$`)
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入整数，如：99'))
  }
  callback(errors)
}

/** ------------------------- 小数 ------------------------- */
/**
 * @description 小数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antDecimal(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(([^0][0-9]+|0)\.([0-9]))$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description m-n位小数
 *              {0,3} 小数点前4位整数 {1,2} 小数点后1-2位 {3} 小数点后3位
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antDecimalMN(rule: any, value: any, callback: any, message?: string | null) {
  // const reg = /^(([0-9]\d{0,2}|0)+([.]{1}(([0-9]+){0,2}))?)$/
  //  ([^0][0-9]{0,2}|0)$/
  // ^(([1-9])|(1\d)|(2[0-4]))$/
  // ^(([1-9])|([1-9]\d)|100)$/
  const reg = /^(([^0][0-9]{0,2}|0)\.([0-9]{1,2})$)|^(([0-9])|([0-9]\d)|100)$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入小数'))
  }
  callback(errors)
}

/**
 * @description m-n位小数
 *              {0,3} 小数点前4位整数 {1,2} 小数点后1-2位 {3} 小数点后3位
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antDecimalPoint(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入纯数字,小数点后最多2位,不能为负数'))
  }
  callback(errors)
}


/**
 * @description m~n位小数正实数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antDecimalNegativeMN(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[0-9]+(.[0-9]{1,2})?$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description m~n位小数正实数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antPositiveDecimalDotMN(
  rule: any,
  value: any,
  callback: any,
  begin: number = 1,
  end: number = 10,
  dotbegin: number = 1,
  dotend: number = 2,
  message?: string | null
) {
  const reg = new RegExp(`^[0-9]{${begin},${end}}(\\.[0-9]{${dotbegin},${dotend}})?$`)
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正实数，如：99'))
  }
  callback(errors)
}

/**
 * @description m~n位小数实数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antDecimalDotMN(
  rule: any,
  value: any,
  callback: any,
  begin: number = 1,
  end: number = 10,
  dotbegin: number = 1,
  dotend: number = 2,
  message?: string | null
) {
  const reg = new RegExp(`^-?[0-9]{${begin},${end}}(\\.[0-9]{${dotbegin},${dotend}})?$`)
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正实数，如：99'))
  }
  callback(errors)
}

/** ------------------------- 浮点数 ------------------------- */
/**
 * @description 浮点数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antFloat(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^((-?\d+)(\.\d+)?)$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 正浮点数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antPositiveFloat(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 负浮点数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNegativeFloat(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 正浮点数 - 非负浮点数(正浮+0)
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antPositiveZeroFloat(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\d+(\.\d+)?$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 负浮点数 - 非正浮点数(负浮+0)
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNegativeZeroFloat(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/** ------------------------- 整数 ------------------------- */

/**
 * @description 整数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antInteger(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[1-9][0-9]*$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 正整数 - 非零正整数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antPositiveInteger(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[1-9]\d*$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 负整数 - 非零负整数
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNegativeInteger(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^-[1-9]\d*$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 正整数 - 非负整数(正整+0)
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antPositiveZeroInteger(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\d+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/**
 * @description 负整数 - 非正整数(负整+0)
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNegativeZeroInteger(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^-[1-9]\d*|0$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入正整数，如：99'))
  }
  callback(errors)
}

/** ------------------------- 字符串 ------------------------- */
/**
 * @description 汉字
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antChinese(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[\u4e00-\u9fa5]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '只能输入汉字'))
  }
  callback(errors)
}

/**
 * @description 英文
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antEnglish(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[A-Za-z]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '只能输入英文'))
  }
  callback(errors)
}

/**
 * @description 字符包含验证 是否含有 ^%&',;=?$\"
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antIncludeSign(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /[^%&',;=?$\x22]/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 禁止含有xxx字符 ~ 不可输入
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antExcludeSomeSign(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /[^~\x22]$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 可输入xxx字符 只能输入空格
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antJustInputSomeSign(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[\s]$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 英文和数字组成
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antJustNumberEN(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[A-Za-z0-9]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 大写英文组成
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antJustBigEN(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[A-Z]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '只能有大写英文'))
  }
  callback(errors)
}

/**
 * @description 大写英文和数字组成
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antJustNumberBigEN(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[A-Z\d]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '只能有大写英文和数字'))
  }
  callback(errors)
}


/**
 * @description 小写英文组成
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antJustSmallEN(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[a-z]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 数字、英文或者下划线组成
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antJustNumberEnSomeSign(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\w+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 只能输入中文
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antAccountJustChinese(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[\u4E00-\u9FA5]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '只能输入中文汉字'))
  }
  callback(errors)
}

/**
 * @description 中文、英文、数字但不包括某些符号
 *              ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$ {2,20}用于限定长度
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antAccountExcludeSign(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 中文、英文、数字包括下划线
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antAccountIncludeSign(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/** ------------------------- 账号/密码 ------------------------- */
/**
 * @description 通用用户密码/账户
 *              英文字母、数字、下划线组成的5位-20的字串
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNormalAccount(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\w{5,20}$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 高级密码/账户，主要用于密码
 *              必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-16之间
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antHigherAccount(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/** ------------------------- 其他 ------------------------- */
/**
 * @description 通用身份证
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antNormalIDCard(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(\\d{14}|\\d{17})(\\d|[xX])$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 短身份证号码(数字、字母x结尾)
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antShortIDCard(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[1-9][0-9]*$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description IP地址
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antIPAddress(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^\d+\.\d+\.\d+\.\d+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 域名
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antRealmName(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description URL路径 - 网络地址
 *               匹配网址 -> ^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$
 *               匹配URL -> ^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antIntelURL(rule: any, value: any, callback: any, message?: string | null) {
  const reg =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{1,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$"

  const errors = []
  if (!new RegExp(reg).test(value)) {
    errors.push(new Error(message || '验证提示信息'))
  }
  callback(errors)
}

/**
 * @description 车牌号
 *              包含新能源的详细验证 -> ^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$
 *
 *              分步权重验证
 *              var xreg= /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
 *              var creg= /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antCarCode(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入邮箱格式,如：xxx@mgdaas.com'))
  }
  callback(errors)
}

/**
 * @description 邮政编码
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antZipCode(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[1-9]\d{5}(?!\d)$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入邮箱格式,如：xxx@mgdaas.com'))
  }
  callback(errors)
}

/**
 * @description 工商税号
 * @param {*} message: string 自定义提示信息。参数可不传递
 */
export function antIndustryCode(rule: any, value: any, callback: any, message?: string | null) {
  const reg = /^[0-9]\\\\d{13}([0-9]|X)$/
  const errors = []
  if (!reg.test(value) && value) {
    errors.push(new Error(message || '请输入邮箱格式,如：xxx@mgdaas.com'))
  }
  callback(errors)
}
