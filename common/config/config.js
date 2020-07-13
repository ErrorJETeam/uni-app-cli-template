// 域名
const domains = {
	dev: 'https://m.hsyuntai.com/medd/',
	exp: 'https://m.hsyuntai.com/mede/',
	prod: 'https://m.hsyuntai.com/med/',
	test: 'https://www.gzamon.wang/api' // 仅仅用于测试请求库
}

// 业务模块
export const bizModules = {
	file: '',
	user: ''
}

const config = {
	// 开发和打包时域名
	baseURL: {
		dev: domains['test'],
		prod: domains['prod']
	}
}

// 生成业务模块的全量地址
export const getBaseURL = biz => {
	const domain = process.env.NODE_ENV === 'development' ?
		config.baseURL['dev'] :
		config.baseURL['prod']
	return `${domain}${bizModules[biz]}`
}

export default config
