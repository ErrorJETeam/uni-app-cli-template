// router/modules/index.js
import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)

// 模块化集成
const files = require.context('./modules', false, /\.js$/)
const routes = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  routes.push(...item)
})

// 初始化
const router = new Router({
	h5: {
		loading: true // 顶部加载
	},
	debugger: true, // 报错调试
	encodeURI: false, // URL 传参编码
	// paramsToQuery: true,
	routes //路由表
});

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
	const whiteList = ['/pages/login/login']
	next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {})

export default router
