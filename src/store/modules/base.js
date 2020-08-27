import * as types from '../action-types.js'

// 状态定义
const state = {
  requestToken: [] // 请求中断任务方法队列
}

// 状态管理
const mutations = {
  [types.SET_REQUEST_TOKEN](state, payload) {
    if (payload === 'clear') {
      state.requestToken = []
    } else {
      state.requestToken = [...state.requestToken, payload]
    }
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
