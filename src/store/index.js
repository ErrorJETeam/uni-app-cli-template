import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './rootModule'

Vue.use(Vuex)

// vuex 模块集成
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key, index) => {
  // 模块名 + 模块值
  const store = files(key).default
  const moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '')
  const modules = rootModule.modules || {}
  modules[moduleName] = store
  modules[moduleName].namespaced = true
})

export default new Vuex.Store(rootModule)
