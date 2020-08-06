<template>
	<view class="kt-modal">
		<view class="cu-modal" :class="modalName">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content bold">{{ title }}</view>
					<view v-if="closeIcon" class="action" @tap="onClose"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-md"><slot></slot></view>
				<view class="cu-bar bg-white justify-end btn-container" v-if="btnGroup">
					<view class="btn left" @tap="onCancel">{{btnCancalText}}</view>
					<view class="btn right" @tap="onConfirm">{{btnConfirmText}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Modal 内容'
		},
		value: {
			type: Boolean,
			default: false
		},
		btnGroup: {
			type: Boolean,
			default: true
		},
		btnCancalText: {
			type: String,
			default: '取消'
		},
		btnConfirmText:{
			type: String,
			default: '确认'
		},
		closeIcon:{
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			modalName: ''
		}
	},
	watch: {
		value: {
			handler(v) {
				v ? this.showModal() : this.hideModal()
			},
			immediate: true
		}
	},
	methods: {
		showModal() {
			this.modalName = 'show'
			this.$emit('input', true)
		},
		hideModal() {
			this.modalName = null
			this.$emit('input', false)
		},
		onCancel(e) {
			this.hideModal()
			this.$emit('on-cancel')
		},
		onConfirm(e) {
			this.hideModal()
			this.$emit('on-confirm')
		},
		onClose(e) {
			this.hideModal()
			this.$emit('on-close')
		}
	}
}
</script>

<style lang="scss" scoped>
.padding-md {
	padding: 30rpx;
	background-color: #ffffff;
}

.content.bold {
	color: #333333;
	font-size: 36rpx;
	font-weight: bold;
}

.body {
	min-height: 100rpx;
}

.btn-container {
	justify-content: space-between;
	width: 100%;
	height: 92rpx;
	.btn {
		flex: 1;
		height: 100%;
		line-height: 92rpx;
		border-top: 1rpx solid #f5f5f5;
		&.left {
			border-right: 1rpx solid #f5f5f5;
		}
		&.right {
			color: #1c8be4;
		}
	}
}
</style>
