// 域名
const domains = {
	dev: '',
	prod: ''
}

// 业务模块
export const bizModules = {
	file: '',
	user: ''
}

const config = {
	// 开发和打包时域名
	baseUrl: {
		dev: domains['dev'],
		prod: domains['prod']
	}
}

// 生成业务模块的全量地址
export const getBaseUrl = biz => {
	const domain = process.env.NODE_ENV === 'development' ?
		config.baseUrl['dev'] :
		config.baseUrl['prod']
	return `${domain}${bizModules[biz]}`
}

export default config
