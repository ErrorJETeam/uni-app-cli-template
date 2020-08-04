import moment from 'moment'

// 判断性别
export const filterSex = number => {
	const res = {
		1: '男',
		2: '女',
		3: '不详',
		4: '其他'
	} [number]

	return res || '未知'
}

// 计算年龄
export const filterAge = birthday => {
	const text = moment(birthday, 'YYYY-MM-DD').fromNow()
	let age = parseInt(text, 10)
	if (isNaN(age)) {
		age = '未知'
	}
	return age;
}

// 隐藏号码
export const filterPhone = phone => phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')

// 布尔转换
export const filterBoolean = boolean => boolean ? '是' : '否'