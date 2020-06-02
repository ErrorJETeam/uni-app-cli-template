const files = require.context('./modules', false, /\.js$/);
const apis = {}
files.keys().forEach((key, index) => {
	const apiName = key.replace(/^\.\//, '').replace(/\.js$/, '');
	apis[apiName] = files(key)
})

export default apis