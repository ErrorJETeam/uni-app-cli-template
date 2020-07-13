// import Request from './request.js'
import Request from '@/vendor/request/index.js'
import config from '@/common/config/config.js'
import store from '@/store'
import {
	statusMsg
} from '@/utils/exception_code.js'

const http = new Request()
let cache

// 设置全局配置
http.setConfig((options) => {
	// 基地址
	options.baseURL = process.env.NODE_ENV === 'development' ?
		config.baseURL['dev'] :
		config.baseURL['prod']
	// 请求头
	options.header = {
		...options.header,
		appToken: ''
	}
	// 配置开关
	options.custom = {
		showToast: true // 是否自动显示错误信息
	}
	return options
})

// 验证器
http.validateStatus = (statusCode) => {
	return String(statusCode).startsWith('2')
}

// 请求拦截器
http.interceptors.request.use((options, cancel) => {
	options.header = {
		...options.header,
		chis_token: uni.getStorageSync('chis_token') || ''
	}

	// 默认加载loading
	if (!options.hideLoading) {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}

	return options
})

// 响应拦截器
http.interceptors.response.use((res) => { // 响应数据
	const options = res.config
	let data // 返回数据
	uni.hideLoading()

	// 存储 token
	const token = res.header && (res.header.chis_token || res.header.CHIS_TOKEN)
	token && uni.setStorageSync('chis_token', token)

	if (options.method === 'DOWNLOAD') { // 资源下载，返回临时路径
		data = res.tempFilePath
	} else {
		data = res.data.data
	}

	return data
}, async (res) => { // 响应错误
	uni.hideLoading()
	const options = res.config

	if (!options.custom.showToast) {
		return res.data || res
	}

	let error_code
	const statusCode = res.statusCode // statusCode HTTP码
	const data = res.data
	if (data) {
		error_code = data.code || data.errorCode // error_code 后端定义码
	} else {
		return Promise.reject(res)
	}

	if (options.custom.auth && error_code == 1) {
		showError(error_code, res.data)
		uni.setStorageSync('chis_token', '')
	} else if (error_code == 40101) { // accessToken 失效
		cache = res.config
		await store.dispatch('wxUser/quickLogin', true)
		return http.request(res.config);
	} else if (error_code == 40103) { // 微信登录凭证失效
		await store.dispatch('wxUser/quickLogin', false)
		return http.request(cache);
	} else {
		error_code ? showError(error_code, res.data) : showError(statusCode, res.data)
	}

	return Promise.reject(res.data || res)
})

function showError(error_code, serverError) {
	let tip
	if (!error_code) {
		tip = statusMsg['-1']
	} else {
		if (statusMsg[error_code] === undefined) {
			tip = serverError.msg || serverError.message
		} else {
			tip = statusMsg[error_code]
		}
	}
	uni.showToast({
		icon: 'none',
		mask: true,
		title: tip,
		duration: 3000
	});
}

export default http
