import * as types from '../action-types.js'
import router from '../../router/index.js'

// 过滤菜单权限路由
function filterRouter(authList) {
  const auths = authList.map(item => item.auth)
  function filter(routers) {
    return routers.filter(route => {
      // 判断某个路由是否有角色权限
      if (auths.includes(route.meta.auth)) {
        // 嵌套路由继续递归
        if (route.children) {
          router.children = filter(route.children)
        }
      }
    })
  }
  // 从定义好的路由表中传入
  return filter(router)
}

// 状态定义
const state = {
  requestToken: [], // 请求中断任务方法队列
  menuPermission: false,
  btnPermission: ['edit', 'delete'] // 按钮权限也是接口来的
}

// 状态管理
const mutations = {
  // 任务中断列表
  [types.SET_REQUEST_TOKEN](state, payload) {
    if (payload === 'clear') {
      state.requestToken = []
    } else {
      state.requestToken = [...state.requestToken, payload]
    }
  },

  [types.SET_MENE_PERMISSION](state, has) {
    state.menuPermission = has
  }
}

const actions = {
  // 动态权限菜单
  [types.SET_ROUTE]({ commit }, payload) {
    const authList = state.authList
    if (authList) {
      const routes = filterRouter(authList)
      // 找到管理相关路由，覆盖其孩子，然后动态增加路由
      const route = router.options.routes.find(item => item.path === '/manager')
      route.children = routes
      router.addRoutes([route])
      commit(types.SET_MENE_PERMISSION, true) // 表示已经设置完权限
    } else {
      // 没权限也要设置成有权限
      commit(types.SET_MENE_PERMISSION, true)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
