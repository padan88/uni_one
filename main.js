import Vue from 'vue'
import App from './App'

import message from 'utils/message'
import prePage from 'utils/prePage'
// 导入Vuex仓库
import store from './store'
// VueX
Vue.prototype.$store = store

import HttpCache from 'utils/cache.js'
//数据缓存封装
Vue.prototype.$SysCache = HttpCache

Vue.config.productionTip = false

App.mpType = 'app'


// 获取请一个页面的实例
Vue.prototype.$prePage = prePage
// 统一消息提示
Vue.prototype.$message = message

const app = new Vue({
	...App
})

app.$mount(); //为了兼容小程序及app端必须这样写才有效果

// 跳转登陆页面
const toPage = (type) => {
	if(type === 1){
		uni.reLaunch({
			url: '/pages/login/login',
		})
	}else if(type === 2){
		uni.reLaunch({
			url: '/pages/404/404',
		})
	}
	
}
Vue.prototype.$toPage = toPage
