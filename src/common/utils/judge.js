// 判断是否为 promise
export const _isPromise = obj => {
  return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

// 判断数据类型终极方案
// 把类型结果都转为小写的
export const judgeType = data => {
  const toString = Object.prototype.toString
  const dataType = toString
    .call(data)
    .replace(/\[object\s(.+)\]/, '$1')
    .toLowerCase()
  return dataType
}
// 传入数据和类型（小写），得到改数据类型是否与传入的类型判断一致
// 借助上面的 judgeType 方法
export function classOf(data, type) {
  return judgeType(data) === type
}

// 检查值是否为特定类型
// 如 is(ArrayBuffer, new ArrayBuffer()); // true
// eslint-disable-next-line no-sparse-arrays
export const is = (type, val) => ![, null].includes(val) && val.constructor === type

// 判断数据是否为原始数据：symbol 也算
export function isStatic(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    typeof value === 'symbol' ||
    value === null
  )
}

// 判断是否为引用类型
// arrays, functions, objects, regexes, new Number(0), 以及 new String('')
export function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

// 判断是否为非数字值(现在已经有 isNan 这个原生函数了)
export function _isNaN(v) {
  return !(typeof v === 'string' || typeof v === 'number') || isNaN(v)
}

// 深度判断全等
export function equals(a, b) {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  if (a.prototype !== b.prototype) return false
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  return keys.every(k => equals(a[k], b[k]))
}

// 数据判空（简单数据的判断）
// 全等符号不能处理 NaN(不等于任何值，也不等于自己），+0 === -0 是 true
// Object.is(NaN, NaN) 这两个用这个 API 来判断
// 简化写法: const isNull = (obj) => (obj === null || obj === undefined || obj.trim() === "")
export function isNull(obj) {
  if (obj == null || obj === undefined || obj.trim() === '') {
    return true
  }
  return false
}

// 判断各种类型的数据是否为空（数组，对象等）
export function isEmpty(value) {
  // 判断一个值是否是一个function对象
  const funcTag = '[object Function]'
  const genTag = '[object GeneratorFunction]'
  const asyncTag = '[object AsyncFunction]'
  function isObject(value) {
    var type = typeof value
    return value != null && (type === 'object' || type === 'function')
  }
  function baseGetTag(value) {
    // 在任何值上调用Object原生的toString()方法，都会返回一个[Object NativeConstructorName] 格式的字符串。
    // 每个类在内部都有一个[[Class]]属性，这个属性中就指定了上述字符串中的构造函数名
    return Object.prototype.toString.call(value)
  }
  function isFunction(value) {
    if (!isObject) {
      return false
    }

    var tag = baseGetTag(value)
    return tag === funcTag || tag === genTag || tag === asyncTag
  }

  // 判断一个值是否是一个有效的array-like对象的length属性
  // 是数字且大于0小于Number.MAX_SAFE_INTEGER的整数
  const MAX_SAFE_INTEGER = 9007199254740991
  function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
  }
  // 类数组判断
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value)
  }
  // 类对象判断
  function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(obj) === proto
  }

  if (value == null) {
    return true
  }
  if (isArrayLike(value)) {
    //  检查是否是类数组
    return !value.length
  } else if (isPlainObject(value)) {
    // 是否为对象，判断是否有属性
    for (const key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false
      }
    }
  }
  return false
}
