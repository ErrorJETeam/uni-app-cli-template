<template>
	<view>
		tab 测试页 —— 我的页面
		<view class="">vuex 模块化获取 state 变量：{{ userName }}</view>
		<view class="">vuex getters获取 state 变量：{{ userName2 }}</view>
		<view class="">接口测试，得到测试数据 {{ dataLen }} 条</view>
	</view>
</template>

<script>
import { mockLongList } from '@/apis/mockData.js'
import { apiGetRelatedVideo } from '@/apis/modules/core.js'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: userActions, mapMutations, mapState } = createNamespacedHelpers('user')
import * as types from '@/store/action-types'

export default {
	computed: {
		...mapState({
			userName: state => state.userName
		}),
		userName2() {
			return this.$store.getters.userName
		}
	},
	data() {
		return {
			dataLen: null
		}
	},
	async onLoad() {
		const res1 = mockLongList || (await apiGetRelatedVideo())
		this.dataLen = res1.length
		console.log('请求接口1', res1)

		// 全局 $api使用
		const res2 = mockLongList || (await this.$api.test.apiGetRelatedVideo())
		console.log('请求接口2', res2)
	},
	async created() {
		// vuex - actions 方法调用
		console.log('store', this.$store.getters)
		console.log('vuex ceshi ', await this[types.SET_LOGIN]())
	},
	methods: {
		...userActions([types.SET_LOGIN]),
		...mapMutations('SET_LEAVE_TOME')
	}
}
</script>

<style lang="scss"></style>
