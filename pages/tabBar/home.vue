<template>
	<view class="kt-container home">
		<view style="background-color: #FFFFFF;height: 200rpx;width: 100%;padding-top: 100rpx;"><h3>首页</h3></view>
		<view class="hr"></view>
		<!-- 路由 -->
		<button type="primary" @tap="onClick">列表(普通)页面</button>
		<button type="primary" @tap="goTab">我的(tabbar)页面</button>
		<!-- 图片 -->
		<view class="hr"></view>
		<block>
			<view>图片测试</view>
			<image style="width: 100rpx; height: 100rpx;" src="../../static/image/logo.png" mode=""></image>
		</block>
		<!-- iconfont 使用 -->
		<view class="hr"></view>
		<block>
			<view>
				测试图标：
				<text class="kt-icon kt-shouye"></text>
			</view>
			<view>
				kt-icon 图标组件使用：
				<kt-icon name="kt-shouye" custom-prefix="kt-icon" size="30" color="#888888"></kt-icon>
			</view>
		</block>
		<!-- 动画库 -->
		<view class="hr"></view>
		<block><view class="animated bounce">动画库演示</view></block>
		<!-- moment 测试 -->
		<view class="hr"></view>
		<view>全局方法（时间格式化）:{{ dateFormat(new Date(), 'yyyy-MM-dd') }}</view>
		<view>
			Moment 使用（-1周）:{{
				$moment(new Date())
					.subtract(1, 'w')
					.format('YYYY-MM-DD')
			}}
		</view>

		<!-- uView -->
		<view class="hr"></view>
		<block>
			<text>uView 引入使用</text>
			<u-button>默认按钮</u-button>
			<u-button type="primary">主要按钮</u-button>
			<u-button type="success">成功按钮</u-button>
			<u-button type="info">信息按钮</u-button>
			<u-button type="warning">警告按钮</u-button>
			<u-button type="error">危险按钮</u-button>
		</block>
	</view>
</template>

<script>
import { dateFormat } from '@/common/utils/time.js';
export default {
	data() {
		return {
			key: 'value'
		};
	},

	onLoad(opt) {
		// TODO
	},

	methods: {
		dateFormat(date, format) {
			return dateFormat(date, format);
		},
		onClick(e) {
			this.$Router.push({ path: '/pages/biz/show', query: { msg: '测试 query 传参' }, params: { msg: '测试 params 传参' } });
		},
		goTab() {
			this.$Router.pushTab({ name: 'myPage' });
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	padding: 0 30rpx;
}
.hr {
	margin: 15rpx 0;
	border: 0.5rpx solid #dddddd;
}
</style>
