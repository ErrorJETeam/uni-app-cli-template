import moment from 'moment'

// 返回某天日期
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
