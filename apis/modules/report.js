import http from '@/utils/request/index.js'
import {bizModules} from '@/common/config/config.js'

const {ois} = bizModules

const testParams = {
	branchId: '100000',
	empId: '100000000003'
}

// 统计 统计数
export function getEmpMobileOisReqData(params) {
	return http.request({
		url: `${ois}/openApi/oisReg/getEmpMobileOisReqData`,
		params:{
			...testParams,
			...params
		}
	})
}

// 统计 折线图
export function getEmpMobileOisReqDataByDay(params) {
	return http.request({
		url: `${ois}/openApi/oisReg/getEmpMobileOisReqDataByDay`,
		params:{
			...testParams,
			...params
		}
	})
}
