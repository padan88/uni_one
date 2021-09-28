/**
 * author: DongYuZhou
 * date: 2020-2-15
 * Vuex中数据函数仓库
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { logout, getInfo, login } from '@/apis/token'

Vue.use(Vuex)
// 默认的state
const defaultState = {
	//用户token
	token: getToken(),
	userInfo: {},
}


const store = new Vuex.Store({
	state: defaultState,
	mutations: {
		//设置Skey
		SET_TOKEN(state, token) {
			state.token = token;
			setToken(token)
		},
		// 设置用户信息
		SET_USER_INFO(state, data) {
			state.userInfo = data
		},

	},
	actions: {
		// 用户登陆
		login({ commit }, dataForm) {
			return new Promise((resolve, reject) => {
				login(dataForm).then((res) => {
					const { token, user } = res.data
					commit('SET_TOKEN', token)
					commit('SET_USER_INFO', user)
					resolve(res.data)
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
		},
		// 获取用户数据
		getInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getInfo().then((res) => {
					const { data } = res
					commit('SET_USER_INFO', data)
					resolve(data)
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
		},
		logout({ commit }) {
			return new Promise(resolve => {
				logout().then((res) => {
					commit('SET_TOKEN', '')
					commit('SET_USER_INFO', {})
					removeToken()
				}).catch(err => {
					commit('SET_TOKEN', '')
					commit('SET_USER_INFO', {})
					removeToken()
				})
			})
		},
		clearState({ commit }) {
			commit('SET_TOKEN', '')
			commit('SET_USER_INFO', {})
			removeToken()
		},
		setUserInfo({ commit }, data) {
			commit('SET_USER_INFO', data)
		}
	}
})

export default store
