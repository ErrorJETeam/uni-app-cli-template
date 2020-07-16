import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './apis'
import utils from '@/common/utils/util.js';

// uView 库
import uView from "uview-ui";
Vue.use(uView);

// uView - icon组件
import KtIcon from "@/components/kt-icon/kt-icon.vue"
Vue.component('kt-icon', KtIcon)

// filters
import * as filters from '@/common/utils/filters' 
Object.keys(filters).forEach(item => Vue.filter(item, filters[item])) 

// moment
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

// vue-router
import { RouterMount } from 'uni-simple-router'

// 引入 Mescroll
import MescrollBody from "@/vendor/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/vendor/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

// vconsole
/* #ifndef MP-WEIXIN */
import '@/vendor/vconsole.js'
/* #endif */

Vue.prototype.$utils = utils // 全局 util
Vue.prototype.$api = api // API 全局使用

// 图片加持(原型对象测试)
Vue.prototype.$imgSuffix = '?imageView&thumbnail=369x0&quality=75&tostatic=0';
import staticImage, {staticServerUrl} from '@/common/static/images.js'
Vue.prototype.$staticImage = staticImage // JS 用
Vue.prototype.$staticServer = staticServerUrl // css 用
// 图片缺省占位图
Vue.prototype.$imgError = staticImage['no-img']

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
