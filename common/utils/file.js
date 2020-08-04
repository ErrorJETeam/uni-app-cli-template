// 图片格式校验
export const _validImgType = (tempFiles) => {
	const reg = /\w(\.jpeg|\.png|\.jpg|\.bmp)/i
	return tempFiles.every(img => reg.test(img.name))
}
