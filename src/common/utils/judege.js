// 判断是否为 promise
export const _isPromise = (obj) => {
  return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

// 判断数据类型终极方案
// 把类型结果都转为小写的
export const judgeType = data => {
  const toString = Object.prototype.toString
  const dataType =
		toString.call(data).replace(/\[object\s(.+)\]/, '$1').toLowerCase()
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

// 判断书否为非数字值(现在已经有 isNan 这个原生函数了)
export function _isNaN(v) {
  return !(typeof v === 'string' || typeof v === 'number') || isNaN(v)
}
