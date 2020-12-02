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

// 用户名验证：如4-16位字母+数字+下划线+减号
export function validUserName(userName) {
  var pattern = /^[a-zA-Z0-9_-]{4,16}$/
  if (pattern.test(userName.trim())) {
    return true
  } else {
    return false
  }
}

// 用户密码验证：如6-20位字母+数字组合
export function validPassword(password) {
  var pattern = /^[a-zA-Z0-9]{6,20}$/
  if (pattern.test(password.trim())) {
    return true
  } else {
    return false
  }
}

// 验证（邮箱，手机，身份证，数字，金额）字符串格式
export function validate(text, type) {
  let res
  let reg
  switch (type) {
    case 'email':
      reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      res = reg.test(text)
      break
    case 'mobile':
      reg = /^1[0-9]{10}$/
      res = reg.test(text)
      break
    case 'number':
      reg = /^[+-]?[\d.]+$/
      res = reg.test(text)
      break
    case 'dollar':
      reg = /^[+-]?[\d.,]+$/
      res = reg.test(text)
      break
    default:
      res = true
      break
  }
  var map = {
    email: '邮箱',
    mobile: '手机',
    idcard: '身份证号',
    number: '数字',
    dollar: '金额'
  }
  return {
    status: res,
    message: res === true ? '验证通过' : map[type] + '格式不正确'
  }
}

// 长度验证
export function validLength(obj, length) {
  if (obj.trim().length < length) {
    return true
  }
  return false
}
