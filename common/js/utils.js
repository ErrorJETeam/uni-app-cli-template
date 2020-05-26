// 全局公共方法
export default {
	// 格式化时间戳
	/**
	 * 格式化时间
	 * @param {value | 时间戳} 
	 * @example formatTime(new Date().getTime())
	 */
	formatTime: (value) => {
		var value = String(value);

		function t(v) {
			return v = v < 10 ? ("0" + v) : v;
		}
		String.prototype.ToString = function(value) {
			var date = new Date(parseInt(this.substring(6, this.length - 2)));
			value = value.replace("yyyy", date.getFullYear());
			value = value.replace("yy", t(date.getFullYear().toString().substr(2)));
			value = value.replace("MM", t(date.getMonth() + 1));
			value = value.replace("dd", t(date.getDate()));
			value = value.replace("hh", t(date.getHours()));
			value = value.replace("mm", t(date.getMinutes()));
			value = value.replace("ss", t(date.getSeconds()));
			value = value.replace("ms", date.getMilliseconds())
			return value;
		};
		return value.ToString("yyyy-MM-dd  hh:mm:ss");
	},

	// 时间格式化 Date.format('MM-dd')
	format: function(date, fmt) {
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
				k]).substr(("" + o[k]).length)));
		return fmt;
	},

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

	obj2str:function(obj) {
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
