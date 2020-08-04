// 判断是否为 promise
export const _isPromise = (obj) => {
	return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

// 判断数据类型
export const judgeType = data => {
	const toString = Object.prototype.toString;
	const dataType =
		toString
		.call(data)
		.replace(/\[object\s(.+)\]/, "$1")
		.toLowerCase()
	return dataType
}