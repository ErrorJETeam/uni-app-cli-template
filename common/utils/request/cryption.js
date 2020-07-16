import Crypto from 'crypto-js'
import qs from 'qs'
import config from '@/common/config/config.js'
import {
	saltKey,
	saltCode,
	IM
} from '@/common/config/salt.js'
import utils from '@/common/utils/util.js'

/* #ifdef MP-WEIXIN */
const UTF8 = Crypto.enc.Utf8
const btoa = (str) => Crypto.enc.Base64.stringify(UTF8.parse(str))
const atob = (bs64) => Crypto.enc.Base64.parse(bs64).toString(UTF8)
/* #endif */

// *******
export function addSign() {
	const queryParams = {
		...config.key,
		random: utils.randomWord(true, 5, 11),
		timestamp: (new Date()).valueOf()
	}

	const queryStr = qs.stringify(queryParams)
	queryParams.sign = Crypto.SHA1(queryStr).toString()
	const {
		appKey,
		...query
	} = queryParams

	return query
}

// *******
export function addAppToken(http) {
	let keys = saltCode
	if (http.custom.IM) {
		keys = IM
	}
	const timestamp = (new Date()).valueOf()
	const bs64 = btoa(` {"${saltKey[0]}":"${keys[0]}","timestamp":${timestamp}}`)
	const h256 = Crypto.HmacSHA256(`${keys[1]}.${timestamp}`, keys[2]).toString()
	http[`${atob('aGVhZGVy')}`][`${atob('YXBwVG9rZW4')}`] = `${bs64}.${h256}`
	return http
}

// *******
const options = {
	padding: Crypto.pad.Pkcs7,
	[`${atob('bW9kZQ')}`]: Crypto[`${atob('bW9kZQ')}`][`${atob('Q0JD')}`],
	[saltKey[3]]: Crypto.enc.Utf8.parse(saltCode[3])
}

function encryption(data, yek, options) {
	return Crypto.AES.encrypt(Crypto.enc.Utf8.parse(data), Crypto.enc.Utf8.parse(yek), options).toString() // options:{iv, mode, padding}
}

function decryption(bs64Str, yek, options) {
	let ret = Crypto.AES.decrypt(bs64Str.toString(), Crypto.enc.Utf8.parse(yek), options).toString(Crypto.enc.Utf8)
	return JSON.parse(ret)
}

// 环信 IM 登录
export function decryption_IM(bs64Str) {
	const yek = 'jyhk202012345678'
	const options = {
		...options,
		iv: Crypto.enc.Utf8.parse('KX9yeFmBueeFADK4')
	}
	return Crypto.AES.decrypt(bs64Str.toString(), Crypto.enc.Utf8.parse(yek), options).toString(Crypto.enc.Utf8)
}

function encrypt(oriData) {
	oriData = typeof oriData == 'string' ? oriData : JSON.stringify(oriData);
	return encryption(oriData, saltCode[2], options);
}
export function decrypt(res) {
	res.data = decryption(res.data, saltCode[2], options);
}

export function handleEncrypt(http) {
	http[`${atob('ZGF0YQ')}`] = encrypt(http[`${atob('ZGF0YQ')}`])

	http[`${atob('cGFyYW1z')}`] = {
		[`${atob('ZGF0YQ')}`]: encrypt(qs.stringify(http[`${atob('cGFyYW1z')}`]))
	}
}
