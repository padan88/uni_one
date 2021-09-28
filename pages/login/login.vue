<template>
	<view>
		<image class="set-bg" src="../../static/icon_login_bg.png" />
		<view class="text-right padding-sm text-xxl"><text class="cuIcon-close text-gray" @click="goBack" /></view>
		<view class="head_img flex padding justify-center">
			<view class="padding-sm margin-xs radius text-center">
				<image class="login_logo" src="../../static/logo.png"></image>
				<view class="margin-tb-sm text-center  text-xxl" style="color: #ffffff;"><text>智慧施工数据管理平台</text></view>
			</view>
		</view>

		<view class="uni-common-mt padding">
			<form>
				<view class="cu-form-group round">
					<text class="cuIcon-mobile margin-xs text-gray"></text>
					<input v-model="dataForm.phone" type="number" maxlength="11" placeholder="手机号码" @input="inputPhone" />
				</view>

				<view class="cu-form-group round margin-tb-sm">
					<text class="cuIcon-mail margin-xs text-gray"></text>
					<input v-model="dataForm.code" type="number" maxlength="6" placeholder="短信验证码" @input="inputCode" />
					<button class="cu-btn shadow round text-xs" :class="{ 'bg-grey': !sendCodeBut, 'bg-blue': sendCodeBut }" :disabled="!sendCodeBut" type="" @tap="verifyFasong">
						{{ sendCode_title }}
					</button>
				</view>
				<view class="padding-sm"><view class="text-red">未注册的手机号验证后自动登陆</view></view>
				<view class="padding-dr flex flex-direction">
					<button class="cu-btn round margin-tb-sm lg " :class="{ 'bg-grey': !loginBut, 'bg-blue': loginBut }" :disabled="!loginBut"  @click="login">手机登陆</button>
				</view>
			</form>
		</view>
		<!-- 底部小字 -->
		<view class="text-center text-white text-sm" style="position: fixed;bottom: 30rpx;width: 100%;">
			<text>注册/登陆即代表同意协议</text>
			<text class="text-red" @click="toServer">服务条款</text>
			<text>和</text>
			<text class="text-red" @click="toServer1">隐私协议</text>
		</view>
		<!-- 滑动验证组件 -->
		<tfgg-verify @result="verifyResult" ref="verifyElement"></tfgg-verify>
	</view>
</template>

<script>
var _self, timer1;
import tfggVerify from '@/components/tfgg-verify/tfgg-verify.vue';
import { sendCode, login } from '@/apis/token';
export default {
	data() {
		return {
			statusBarHeight: '20px',
			background: { backgroundColor: '#293F76' },
			// 数据表单
			dataForm: {
				phone: '',
				code: ''
			},
			// 按钮文章
			sendCode_title: '获取验证码',
			// 发送验证码按钮状态
			sendCodeBut: false,
			// 登陆按钮状态
			loginBut: true,
			// 剩余秒数
			timer: 60
		};
	},
	onLoad() {
		_self = this;
	},
	methods: {
		inputPhone() {
			if (_self.dataForm.phone.length === 11) {
				this.sendCodeBut = true;
				if (_self.dataForm.code.length === 6) {
					this.loginBut = true;
				}
			} else {
				this.sendCodeBut = false;
				this.loginBut = false;
			}
		},
		inputCode() {
			if (_self.dataForm.code.length === 6 && _self.dataForm.phone.length === 11) {
				this.loginBut = true;
			} else {
				this.loginBut = false;
			}
		},
		/* 校验结果回调函数 */
		verifyResult(res) {
			if (res) {
				//定时器
				_self.sendCodeBut = false;
				timer1 = setInterval(() => {
					_self.timer--;
					_self.sendCode_title = '等待' + _self.timer + '秒';
					if (_self.timer == 0) {
						clearInterval(timer1);
						_self.timer = 60;
						_self.sendCodeBut = true;
						_self.sendCode_title = '获取验证码';
						return;
					}
				}, 1000);
				_self.sendCode();
				_self.$refs.verifyElement.reset(); //校验成功重置插件
			} else {
				_self.$message.error('验证失败');
			}
		},
		// 发送验证码按钮
		verifyFasong() {
			if (_self.sendCodeBut) {
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_self.dataForm.phone)) {
					_self.$message.warning('手机号不合法');
					return;
				}
				_self.$refs.verifyElement.show();
			}
		},
		// 发送验证码
		sendCode() {
			sendCode({ phone: _self.dataForm.phone })
				.then(res => {
					this.$message.success('发送成功');
				})
				.catch(err => {
					this.$message.error('发送失败');
					_self.sendCodeBut = true;
					clearInterval(timer1);
				});
		},
		// 手机号验证码登陆
		login() {
			//表单验证
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_self.dataForm.phone)) {
				_self.$message.warning('手机号不合法');
				return;
			}
			if (!/^[0-9]{6,6}$/.test(_self.dataForm.code)) {
				_self.$message.warning('验证码不合法');
			}
			_self.loginBut = false;
			_self.toIndex();
			// _self.$store
			// 	.dispatch('login', _self.dataForm)
			// 	.then(res => {
			// 		_self.$Router.back();
			// 	})
			// 	.catch(err => { 
			// 		console.log(err);
			// 		_self.loginBut = true;
			// 	});
		},
		toIndex(){
			console.log("===================")
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		goBack(){
			uni.showModal({
				title:'提示',
				content:'是否关闭系统！',
				success(res) {
					if(res.confirm){
						console.log('用户点击确定')
					}else if(res.cancel){
						console.log('用户点击取消')
					}
				}
			})
		},
		toServer() {
			uni.navigateTo({ url: '/pages/html/service' });
		},
		toServer1() {
			uni.navigateTo({ url: '/pages/html/privacy' });
		}
	},
	onUnload() {
		clearInterval(timer1);
	}
};
</script>

<style>
.login_logo {
	height: 120rpx;
	width: 120rpx;
}
.set-bg {
	position: absolute;
	z-index: -1;
	left: 0;
	right: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
}
</style>
