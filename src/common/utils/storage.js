import { judgeType } from './judge'

// 同步设置缓存
export const setStorageSync = (k, v) => uni.setStorageSync(k, judgeType(v) === 'object' ? JSON.stringify(v) : v)
// 同步获取缓存
export const getStorageSync = k => {
  const storage = uni.getStorageSync(k)
  if (!storage) return undefined

  const type = judgeType(JSON.parse(storage))
  if (type === 'object') {
    return JSON.parse(storage)
  } else {
    return storage
  }
}

// 解决 MPA 页面返回被微信等缓存
window.onpageshow = function (event) {
  // event.persisted 判断浏览器是否有缓存, 有为true, 没有为false
  if (event.persisted) {
    console.log('页面重新加载 reload')
    window.location.reload()
  }
}
