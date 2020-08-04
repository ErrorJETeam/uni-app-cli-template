// 金额整数部分每3位就用逗号隔开
export const NumFormat = (value) => {
  if (!value) return '0.00'

  var intPart = Number(value) - (Number(value) % 1)
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  var floatPart = '.00'
  var value2Array = value.toString().split('.')

  if (value2Array.length == 2) {
    floatPart = value2Array[1].toString()

    if (floatPart.length == 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}