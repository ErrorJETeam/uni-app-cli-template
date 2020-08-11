import qs from 'qs'
const pending = new Map()

// 创建请求标识
export const createRequestIdentify = config => {
  const {
    url,
    baseURL,
    method,
    data,
    params
  } = config

  return [
    method,
    baseURL,
    url,
    qs.stringify(params),
    qs.stringify(data)
  ].join('&')
}

// map 中不存在请求记录，则放进去
export const addPending = (config) => {
  const key = createRequestIdentify(config)
  if (!pending.has(key)) {
    pending.set(key, config)
  }
}

// 在 pending 中存在该请求标识，则执行取消，并删除
export const removePending = config => {
  const key = createRequestIdentify(config)
  if (pending.has(key)) {
    pending.delete(key)
    return false
  }
  return true
}

// 取消所有的请求，并清空队列
// 用在路由钩子中，也就是页面跳转前
export const clearPending = _ => {
  for (const [key, cancel] of pending) {
    cancel(key)
  }
  pending.clear()
}
