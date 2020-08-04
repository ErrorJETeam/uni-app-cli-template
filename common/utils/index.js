// 全局公共方法
const utils = {}

// 模块化集成
const files = require.context('.', false, /\.js$/)

files.keys().forEach((key, idx) => {
	if (key === './index.js') return
	let fileExport = files(key) // 包括了 default
	const fileName = key.replace(/^\.\//, '').replace(/\.js$/, '');
	utils[fileName] = fileExport
})

export default utils
