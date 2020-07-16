import Request from '@/vendor/request/index.js'
import {
	baseURL
} from '@/common/config/config.js'
import {
	loading
} from '@request/loading.js';
import {
	showError
} from '@request/exception.js';

import store from '@/store'

const http = new Request()

const cacheQueue = [] // 二次重发缓存队列
let _loaded = false // loading 锁

// 设置全局配置
http.setConfig((options) => {
	// 基地址
	options.baseURL = process.env.NODE_ENV === 'development' ?
		baseURL['dev'] :
		baseURL['prod']
	// 请求头
	options.header = {
		...options.header,
		SRType: "wechat",
		Cookie: uni.getStorageSync('cookie')
	}
	// 定制化配置
	options.custom = {
		loading: true, // 请求时开启 loading
		toast: true, // 请求异常时开启 toast
		apiName: true // 默认都需要 api_name
	}
	return options
})

// 验证器
http.validateStatus = (statusCode) => {
	return String(statusCode).startsWith('2')
}

// 请求拦截器
http.interceptors.request.use((options, cancel) => {
	const custom = options.custom
	if (custom.loading) {
		loading.addLoading()
	}

	// 加塞 body 数据字段
	const localStorage = uni.getStorageSync('wx_base_info')
	if (localStorage) {
		options.data['openId'] = uni.getStorageSync('wx_base_info').openId
	}
	if (custom.apiName) {
		options.data['api_name'] = options.url
		options.url = '/'
	}

	return options
}, err => {
	loading.resetLoading()
	showError(false, '接口请求异常')
	return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use((res) => { // 响应数据
	loading.closeLoading()
	const {
		data
	} = res

	showError(data.result, data.msg)

	return res.data
}, async (err) => { // 响应错误
	loading.resetLoading()
	showError(false, '接口响应异常')

	return Promise.reject(err)
})

export default http
