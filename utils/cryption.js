import Crypto from 'crypto-js'
import qs from 'qs'
import config from '@/common/js/config.js'
import {
	saltKey,
	saltCode,
	IM
} from '@/utils/salt.js'
import utils from '@/common/js/utils.js'

/* #ifdef MP-WEIXIN */
import {
	Base64
} from 'js-base64'
const atob = Base64.decode
const btoa = Base64.encode
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
	if(http.custom.IM) {
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
