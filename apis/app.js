import request from '@/utils/request'

// 更新版本
export function updateApp(data) {
	return request({
		url: '/g/mobile/sys/getApkMeta',
		method: 'GET',
		data: data
	})
}
