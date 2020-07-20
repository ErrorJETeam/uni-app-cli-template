// import Request from './request.js'
import Request from '@/vendor/request/index.js'
import config from '@/common/config/config.js'
import store from '@/store'
import {
	showError
} from '@request/exception.js'
import {
	loading
} from '@request/loading.js';
import {
	getStorageSync
} from '@/common/utils/util.js'
import {
	addSign,
	addAppToken,
	handleEncrypt,
	decrypt
} from '@request/cryption.js';

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
		auth: true, // token 失效重置 TODO 完善
		cryption: false, // 数据加解密
		addSign: false, // 验签
		restful: true, // restful 风格接口
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
	const accessToken = getStorageSync('wx_tokens') ? getStorageSync('wx_tokens').accessToken : ''
	if (options.custom.addSign) {
		options.params = {
			...options.params,
			...addSign()
		}
	}

	options.header = {
		...options.header,
		chis_token: uni.getStorageSync('chis_token') || '',
		accessToken
	}

	addAppToken(options)

	// 自定义属性配置
	options.custom.cryption && handleEncrypt(options)

	// 默认加载loading
	if (!options.hideLoading) {
		loading.addLoading()
	}

	// 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	// 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	// if (!token) cancel('token 不存在')

	return options
}, err => {
	loading.resetLoading()
	showError(false, '接口请求异常')
	return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use((res) => { // 响应数据
	loading.closeLoading()
	const options = res.config
	let data // 返回数据

	// 存储 token
	const token = res.header && (res.header.chis_token || res.header.CHIS_TOKEN)
	token && uni.setStorageSync('chis_token', token)

	options.custom.cryption && decrypt(res)

	if (options.method === 'DOWNLOAD') { // 资源下载，返回临时路径
		data = res.tempFilePath
	} else if (options.custom.restful) {
		data = res.data
	} else {
		data = res.data.data
	}

	return data
}, async (res) => { // 响应错误
	loading.resetLoading()
	const options = res.config
	options.custom.cryption && decrypt(res)

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


export default http
