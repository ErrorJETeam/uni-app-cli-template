import Vue from 'vue'
import App from './App'
// eslint-disable-next-line no-unused-vars
import router from './router'
import store from './store'

// uView 库
import uView from 'uview-ui'
Vue.use(uView)

// uView - icon组件
import YtIcon from '@/components/yt-icon/yt-icon.vue'
Vue.component('yt-icon', YtIcon)

// 全局 util,
import utils from '@utils'
Vue.use(utils)

import apis from './apis'
Vue.use(apis)

// moment
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

// vue-router
import { RouterMount } from 'uni-simple-router'

// 引入 Mescroll
import MescrollBody from '@/vendor/mescroll-uni/mescroll-body.vue'
import MescrollUni from '@/vendor/mescroll-uni/mescroll-uni.vue'
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

// 图片加持(原型对象测试)
import cdnImages from '@/common/static/images.js'
Vue.prototype.$cdnImages = cdnImages // JS 用

// 图片缺省占位图
Vue.prototype.$errorImg = require('static/image/default.png')

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app')
// #endif

// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
