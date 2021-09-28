/**
 * author: zsl
 * date: 2020-9-15
 * 封装网络请求的方法
 */
import Vue from 'vue'
import message from '@/utils/message'
import store from '@/store/index'
import excType from 'utils/excType.js'

class Service {
	static config = {
		baseURL: 'http://tic.cregcloud.com/tic_server',
		header: {
			"content-type": 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		hasToken: true
	}
	interceptors = {
		request: (func) => {
			if (func) {
				Service.requestBefore = func
			} else {
				Service.requestBefore = (request) => request
			}
		},
		response: (func) => {
			if (func) {
				Service.responseBefore = func
			} else {
				Service.responseBefore = (response) => response
			}
		}
	}

	static requestBefore = function(config) {
		return config
	}

	static responseBefore = function(response) {
		return response
	}
	static isCompleteURL = function(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	request = function(options = {}) {
		// 基础URL
		options.baseURL = options.baseURL || Service.config.baseURL
		// 数据类型
		options.dataType = options.dataType || Service.config.dataType
		// URL
		options.url = Service.isCompleteURL(options.url) ? options.url : (options.baseURL + options.url)
		// 请求参数
		options.data = options.data
		// 请求头
		options.header = {
			...options.header,
			...Service.config.header
		}
		// 请求方法
		options.method = options.method || Service.config.method
		// 是否携带token
		options.hasToken = options.hasToken || Service.config.hasToken

		options = {
			...options,
			...Service.requestBefore(options)
		}
		return new Promise((resolve, reject) => {
			options.success = function(res) {
				resolve(Service.responseBefore(res))
			}
			options.fail = function(err) {
				resolve(Service.responseBefore(err))
			}
			uni.request(options)
		})
	}
}

const service = new Service()

// 请求拦截器
service.interceptors.request((request) => {
	if (store.state.token && request.hasToken) {
		request.header['token'] = store.state.token
	}
	return request
})

// 响应拦截器
service.interceptors.response((response) => {
	// if (!response.data) {
	// 	return Promise.reject(response)
	// }
	if (response) { //判断服务器是否有响应;
		if (response.statusCode === 200) {
			const data = response.data;
			if (data && data.code == excType.SUC) { //请求成功;
				return data;
			} else { //请求失败;
				const err = new Error();
				err.response = response;
				err.request = response.request;
				if (!data) {
					err.code = excType.no_data; //无数据返回；
				} else if (!data.code) {
					err.code = excType.no_code; //无状态返回;
				} else {
					err.code = data.code;
					err.message = data.msg;
					err.msg = data.msg;
				}
				switch (err.code) {
					case excType.SUC: { //请求成功；
						return response.data
						break;
					}
					case excType.no_data: { //未收到返回数据
						console.error(response.data.msg)
						break;
					}
					case excType.no_code: { //返回格式错误
						//console.error(err.request.responseURL);
						console.error(response.data.msg)
						break;
					}
					case excType.AUC: { //认证过期，需重新登录；
						Vue.prototype.$toPage(1)
						break;
					}
					case excType.AUZ: { //权限不足;
						console.error(response.data.msg);
						break;
					}
					case excType.BIZ: { //业务逻辑错误
						console.log(response.data.msg);
						break;
					}
					case excType.DEV: { //提供给开发人员的错误信息
						console.error(response.data.msg);
						console.log(response.data.msg);
						break;
					}
					case excType.SYS: { //提供给开发人员的错误信息
						console.error(response.data.msg);
						console.log(excMsg.SYS);
						break;
					}
					default: {
						break;
					}
				}
				message.error(response.data.msg || 'Error')
				return Promise.reject(response.data)
			}
		} else {
			const status = response.statusCode;
			switch (status) {
				case 404: {
					console.log("服务器报404");
					// Vue.prototype.$toPage(2)  // 跳转404页面
					break;
				}
				case 500: {
					console.log("服务器报404");
					break;
				}
				case 401: {
					console.log("服务器报401");
					break;
				}
			}
		}
	} else {
		console.log("无法与服务器建立连接");
	}
	message.error(response.data.error || 'Error')
	return Promise.reject(response.data)
})

export default service.request
