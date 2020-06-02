import {
	saltKey,
	saltCode,
	key
} from '@/utils/salt.js';

// 域名
const domains = {
	'sh_dev': 'http://10.1.50.113',
	'sh_prod': 'https://sk.cmsfg.com',
	'kt_dev': 'http://www.tomtawsoft.com:50380',
	'kt_prod': 'https://medcloud.kingtsoft.com',
	'xj_dev': 'https://www.jyhk.com',
	'xj_prod': 'https://jkfw.wsj.xjbt.gov.cn', //  https://jkfw.wsj.xjbt.gov.cn
	'mock': 'https://www.gzamon.wang/api'
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
	baseUrl: {
		dev: domains['xj_dev'],
		prod: domains['xj_prod']
	},

	key: { ...key},

	salt: {
		[saltKey[0]]: saltCode[0],
		[saltKey[1]]: saltCode[1],
		[saltKey[2]]: saltCode[2],
		[saltKey[3]]: saltCode[3]
	}
}

export const appId = 'wx13209f85f0348925' // 小程序

// 生成业务模块的全量地址
export const getBaseUrl = biz => {
	const domain = process.env.NODE_ENV === 'development' ?
		config.baseUrl['dev'] :
		config.baseUrl['prod']
	return `${domain}${xjModules[biz]}`
}

export default config
