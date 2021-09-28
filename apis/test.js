import request from '../utils/request.js'

export function testApi(data) {
	return request({
		url: '/g/mobile/sys/getApkMeta',
		method: 'GET',
		data: data
	})
}