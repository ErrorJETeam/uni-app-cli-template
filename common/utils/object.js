// 对象转 a=b&c=d
export const obj2str = function(obj) {
	let str = ''
	let keys = Object.keys(obj)
	for (let i = 0; i < keys.length; i++) {
		if (i != keys.length - 1) {
			str += `${keys[i]}=${obj[keys[i]]}&`
		} else {
			str += `${keys[i]}=${obj[keys[i]]}`
		}
	}
	return str
}
