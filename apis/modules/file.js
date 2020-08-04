import http from '@request/index.js'
import {bizModules, xjModules, getBaseURL} from '@/common/config/config.js'
import utils from '@utils'
import store from '@/store/index.js'
import { addSign } from '@/common/request/cryption.js'

const {file} = bizModules

// 文件上传（新疆）：获取的是 文件 id
export function fileUpload_xj(File, path, name) {
	return http.upload(`${xjModules.file}/japi/v1/file/upload`,{
		filePath: path ? path : File.path,
		name: 'file',
		formData: {
			'filename': name ? name : File.name
		}
	})
}

// 文件下载（新疆）
export function fileDownload_xj(url) {
	if(url.includes('http:')) {
		url = url.replace('http', 'https')
	}
	return http.download(url)
}

// 文件下载（新疆）:传入文件 id
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

// 文件加载：用于 src 自动解析路径
export function imgByMd5(md5) {
	return `${getBaseURL('file')}/file/${md5}?${utils['string'].obj2str(addSign())}`
}
