import http from '@request/index.js'

export function apiRequestTest(data) {
	// 默认 get 请求
	// hideLoading 配置是否开启 loading
	return http.request({
		url: 'https://www.gzamon.wang/api/related/allvideo',
		params: {
			id: 34654,
			pageNum: 1,
			pageSize: 1
		},
    custom:{
      apiName: false,
      withFullResponse: true
    }
	})
}
