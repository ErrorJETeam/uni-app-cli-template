// 请求 loading
let _count = 0
export const loading = {
  addLoading(tip) {
    _count++
    uni.showLoading({
      title: tip || '加载中...',
      mask: true
    })
  },
  closeLoading() {
    _count--
    if (_count === 0) {
      uni.hideLoading()
    }
  },
  resetLoading() {
    _count = 0
    uni.hideLoading()
  }
}
