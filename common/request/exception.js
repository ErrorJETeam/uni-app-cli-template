const statusMsg = {
	'-1': '网络中断、超时或其他异常。',
	10001: '登录失效，请重新登录',
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的资源记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。'
}

export function showError(error_code, serverError) {
	let tip
	if (!error_code) {
		tip = statusMsg['-1']
	} else {
		if (statusMsg[error_code] === undefined) {
			tip = serverError.msg || serverError.message
		} else {
			tip = statusMsg[error_code]
		}
	}
	uni.showToast({
		icon: 'none',
		mask: true,
		title: tip,
		duration: 3000
	});
}
