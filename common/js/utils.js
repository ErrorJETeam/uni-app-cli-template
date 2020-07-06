import moment from 'moment'

// 全局公共方法
export default {
	// 判断是否为 promise
	_isPromise: (obj) => {
		return obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
	},

	// 生成随机数
	/**
	 * @param randomFlag ( 指定位数 false | 范围位数 true )
	 */
	randomWord: (randomFlag, min, max) => {
		let str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];

		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			var pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	},

	obj2str: function(obj) {
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
}

// 图片格式校验
export const _validImgType = (tempFiles) => {
	const reg = /\w(\.jpeg|\.png|\.jpg|\.bmp)/i
	return tempFiles.every(img => reg.test(img.name))
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

// 同步设置缓存
export const setStorageSync = (k, v) => uni.setStorageSync(k, judgeType(v) === 'object' ? JSON.stringify(v) : v)
// 同步获取缓存
export const getStorageSync = (k) => {
	let storage = uni.getStorageSync(k)
	if (!storage) return undefined

	const type = judgeType(JSON.parse(storage))
	if (type === 'object') {
		return JSON.parse(storage)
	} else {
		return storage
	}
}

