// 全局公共方法, 包括过滤器
import * as filters from './filters' // filters

const utils = {}

// 模块化集成
const files = require.context('.', false, /\.js$/)

files.keys().forEach((key, idx) => {
	if (key === './index.js') return
	let fileExport = files(key) // 包括了 default
	const fileName = key.replace(/^\.\//, '').replace(/\.js$/, '');
	utils[fileName] = fileExport
})

const install = Vue => {
	// 注册过滤器
	Object.keys(filters).forEach(fn => Vue.filter(fn, filters[fn]))

	// 复制一份过滤器方法到 utils 中, 可以通过 $yt['filters'].fn() 调用
	utils['filters'] = filters

	// 挂载全局工具方法
	Vue.prototype.$yt = utils
}

export default {
	install
}
