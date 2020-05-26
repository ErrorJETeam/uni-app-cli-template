import http from '@/utils/request/index.js'

/* 
	method: 默认 get 请求
	hideLoading：是否关闭加载 loading
	contentType: 默认 json（拿到的时候自动 JSON.parse）
 */

export function apiGetRelatedVideo(data) {
	// 默认 get 请求
	// hideLoading 配置是否开启 loading
	return http.request({
		url: '/related/allvideo',
		params: {
			id: 34654,
			pageNum: 1,
			pageSize: 1
		},
		hideLoading: false
	})
}
