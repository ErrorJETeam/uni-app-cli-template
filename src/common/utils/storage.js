import {
  judgeType
} from './judege'

// 同步设置缓存
export const setStorageSync = (k, v) => uni.setStorageSync(k, judgeType(v) === 'object' ? JSON.stringify(v) : v)
// 同步获取缓存
export const getStorageSync = (k) => {
  const storage = uni.getStorageSync(k)
  if (!storage) return undefined

  const type = judgeType(JSON.parse(storage))
  if (type === 'object') {
    return JSON.parse(storage)
  } else {
    return storage
  }
}
