// 正则匹配规则

// 校验银行卡号
// 与String.prototype.split('') 结合使用，以获取数字数组。获得最后一个数字。实施luhn算法。如果被整除，则返回，否则返回
export function luhnCheck(num) {
  const arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x))
  const lastDigit = arr.splice(0, 1)[0]
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0)
  sum += lastDigit
  return sum % 10 === 0
}
