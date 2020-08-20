// 对象转 a=b&c=d
export const obj2Param = function(obj) {
  let str = ''
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    if (i !== keys.length - 1) {
      str += `${keys[i]}=${obj[keys[i]]}&`
    } else {
      str += `${keys[i]}=${obj[keys[i]]}`
    }
  }
  return str
}

// 对象转 a=b&c=d, 且排序
export function objKeySort(obj) {
  // 先用 Object 内置类的 keys 方法获取要排序对象的属性名数组，再利用 Array 的 sort 方法进行排序
  var newkey = Object.keys(obj).sort()
  console.log('newkey=' + newkey)
  var newObj = '' // 创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    // 遍历 newkey 数组
    newObj += [newkey[i]] + '=' + obj[newkey[i]] + '&'
  }
  return newObj.substring(0, newObj.length - 1)
}

// url params => obj
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 获取 URL 上的参数，并转为对象
// 默认取当前页面
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 简单版本深拷贝: 建议使用 lodash's _.cloneDeep
export function deepClone(source) {
  // 必须是引用类型
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
