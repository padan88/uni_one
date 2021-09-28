import request from '@/utils/request'

// 发送验证码
export function sendCode(data) {
	return request({
		url: 'send-code/',
		method: 'GET',
		data: data
	})
}

// 登陆
export function login(data) {
	return request({
		url: 'login/',
		method: 'GET',
		data: data
	})
}

// 退出登陆
export function logout() {
	return request({
		url: 'logout/',
		method: 'GET'
	})
}

// 获取用户信息
export function getInfo() {
	return request({
		url: 'user-info/',
		method: 'GET'
	})
}
