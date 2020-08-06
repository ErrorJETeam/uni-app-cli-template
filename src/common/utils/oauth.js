// 判断是否过期 accessToken | refreshToken | thdToken
// preMinutes 提前 n 分钟
// 过期返回 false
export const judgeExpired = (tokenType, preMinutes = 0) => {
	let tokens = getStorageSync('wx_tokens')
	if (!tokens) {
		return false
	}
	preMinutes = preMinutes * 60 * 1000 // 毫秒数
	const now = moment().valueOf()
	switch (tokenType) {
		case 'accessToken': // 过期找 refresh
			return now + preMinutes < tokens.accessTokenExpiresIn
		case 'refreshToken': // 过期找 thdToken
			return now + preMinutes < tokens.refreshTokenExpiresIn
		case 'thdToken': // 过期重新登录
			return now + preMinutes < tokens.thdTokenExpiresIn
	}
}
