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

// 按索引合并两个数组
export function arrayMerge(topicResList = [], overTopicList) {
  // 1 将数组转为对象，key 就是元素的index
  const obj = Object.assign({}, { ...topicResList }, { ...overTopicList })
  // 2 转回数组
  for (const [key, value] of Object.entries(obj)) {
    topicResList[key] = value
  }
  return topicResList
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

/** ******************************** 数据检出重复元素 ************************************ */
// 场景:后端每次给一个数组，前端比较该新数组和原本存在的旧数组中，哪些元素是重复和新增的
// 返回: oldArray 重复元素组成的数组; newArray 新增元素组成的数组; lastArray 本地的旧数组

// 1 双层 for 循环：在元素只有1-2百个的时候性能是最高的
export function checkCloneElByFor() {
  let lastArray = [] // 本地的旧数组
  return function filterArray(arr) {
    const oldArray = [] // 重复部分
    const newArray = [] // 新增部分
    // 双重遍历，对新数据的每个元素，去与老数组遍历比较
    for (let i = 0; i < arr.length; i++) {
      // 遍历传进来的数组数据
      let isNewArr = true
      for (let j = 0; j < lastArray.length; j++) {
        // 以某元素的id值作为判断依据
        // 若是重复值，放入 oldArray
        if (arr[i].id === lastArray[j].id) {
          isNewArr = false
          oldArray.pus(lastArray[j])
          break
        }
      }
      if (isNewArr) {
        newArray.push(arr[i])
      }
    }
    // 拼接本地新旧数组
    lastArray = oldArray.concat(newArray)
    return {
      oldArray,
      newArray
    }
  }
}

// 2 set 实现：
export function checkCloneElBySet() {
  const lastArray = new Set()
  return function filterArray(arr) {
    const oldArray = []
    const newArray = []
    arr.map(item => (lastArray.has(item.id) ? oldArray.push(item) : newArray.push(item)))
    newArray.map(item => lastArray.add(item.id))
    return { oldArray, newArray }
  }
}

// 利用 set 还可以直接判断新旧两个数组是否相等
// 数组都 set 化并且合并，然后比较 length
export function checkArrSames(arr1, arr2) {
  return [...new Set(arr1)].length === [...new Set([...arr1, ...arr2])].length
}

// 3 map 实现
export function checkCloneElByMap() {
  const lastArray = new Map()
  return function filterArray(arr) {
    const oldArray = []
    const newArray = []
    arr.map(item => (lastArray.has(item.id) ? oldArray.push(item) : newArray.push(item)))
    newArray.map(item => lastArray.set(item.id))
    return { oldArray, newArray }
  }
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

// 过滤空值
export function cleanArray2(arr) {
  // [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean) ==> [1, 2]
  return arr.filter(Boolean)
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

/** ******************************** 数组计算 ************************************ */
// 归类统计
// ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'] => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
export function ClassifyStatistics(arr) {
  return arr.reduce(function(obj, name) {
    obj[name] = obj[name] ? ++obj[name] : 1
    return obj
  }, {})
}

/** ******************************** 数组转换 ************************************ */
// 数组转对象
export function arrTranObj(array, type) {
  const obj = {}
  switch (type) {
    case 'forEach':
      array.forEach((el, idx) => {
        obj[idx] = el
      })
      return obj
    case 'assign':
      return Object.assign({}, [1, 2, 3])
    default:
      return { ...array }
  }
}

/** ******************************** 数组算法 ************************************ */
// 洗牌算法：使用 fisher-yates 算法随机排序数组的元素
export function huffle([...arr]) {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}
