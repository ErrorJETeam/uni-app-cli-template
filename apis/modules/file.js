import http from '@/utils/request/index.js'
import {bizModules, xjModules, getBaseUrl} from '@/common/config/config.js'
import utils from '@/common/js/utils.js'
import store from '@/store/index.js'

const {file} = bizModules

// 文件上传：获取的是 文件 id
export function fileUpload_xj(File, path, name) {
	return http.upload(`${xjModules.file}/japi/v1/file/upload`,{
		filePath: path ? path : File.path,
		name: 'file',
		formData: {
			'filename': name ? name : File.name
		}
	})
}

// 文件下载
export function fileDownload_xj(url) {
	if(url.includes('http:')) {
		url = url.replace('http', 'https')
	}
	return http.download(url)
}

// 文件下载:传入文件 id
export function fileDownload_xj_id(id) {
	return http.download(`${xjModules.file}/japi/v1/file/download?fileId=${id}`)
}

// 文件上传（上海）: 入参为文件 | 本地临时路径+名字
// 返回 md5
export function fileUpload(File, path, name) {
	return http.upload(`${file}/file/upload`, {
		filePath: path ? path : File.path,
		name: 'file',
		formData: {
			'filename': name ? name : File.name
		},
		custom: {
			cryption: false
		}
	})
}

// 文件下载：拿到本地临时路径
export function fileDownload(md5) {
	return http.download(`${file}/file/${md5}`, {
		custom: {
			cryption: false
		}
	})
}
