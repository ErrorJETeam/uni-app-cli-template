import store from '@/store'
import * as types from '@/store/action-types.js'

// FIX 目前仅支持 hooks 中第一个方法。在正规的 vue-router 里可以这样写，但是在 uni-simple-router 中不支持
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

  // permission 权限控制：用户导航权限
  // 针对的是路由本身的权限限制
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
  },

  // 菜单权限：控制的是用户的角色权限
  menuPermission: async function(to, from, next) {
    if (store.state.base.hasPermission) {
      // 是否添加过路由，若添加过，就继续走
      if (!store.state.base.menuPermission) {
        // 根据用户权限获取最新路由
        store.dispatch(`base/${types.SET_ROUTE}`)
        next({ ...to, replace: true }) // hack。这里是有了菜单权限后，重新加载一次，才能走到下面
      } else {
        // 已经有菜单权限了，或者页面加载完毕后
        next()
      }
    } else {
      next()
    }
  }
}
