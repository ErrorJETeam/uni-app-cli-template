import store from '@/store'
import * as types from '@/store/action-types.js'

export default {
  // beforeEach 方法
  cancelToken: async function(to, from, next) {
    // 这里的 this 指向路由实例，所以可以 this.push
    // TODO 监听 tabbar 和 原生返回情况下的页面切换。可以利用 onShow
    const ajaxToken = store.state.base.requestToken
    ajaxToken.forEach(fn => fn()) // 页面切换遍历请求中断
    store.commit(`base/${types.SET_REQUEST_TOKEN}`, 'clear') // 清空 vuex 队列
    next()
  },

  // permission 权限控制
  permission: async function(to, from, next) {
  // eslint-disable-next-line no-unused-vars
    const whiteList = ['/pages/login/login']
    next()
  }
}
