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
