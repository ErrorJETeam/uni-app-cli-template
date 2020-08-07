<script>
import 'moment/locale/zh-cn'

export default {
	onLaunch: function() {
		/* #ifdef MP-WEIXIN */
		const updateManager = uni.getUpdateManager()

		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate)
		})

		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})
		})

		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		})
		/* #endif */
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'common/css/uni.css';
@import 'common/css/common.scss';
/* colorUi */
@import 'vendor/colorui/main.css';
@import 'vendor/colorui/icon.css';
/* 动画库 */
@import 'common/css/animate.css';
/* uView 样式文件 */
@import "uview-ui/index.scss";
</style>
