const files = require.context('./modules', false, /\.js$/);
const apis = {}
files.keys().forEach((key, index) => {
	const apiName = key.replace(/^\.\//, '').replace(/\.js$/, '');
	apis[apiName] = files(key)
})

const install = Vue => {
	Vue.prototype.$apis = apis // API 全局使用
}

export default {
	install
}