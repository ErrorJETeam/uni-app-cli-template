import store from '@/store'
import * as types from '@/store/action-types.js'

export default {
  // beforeEach 方法
  cancelToken: async function(to, from, next) {
    console.log('请求中断控制')
    // 这里的 this 指向路由实例，所以可以 this.push
    // TODO 监听 tabbar 和 原生返回情况下的页面切换。可以利用 onShow
    const ajaxToken = store.state.base.requestToken
    ajaxToken.forEach(fn => fn()) // 页面切换遍历请求中断
    store.commit(`base/${types.SET_REQUEST_TOKEN}`, 'clear') // 清空 vuex 队列
    next()
  },

  // permission 权限控制
  // FIX 目前仅支持 hooks 中第一个方法。已提 Issue
  permission: async function(to, from, next) {
    console.log('权限控制')
    // eslint-disable-next-line no-unused-vars
    const whiteList = ['/pages/login/login']
    const hasPermission = true // 一般从 vuex 中获取
    if (hasPermission) {
      // 用户已经登录且拥有权限
      if (to.name === 'login') next('/')
      else next()
    } else {
      // 用户没有登录，但是某些页面需要登录
      const needLogin = to.matched.some(item => item.meta.login)
      if (needLogin) {
        next('/login')
      } else {
        next()
      }
    }
  }
}
