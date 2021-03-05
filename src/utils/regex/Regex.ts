/**
 * @description 正则表达式校验
 * @author PP
 */
/**
 * @description 邮箱
 * @param {*} string: string
 */
export function isEmail(string: string) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(string)
}

/**
 * @description 手机号码
 * @param {*} string: string
 */
export function isMobile(string: string) {
  return /^1[0-9]{10}$/.test(string)
}

/**
 * @description 电话号码
 * @param {*} string: string
 */
export function isPhone(string: string) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(string)
}

/**
 * @description URL地址
 * @param {*} string: string
 */
export function isURL(string: string) {
  return /^http[s]?:\/\/.*/.test(string)
}

/**
 * @description 验证纳税人识别号格式
 * @param  taxId [纳税人识别号]
 * @return true格式正确，false格式错误
 */
export function checkTaxId(taxId: string) {
  const regArr = [
    /^[\da-z]{10,15}$/i,
    /^\d{6}[\da-z]{10,12}$/i,
    /^[a-z]\d{6}[\da-z]{9,11}$/i,
    /^[a-z]{2}\d{6}[\da-z]{8,10}$/i,
    /^\d{14}[\dx][\da-z]{4,5}$/i,
    /^\d{17}[\dx][\da-z]{1,2}$/i,
    /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i,
    /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i,
    /^[\d]{6}[\da-z]{13,14}$/i,
  ]

  for (let x: number = 0; x < regArr.length; x++) {
    if (regArr[x].test(taxId)) {
      return true
    }
  }

  // 纳税人识别号格式错误
  return false
}
