import http from '@request/index.js'
import {
	bizModules
} from '@/common/config/config.js'

const core = process.env.NODE_ENV === 'development' ? bizModules['ihis-core'] : bizModules['core']

// 获取医生收藏量
export function getFavoriteInfo(userId) {
	return http.request({
		url: `${core}/doctor/article/getFavoriteInfo`,
		params: {
			userId
		}
	})
}

// 获取文章列表
export function getArticle(data) {
	return http.request({
		method: 'POST',
		url: `${core}/doctor/article/getArticle`,
		data
	})
}

// 获取单篇文章
export function getArticleInfo(id) {
	return http.request({
		url: `${core}/doctor/article/getArticleInfo`,
		params: {
			id
		}
	})
}

// 获取草稿列表
export function getArticleDraft(data) {
	return http.request({
		method: 'POST',
		url: `${core}/doctor/article/getArticleDraft`,
		data
	})
}

// 获取单篇草稿
export function getArticleDraftInfo(id) {
	return http.request({
		url: `${core}/doctor/article/getArticleDraftInfo`,
		params: {
			id
		}
	})
}

// 新增文章
export function publishArticle(data) {
	return http.request({
		url: `${core}/doctor/article/publishArticle`,
		method: 'POST',
		data
	})
}

// 增/改草稿
export function addOrModifyDraft(data) {
	return http.request({
		url: `${core}/doctor/article/addOrModifyDraft`,
		method: 'POST',
		data
	})
}

// 删除文章
export function delArticle(id) {
	return http.request({
		url: `${core}/doctor/article/delArticle`,
		params: {
			id
		}
	})
}

// 删除草稿
export function delDraft(id) {
	return http.request({
		url: `${core}/doctor/article/delDraft`,
		params: {
			id
		}
	})
}
