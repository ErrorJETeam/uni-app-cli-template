// HTML 元素转换为 string
// https://liyucang-git.github.io/2017/11/04/JS%E5%AE%9E%E7%8E%B0HTML%E5%AE%9E%E4%BD%93%E4%B8%8E%E5%AD%97%E7%AC%A6%E7%9A%84%E7%9B%B8%E4%BA%92%E8%BD%AC%E6%8D%A2/
export function html2Text(htmlStr) {
	const div = document.createElement('div')
	div.innerHTML = htmlStr
	return div.textContent || div.innerText
}

// 判断是否存在该样式类
export function hasClass(ele, cls) {
	return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

// 增加样式类
export function addClass(ele, cls) {
	if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

// 删除样式类
export function removeClass(ele, cls) {
	if (hasClass(ele, cls)) {
		const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
		ele.className = ele.className.replace(reg, ' ')
	}
}

// 切换 class 属性
// 传入元素+目标样式类名
export function toggleClass(element, className) {
	if (!element || !className) {
		return
	}
	let classString = element.className
	const nameIndex = classString.indexOf(className)
	if (nameIndex === -1) {
		classString += '' + className
	} else {
		classString =
			classString.substr(0, nameIndex) +
			classString.substr(nameIndex + className.length)
	}
	element.className = classString
}
