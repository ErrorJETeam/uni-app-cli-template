<template>
	<view class="dropdown">
		<view class="select-mask" v-show="isOpen" @tap="onMask"></view>
		<view class="select-down" v-show="isOpen">
			<view class="select-item" v-for="(item, idx) in dataList" :key="idx" @tap="onSelect" :data-id="idx">
				<view class="select-text">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'kt-dropdown',
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		dataList: {
			type: Array,
			default: () => ['近一个月']
		},
		top:{
			type: String,
			default: '190rpx'
		}
	},
	data() {
		return {
		}
	},
	methods: {
		onMask() {
			this.isOpen && this.$emit('update:isOpen', false)
		},
		onSelect(e) {
			const index = e.currentTarget.dataset.id
			const type = this.dataList[index]
			this.$emit('update:isOpen', !this.isOpen)
			this.$emit('on-item-selected', {type, index})
		}
	}
}
</script>

<style lang="scss">
.dropdown {
	position: relative;
	.select-mask {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		z-index: 2;
	}
	.select-down {
		position: absolute;
		padding: 0 30rpx;
		width: 100%;
		background-color: #fff;
		z-index: 3;
		.select-item {
			text-align: center;
			border-bottom: 2rpx solid #EEEEEE;
			.select-text {
				padding-left: 20rpx;
				height: 85rpx;
				line-height: 85rpx;
				font-size: 30rpx;
				color: #666666;
			}
		}
		.select-item:last-child {
			border-bottom: none;
		}
	}
}
</style>
