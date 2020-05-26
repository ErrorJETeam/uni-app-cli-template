import {
	saltKey,
	saltCode,
	key
} from '@/utils/salt.js';

// 域名
const domains = {
	'sh_dev': 'http://10.1.50.113',
	'sh_prod': 'https:sk.cmsfg.com',
	'kt_dev': 'http://www.tomtawsoft.com:50380',
	'kt_prod': 'https://medcloud.kingtsoft.com',
	'mock': 'https://www.gzamon.wang/api'
}

// 业务模块
export const bizModules = {
	file: '/file-center',
	user: '/member',
	system: '/system',
	ws: '/ws-manager',
	im: '/im',
	resource: '/',
	core: '/hospital-core', // 8080 对应转发
	ois: '/hospital-ois', // 113 用 hospital-ois
	test: '/ihis-ois' // 金唐测试 ihis-ois
}

const config = {
	// 域名
	baseUrl: {
		dev: domains['sh_dev'],
		prod: domains['sh_dev']
	},

	key: { ...key},

	salt: {
		[saltKey[0]]: saltCode[0],
		[saltKey[1]]: saltCode[1],
		[saltKey[2]]: saltCode[2],
		[saltKey[3]]: saltCode[3]
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
