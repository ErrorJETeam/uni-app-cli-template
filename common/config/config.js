// 域名 + node 中转网关
export const appId = '999'
const gateWay = `/gateway/${appId}/ytGateway`

const serverMode = 'online' // 接口环境

const domains = {
	online: {
		dev: 'https://m.hsyuntai.com/medd',
		exp: 'https://m.hsyuntai.com/mede',
		prod: 'https://m.hsyuntai.com/med'
	},
	local: {
		dev: 'http://localhost:12003/medd',
		exp: 'http://localhost:12002/mede',
		prod: 'http://localhost:12000/med'
	}
};

// api 基地址
export const baseURL = {
	dev: domains[serverMode]['dev'] + gateWay,
	prod: domains[serverMode]['prod'] + gateWay
}
export const basePrefix = process.env.NODE_ENV === 'development' ?
	domains[serverMode]['dev'] :
	domains[serverMode]['prod']
