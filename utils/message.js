// 统一消息提示
const message = {
	success: (title) => {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title: title,
			image: '/static/message/success.png'
		});
	},
	error: (title) => {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title: title,
			image: '/static/message/error.png'
		});
	},
	warning: (title) => {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title: title,
			image: '/static/message/warning.png'
		});
	},
	loading: (title) => {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title: title,
			duration: 1500,
			mask: true,
			image: '/static/message/loading.png'
		});
	},
}

export default message