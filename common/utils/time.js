import moment from 'moment'

// 返回距离今天 n 天的日期
export function datePick(param, format = 'YYYY-MM-DD') {
	if (typeof param === 'number') param = String(param)
	switch (param) {
		case '1':
			return moment().format(format)
		case '7':
			return moment().subtract('days', 6).format(format)
		case '30':
			return moment().subtract('days', 29).format(format)
		case 'month':
			return moment().startOf('month').format(format)
		default:
			return moment().subtract('days', param-1).format(format)
	}
}

// 计算年龄: 传入生日
export const filterAge = birthday => {
	const text = moment(birthday, 'YYYY-MM-DD').fromNow()
	let age = parseInt(text, 10)
	if (isNaN(age)) {
		age = '未知'
	}
	return age;
}