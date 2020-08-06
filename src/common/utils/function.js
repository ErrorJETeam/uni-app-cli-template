// 输入防抖
// 防抖:输入
export const debounce = (func, wait = 500, immediate = false) => {
	let timeout
	return function() {
		const context = this
		const args = arguments

		const callNow = immediate & !timeout

		timeout && clearTimeout(timeout)
		timeout = setTimeout(function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}, wait)

		if (callNow) func.apply(context, args)
	}
}

// 节流:点击
/**
 * 节流原理：在一定时间内，只能触发一次
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function throttle(func, wait = 500, immediate = true) {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}

	}
};
