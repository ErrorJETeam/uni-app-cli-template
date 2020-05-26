<template>
	<view class="search-container">
		<view class="cu-bar search bg-white">
			<view class="search-form round" :style="{'margin': margin}">
				<text class="cuIcon-search search-icon"></text>
				<input v-model="key" :adjust-position="false" type="text" :placeholder="placeholder" :confirm-type="searchText" @confirm="onSearch" />
			</view>
			<view v-if="showText" class="search-text" @tap="onSearch">{{searchText}}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'kt-search',
	props: {
		searchText: {
			type: String,
			default: '搜索'
		},
		showText: {
			type: Boolean,
			default: true
		},
		placeholder: {
			type: String,
			default: '请输入搜索关键词'
		},
		value: {
			type: String,
			default: ''
		},
		margin: {
			type: String,
			default: '0 30rpx'
		}
	},
	data() {
		return {
			key: ''
		}
	},
	watch: {
		key(newValue, oldValue) {
			this.$emit('input', newValue)
		}
	},
	methods: {
		onInput(e) {
			console.log('正在输入', e);
		},
		onSearch() {
			this.$emit('on-search', this.key)
		},
		clean() {
			this.key = ''
		}
	},
}
</script>

<style lang="scss" scoped>
.search-container {
	.search-text {
		color: #666666;
		font-size: 30rpx;
		padding-right: 24rpx;
	}
	
	.search-icon {
		font-size: 30rpx;
	}
}
</style>
