import * as types from '../action-types.js'

// 状态定义
const state = {
  userInfo: {
    branchId: '100000',
    empId: '100000000003'
  },
  hasLogin: false,
  leaveTime: 0,
  token: '',
  userName: '测试使用 userName'
}

// 状态管理
const mutations = {
  // 记录离开时间
  SET_LEAVE_TOME(state, payload) {
    const date = new Date()
    state.leaveTime = date.getTime()
  },

  // 改变登录状态
  [types.SET_LOGIN](state, temp) {
    state.userInfo = Object.assign({}, state.userInfo, temp)
    state.token = temp.token
  }
}

// 业务操作
const actions = {
  // 登录
  [types.SET_LOGIN]({ commit }, payload) {
    console.log('调用 vuex 登录')
    const temp = {
      hasLogin: true,
      token: 1,
      profile: 2
    }
    commit(types.SET_LOGIN, temp)
    uni.setStorageSync('userInfo', JSON.stringify(state.userInfo)) // 缓存数据
    return 'vuex 测试数据返回'
  },

  // 退出登录
  storeLogout({
    commit
  }, payload) {
    const temp = {
      hasLogin: false,
      token: '',
      profile: {}
    }
    commit('SET_LEAVE_TOME')
    commit('SET_LOGIN', temp)
    uni.removeStorageSync('userInfo') // 清理缓存
  }
}

export default {
  state,
  mutations,
  actions
}
