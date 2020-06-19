import utils from '@/common/js/utils.js';

// 统计页面数据格式化
export function formatChartRing(data) {
	return {
		"series": [{
			"name": "接诊量",
			"data": data.validNum,
			format:()=>'接诊量 '+data.validNum
		}, {
			"name": "取消量",
			"data": data.cancalNum,
			format:()=>'取消量 '+data.cancalNum
		}]
	}
}

export function formatChartArea(data) {
	let categories = []
	let seriesData = []
	
	data.forEach((i) => {
		categories.push(utils.format(new Date(i.dateTime), 'MM-dd'))
		seriesData.push(i.allNum)
	})
	
	return {
		// 数据类别
		categories,
		// 数据列表
		series: [{
			name: '接诊：',
			data: seriesData,
			color: '#1C8BE4'
		}]
	}
}
