// 生成随机数
/**
 * @param randomFlag ( 指定位数 false | 范围位数 true )
 */
export const _validImgType = (randomFlag, min, max) => {
  let str = ''
  let range = min
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
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

// 小数位精确
// 传入数据和位数
// e 是科学技术法 *10 的意思
// 先将数转为整数(根据位数来*10)，四舍五入后再缩回带小数位的浮点数
// 还可以直接用来计算 toFixed(x) + toFixed(y)
export function toFixed(n, decimals = 0) {
  return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
}
