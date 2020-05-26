<template>
	<view>
		<text>home 测试首页页面</text>
		<!-- 路由 -->
		<button type="default" @tap="onClick">路由跳转测试</button>
		<!-- 图片 -->
		<block>
			<text>图片测试</text>
			<image style="width: 60rpx; height: 60rpx;" src="../../static/image/logo.png" mode=""></image>
		</block>
		<!-- iconfont 使用 -->
		<block>
			<view>
				测试图标：
				<i class="kt-icon kt-shouye"></i>
			</view>
			<view>
				kt-icon 图标组件使用：
				<kt-icon name="kt-shouye" custom-prefix="kt-icon" size="30" color="#888888"></kt-icon>
			</view>
		</block>
		<!-- 动画库 -->
		<block><view class="animated bounce">动画库演示</view></block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			key: 'value'
		}
	},
	onLoad() {
		console.log('测试公共方法（时间格式化） >>>', this.$utils.formatTime(new Date().getTime()));
	},
	methods: {
		onClick(e) {
			this.$Router.push({ path: '/pages/home/list', query: { msg: '测试 query 传参' }, params: { msg: '测试 params 传参' } });
		}
	}
};
</script>

<style lang="scss">
</style>
