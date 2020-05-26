// import Request from './request.js'
import Request from '@/vendor/request/index.js'
import config from '@/common/js/config.js'
import { statusMsg } from '@/utils/exception_code.js'
import {
	addSign,
	addAppToken,
	handleEncrypt,
	decrypt
} from '@/utils/cryption.js';

const http = new Request()

// 设置全局配置
http.setConfig((options) => {
	// 基地址
	options.baseUrl = process.env.NODE_ENV === 'development' ?
		config.baseUrl['dev'] :
		config.baseUrl['prod']
	// 请求头
	options.header = {
		...options.header,
		appToken: ''
	}
	// 配置开关
	options.custom = {
		auth: true, // token 失效重置 TODO 完善
		cryption: false, // 数据加解密
		addSign: false ,// 验签
		restful: true ,// restful 风格接口
		showToast: true // 是否自动显示错误信息
	}
	return options
})

// 验证器
http.validateStatus = (statusCode) => {
	return String(statusCode).startsWith('2')
}

// 请求拦截器
http.interceptor.request((options, cancel) => {
	if (options.custom.addSign) {
		options.params = {
			...options.params,
			...addSign()
		}
	}

	options.header = {
		...options.header,
		chis_token: uni.getStorageSync('chis_token') || ''
	}

	addAppToken(options)

	// 自定义属性配置
	// options.custom.xxx
	options.custom.cryption && handleEncrypt(options)

	// 默认加载loading
	if (!options.hideLoading) {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}

	// 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	// 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	// if (!token) cancel('token 不存在')

	return options
})

// 响应拦截器
http.interceptor.response((res) => { // 响应数据
	const options = res.config
	let data // 返回数据
	uni.hideLoading()

	// 存储 token
	const token = res.header && (res.header.chis_token || res.header.CHIS_TOKEN)
	token && uni.setStorageSync('chis_token', token)

	options.custom.cryption && decrypt(res)

	if (options.method === 'DOWNLOAD') { // 资源下载，返回临时路径
		data = res.tempFilePath
	} else if(options.custom.restful) {
		data = res.data
	} else {
		data = res.data.data
	}

	return data
}, (res) => { // 响应错误
	const options = res.config
	options.custom.cryption && decrypt(res)
	
	if(!options.custom.showToast) {
		return res.data || res
	}
	
	// statusCode HTTP码 | error_code 后端定义码
	let {
		statusCode,
		data: {
			code: error_code,
			errorCode
		}
	} = res
	
	error_code = error_code || errorCode
	
	if (options.custom.auth && error_code === '10001') {
		showError(error_code, res.data)
		uni.setStorageSync('chis_token', '')
	} else {
		error_code ? showError(error_code, res.data) : showError(statusCode, res.data)
	}

	return res.data || res
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
