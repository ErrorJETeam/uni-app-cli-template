import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

// 根模块
const rootModule = {
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  getters // this.$store.getters.xxxx
}

// vuex 模块集成
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key, index) => {
  const store = files(key).default
  const moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '')
  const modules = rootModule.modules || {}
  modules[moduleName] = store
  modules[moduleName].namespaced = true
  rootModule.modules = modules
})

const store = new Vuex.Store(rootModule)

export default store
