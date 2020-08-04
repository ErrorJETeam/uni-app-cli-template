// 数组去重
export function uniqueArray(arr) {
	return Array.from(new Set(arr))
}

// 清洗数组，去掉空项
export function cleanArray(actual) {
	const newArray = []
	for (let i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i])
		}
	}
	return newArray
}

// json格式传参 => url params（需要用到上面的 cleanArray）
// 如 {"UserID":11, "Name":"Truly", "Email":"zhuleipro◎hotmail.com"}
// 最后会转为字符串用 & 连接
export function param(json) {
	if (!json) return ''
	return cleanArray(
		Object.keys(json).map(key => {
			if (json[key] === undefined) return ''
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
		})
	).join('&')
}
