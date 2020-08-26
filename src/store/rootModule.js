import getters from './getters.js'
import * as types from './action-types'

// 根模块
export default {
  // 数据和状态
  state: {
    logInfo: {}
  },
  // 将状态放到 state 中
  mutations: {
    async [types.SET_LOGIN](state, payload) {
      state.logInfo = payload
    }
  },
  // 调用接口，提交 mutations
  actions: {
    async [types.SET_LOGIN]({ commit }) {
      try {
        const logInfo = { name: 'ErrorJE' } // 用 接口获取
        commit(types.SET_LOGIN, logInfo)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  modules: {},
  getters // this.$store.getters.xxxx
}
