<template>
	<view></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	onLoad() {
		uni.showModal({
			itle: '提示',
			content: '这是一个模态弹窗',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	},
	onShow() {
		uni.showToast({
			title:"标题1111",
			icon:'none',
			duration:20000,
			position:top
		}),
		uni.setStorage({
			key:"aaa",
			data:'hello1111',
			success() {
				console.log('保存成功')
			}
		})
	},
	onReady() {},
	onHide() {},
	onUnload() {},
	onResize() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onBackPress() {}
};
</script>

<style></style>
