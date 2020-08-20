// 金额整数部分每3位就用逗号隔开
export const NumFormat = value => {
  if (!value) return '0.00'

  var intPart = Number(value) - (Number(value) % 1)
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  var floatPart = '.00'
  var value2Array = value.toString().split('.')

  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()

    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}

/**
 * 10000 => "10,000"
 * @param {number} num
 * 与上面的方法作用一样
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 首字母大写
export function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join('')
}
// 首字母小写
export function decapitalize([first, ...rest]) {
  return first.toLowerCase() + rest.join('')
}
// 所有单词首字母大写
// capitalizeEveryWord('hello world!'); // 'Hello World!'
export function capitalizeEveryWord(str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}

// 计算字符串的字节数
export function byteLength(str) {
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

// 计算字符串的字节数2
export function byteSize(str) {
  return new Blob([str]).size
}

// 指定位数，不足的前置补 0
// addZero(3) 答案是 03
export function addZero(num, len = 2) {
  return `${num}`.padStart(len, '0')
}

// 字符串去重
// 利用 set 数据结构
export function uniqueStr(str) {
  return [...new Set(str)].join('')
}
