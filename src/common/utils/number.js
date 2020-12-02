/** ******************************** 随机数 ************************************ */
// 生成随机数
/**
 * @param randomFlag ( 指定位数 false | 范围位数 true )
 */
export const _validImgType = (randomFlag, min, max) => {
  let str = ''
  let range = min
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

// 生成唯一的随机数
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/** ******************************** 数字格式化 ************************************ */
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

// 小数位精确
// 传入数据和位数
// e 是科学技术法 *10 的意思
// 先将数转为整数(根据位数来*10)，四舍五入后再缩回带小数位的浮点数
// 还可以直接用来计算 toFixed(x) + toFixed(y)
export function toFixed(n, decimals = 0) {
  return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
}

/**
 * 数字格式化
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

// 四舍五入，指定小数位
// round(1.005, 2); // 1.01
export const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

/** ******************************** 判断 ************************************ */
// 判断奇偶数
export const OddEven = num => (num & 1 ? 'odd' : 'even')

// max 最大值
export function arrOfMax(arr) {
  arr = arr.filter(item => !isNaN(item))
  return arr.length ? Math.max.apply(null, arr) : undefined
}
// min 最小值
export function arrOfMin(arr) {
  arr = arr.filter(item => !isNaN(item))
  return arr.length ? Math.min.apply(null, arr) : undefined
}

// 获取有几位小数
export function judgePointNumber(n) {
  return n.toString().split('.')[1].length
}

/** ******************************** 计算 ************************************ */
// 计算数组或多个数字总和
// sum(1, 2, 3, 4); | sum(...[1, 2, 3, 4]);
export const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0)

// 两数组交集：普通版
export const intersection1 = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}

// 数组交集：加强版，符合条件的交集
export const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(x => s.has(fn(x)))
}

// 数组交集：大师版，先比较后返回交
// intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
export const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1)

/** ******************************** 货币 ************************************ */
// 货币单位转换
// toCurrency(123456.789, 'EUR'); // €123,456.79
// toCurrency(123456.789, 'USD', 'en-us'); // $123,456.79
// toCurrency(123456.789, 'USD', 'fa'); // ۱۲۳٬۴۵۶٫۷۹
// toCurrency(322342436423.2435, 'JPY'); // ¥322,342,436,423
export const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n)
