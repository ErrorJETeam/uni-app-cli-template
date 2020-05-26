<script>
import 'moment/locale/zh-cn'

export default {
	onLaunch: function() {
		console.log('App Launch')
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
</style>
