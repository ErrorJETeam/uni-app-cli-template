import {
	saltKey,
	saltCode,
	key
} from '@/common/config/salt.js';

// 域名
const domains = {
	'sh_dev': '',
	'sh_prod': 'm',
	'kt_dev': '',
	'kt_prod': '',
	'xj_dev': '',
	'xj_prod': '',
	'mock': 'https://www.gzamon.wang/api' // 仅仅用于测试请求库
}

// 上海接口业务模块
export const bizModules = {
	file: '/file-center',
	user: '/member',
	system: '/system',
	ws: '/ws-manager',
	im: '/im',
	resource: '/',
	core: '/hospital-core', // 8080 对应转发 | ihis-core
	ois: '/hospital-ois', // 113 用 hospital-ois | 外网 ihis-ois
	test: '/ihis-ois', // 金唐测试 ihis-ois
	'ihis-core': '/ihis-core',
	'ihis-ois': '/ihis-ois'
}

// 新疆接口业务模块
export const xjModules = {
	interview: '/otsp-interview',
	weixin: '/otsp-weixin',
	account: '/otsp-account',
	user: '/otsp-user',
	file: '/otsp-file',
	sys: '/otsp-manage-sys',
	im: '/otsp-im',
	docmsg: '/otsp-medical-message'
}

const config = {
	// 开发和打包时域名
	baseURL: {
		dev: domains['xj_dev'],
		prod: domains['xj_prod']
	},

	key: { ...key
	},

	salt: {
		[saltKey[0]]: saltCode[0],
		[saltKey[1]]: saltCode[1],
		[saltKey[2]]: saltCode[2],
		[saltKey[3]]: saltCode[3]
	}
}

export const appId = 'wx13209f85f0348925' // 小程序

// 生成业务模块的全量地址
export const getBaseURL = biz => {
	const domain = process.env.NODE_ENV === 'development' ?
		config.baseURL['dev'] :
		config.baseURL['prod']
	return `${domain}${xjModules[biz]}`
}

export default config
