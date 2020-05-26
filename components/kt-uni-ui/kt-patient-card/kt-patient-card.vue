<template>
	<view class="patient-card-container" @tap="onTap">
		<view class="list-item" :class="{'re': cardType === 're'}">
			<view class="top kt-flex" :class="{'re': cardType === 're'}">
				<view class="left kt-flex">
					<slot name="top-img" v-if="cardType === 'in' && options.avatar"><image src="@/static/image/pat-avatar.png" mode=""></image></slot>
					<slot name="top-left-text">小明</slot>
				</view>
				<view></view>
				<view class="right kt-flex">
					<slot name="top-right-text"><view>进入</view></slot>
					<text v-if="options.topRightArrow" style="padding-left: 10rpx;" class="lg text-gray" :class="'cuIcon-right'"></text>
				</view>
			</view>
			<view class="context" :class="{'re': cardType === 're'}"><slot name="context">内容</slot></view>
			<view class="bottom kt-flex" v-if="options.bottom">
				<view class="left" :class="{ right: cardType === 're' }"><slot name="bottom-left">底部左边</slot></view>
				<view v-if="cardType === 'in'" class="right"><slot name="bottom-right">底部右边</slot></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'kt-patient-card',
	props: {
		cardType: {
			type: String,
			default: 'in' // [in 优化版 | re 普版]
		},
		options: {
			type: Object,
			default: () => {
				return {
					avatar: true,
					bottom: true,
					topRightArrow: true
				}
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		onTap() {
			this.$emit('kt-tap')
		}
	},
}
</script>

<style lang="scss" scoped>
.patient-card-container {
	.list-item {
		position: relative;
		margin-top: 10rpx;
		width: 100%;
		min-height: 280rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		
		&.re {
			min-height: 180rpx;
		}

		.top {
			padding: 30rpx 20rpx 20rpx;
			border-bottom: 10rpx dotted #f5f5f5;
			image {
				height: 60rpx;
				width: 60rpx;
				margin-right: 20rpx;
			}
			
			&.re {
				padding: 20rpx 20rpx 0rpx;
				border-bottom: none;
				.left {
					/deep/ uni-text,
					/deep/ uni-view,
					/deep/ span {
						font-size: 28rpx;
					}
				}
				.right {
					/deep/ uni-text,
					/deep/ uni-view,
					/deep/ span {
						font-size: 24rpx;
					}
				}
			}
			
			.left {
				/deep/ uni-text,
				/deep/ uni-view,
				/deep/ span {
					line-height: 60rpx;
					margin-right: 20rpx;
					font-size: 30rpx;
					font-weight: bold;
					color: #2b354a;
				}
			}
			.right {
				/deep/ uni-text,
				/deep/ uni-view,
				/deep/ span {
					font-size: 28rpx;
				}
			}
		}

		.context {
			height: auto;
			padding: 20rpx 20rpx 40rpx;
			color: #2b354a;
			
			&.re {
				padding: 0rpx 20rpx 0rpx;
				color: #333333;
			}
		}

		.bottom {
			padding: 0 20rpx 20rpx;
			position: relative;
			bottom: 0;

			.left {
				display: flex;
				align-items: center;
				/deep/ uni-image {
					height: 25rpx;
					width: 25rpx;
					margin-right: 20rpx;
				}
			}

			.right {
				font-size: 26rpx;
				color: #999999;
			}
		}
	}
}
</style>
