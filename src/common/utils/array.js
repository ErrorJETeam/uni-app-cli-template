/** ******************************** 数组创建 ************************************ */
// 创建 0-n 的数组
// ...Array(10)，展开一个长度是10的数组，但是元素都是 undefined
// ...Array(10).keys() ， keys()拿到的是元素的下标，所以展开后是 0-9
export function createNumberArr(n) {
  const arr = []
  arr.push([...Array(n).keys()])
  return arr
}

// 创建 n 个元素数组，且值都为 i
export function createFillArr(n, i) {
  return Array(n).fill(i)
}

/** ******************************** 数组去重 ************************************ */
// 数组去重：纯 array API 实现
export function uniqueArray(arr) {
  var retArray = []
  for (var i = 0; i < arr.length; i++) {
    if (retArray.indexOf(arr[i] < 0)) {
      retArray.push(arr[i])
    }
  }
}

// 数组去重：利用 Set 数据结构
export function uniqueArraySet(arr) {
  return Array.from(new Set(arr))
}

// 数组去重：最简单的双重循环
export function uniqueArrayDouble(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] === arr[i]) {
        arr.splice(j--, 1)
      }
    }
  }
  return arr
}

/** ******************************** 数组过滤 ************************************ */
// 清洗数组，去掉空项
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

// json格式传参 => url params（需要用到上面的 cleanArray）
// 如 {"UserID":11, "Name":"Truly", "Email":"zhuleipro◎hotmail.com"}
// 最后会转为字符串用 & 连接
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}
