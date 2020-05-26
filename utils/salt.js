/* #ifdef MP-WEIXIN */
import {Base64} from 'js-base64'
const atob = Base64.decode
/* #endif */

const saltKey = [
	`${atob('YXBwSWQ')}`,
	`${atob('c2VjcmV0')}`,
	`${atob('a2V5')}`,
	`${atob('aXY')}`
]

export const IM = [
	`${atob('b3RzcC1taW5pLWg1')}`,
	`${atob('ODZlMmhrMmJhcTF3MGowZWxkMW85eDNncnR2eHZmeWE')}`,
	`${atob('YXFkcTNvdHE0M2g3bmhkOA')}`,
	`${atob('YWlkcTdvdHE2M2g3bmhkOA')}`
]

let saltCode = {
	// TODO 目前没有做微信登录鉴权
	wx: [
		`${atob('c2hvdHNwLXdlaXhpbi13ZWI')}`,
		`${atob('dWdpcHRkaDdxcXA4dnR0Y2p2M2EwaWlsNG5vdHh5aWU')}`,
		`${atob('eTVkcGFyejhqZ2pzczEzcQ')}`,
		`${atob('Z2t1Z2pnNndvamd1Z3Fmdg')}`
	],

	ew: [
		`${atob('a3RvdHNwLWV3LXBsYXRmb3Jt')}`,
		`${atob('aDR6Ym5pb2p2eXBlaXd3YTBobXpmb2hud2hqY25ybDY')}`,
		`${atob('Z3VkNXZ1dTN2eXFwbTF3cQ')}`,
		`${atob('amNtbWZxYXhzeWw3eGxlNg')}`
	],
	
	ali: [
		`${atob('c2hvdHNwLWFsaXBheS13ZWI')}`,
		`${atob('eGdzNHdxajhoaXRkbWp0cHBtaWNuN3JxYXBxenJuaXc')}`,
		`${atob('cHM2bmZsbXd3d2R5a3NweA')}`,
		`${atob('cWNkaXpyZnZheWY5aHlrdg')}`
	],
	
	// 小程序
	miniprogram: [
		`${atob('b3RzcC1taW5pLXhqLXdlYiA')}`,
		`${atob('MzZlMmhrMmJhcTF3MGowZWxkMW85eDNncnR2eHZmeWE')}`,
		`${atob('YWlkcTNvdHE0M2g3bmhkYQ')}`,
		`${atob('YWlkcTNvdHE0M2g3bmg2OA')}`
	]
}

let key = {
	[`${atob('YXBwSWQ')}`]: `${atob('ZXdfaGlz')}`,
	[`${atob('YXBwS2V5')}`]: `${atob('ZXdfaGlzXzY2MTY')}`
};

// 微信或其他浏览器判断
const evJudge = function() {
	/* #ifdef H5 */
	let browser = navigator.userAgent.toLowerCase()
	if (browser.match(/MicroMessenger/i) == "micromessenger") {
		saltCode = saltCode.wx
	} else {
		saltCode = saltCode.ali
	}
	/* #endif */
	
	/* #ifdef MP-WEIXIN */
	saltCode = saltCode.miniprogram
	/* #endif */
}

evJudge()

export {
	saltCode,
	saltKey,
	key
}

