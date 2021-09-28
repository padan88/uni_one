<script>
import { updateApp } from 'apis/app.js';
import { testApi } from 'apis/test.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			console.log(widgetInfo);
			updateApp().then(res => {
				var data = res.result;
				console.log(data);
				if (data.versionCode && data.versionName) {
					if (data.downloadUrl) {
						var url = 'http://tic.cregcloud.com/tic_server' + data.downloadUrl
							console.log(url),
						uni.downloadFile({
							url: url,
							success: (downloadResult) => {
								console.log(downloadResult);
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										console.log('更新成功');
										plus.runtime.restart();
									}, function(e) {
										console.error('更新失败');
									});
								}
							}
						});
					}
				}
			}).catch(error => {
				console.log(error)
			})
		});
		// #endif
	},

	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';
/* colorui */
@import 'common/colorui/main.css';
@import 'common/colorui/icon.css';

.page {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
}
.nav-h {
	height: 100rpx;
	background-color: #293f76;
}
</style>
