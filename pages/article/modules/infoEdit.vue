<template>
	<view class="info-edit">
		<view class="title bg">
			<view class="line"></view>
			<text class="text">个人信息</text>
		</view>

		<view class="body">
			<view class="body-a">
				<view class="font28 mg-b25">擅长</view>
				<textarea v-model="value1" class="txtarea mg-b25" value="" placeholder="请输入您的擅长" />
			</view>
			<view class="body-b">
				<view class="font28 mg-b25">简介</view>
				<textarea v-model="value2" class="txtarea" value="" placeholder="请输入您的简介" />
			</view>
		</view>

		<button class="btn" type="primary" @tap="doSave">保存</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value1: '',
			value2: ''
		}
	},
	methods: {
		doSave() {
			this.$Router.push({name:'doctorMain'})
		}
	},
}
</script>

<style lang="scss">
.txtarea {
	width:690rpx;
	height:300rpx;
	background:rgba(245,245,245,1);
	border-radius:4rpx;
	padding: 20rpx;
}
.font28 {
	font-size: 28rpx;
	font-weight: bold;
	color: #2B354A;
}
.mg-b25 {
	margin-bottom: 25rpx;
}
.body {
	height: 1024rpx;
	width: 100%;
	background-color: #FFFFFF;
	padding: 25rpx 30rpx 0;
}
.btn {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 98rpx;
	line-height: 98rpx;
	border-radius: 0;
	color: #FFFFFF;
	font-size: 30rpx;
}
.title {
	display: flex;
	align-items: center;
	height: 88rpx;
	width: 100%;
	background-color: #e8f3fc;
	margin-bottom: 10rpx;
	.line {
		width: 7rpx;
		height: 34rpx;
		background-color: #4880ff;
		border-radius: 4rpx;
		display: inline-block;
		margin-left: 40rpx;
		margin-right: 20rpx;
	}
	.text {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
	}
}
.info-edit {
	position: relative;
}
</style>
