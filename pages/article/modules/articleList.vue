<template>
	<view class="kt-container">
		<view class="top kt-flex">
			<view class="left font28">
				<text class="left-text">共{{ ` ${articles && articles.length} ` }}篇</text>
			</view>
			<view class="right" v-if="type===types[0]" @tap="goArticle">
				<image class="right-img" src="img/article-edit.png"></image>
				<text class="right-text font28">写文章</text>
			</view>
		</view>

		<view class="list">
			<mescroll-uni top="98rpx" ref="mescroll" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<mescroll-empty v-if="!articles.length" />
				<view class="items">
					<article-item v-for="atc in articles" :key="atc.id" :show-data="atc"></article-item>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions:userDocActions } = createNamespacedHelpers('userDoc')
const { mapActions:articleActions } = createNamespacedHelpers('article')
import articleItem from '../components/article-item.vue'
export default {
	components: {
		articleItem
	},
	computed: {
		// 分页请求参数
		atcData() {
			return {
				page: {
					pageIndex:this.upOption.page.num, 
					pageSize:this.upOption.page.size
				},
				userId: this.userId
			}
		}
	},
	data() {
		return {
			articles: [],
			types:['article', 'draft'], // 页面模式
			type: 'article',
			// 长列表控制
			downOption: {
				auto: false
			},
			upOption: {
				auto: false,
				page: {
					num: 0,
					size: 10
				},
				noMoreSize: 3,
				empty: {
					use: false
				}
			}
		}
	},
	onLoad(query) {
		this.type = this.$Route.query.type
	},
	async onShow() {
		this.userId = await this.getUserId()
		await this.fetchData(this.type)
	},
	methods: {
		...userDocActions(['getUserId']),
		...articleActions(['fetchArticles', 'fetchDraft']),
		goArticle() {
			this.$Router.push({name:'article'})
		},
		
		// 获取数据
		async fetchData(type) {
			let res
			let total
			switch (type){
				case this.types[0]: // 文章
					res = await this.fetchArticles(this.atcData)
					break;
				case this.types[1]: // 草稿
					res = await this.fetchDraft(this.atcData)
					break;
			}
			this.articles = res && res.data
			total = res && res.total
			return total
		},

		// 下拉刷新
		downCallback(mescroll) {
			this.upCallback(Object.assign(mescroll, { num: 0, size: 10 }))
		},

		// 上滑加载
		async upCallback(mescroll) {			
			try{
				const total = await this.fetchData(this.type)
				mescroll.endSuccess(total)
			}catch(e){
				mescroll.endErr()
			}
		}
	}
}
</script>

<style lang="scss">
.font28 {
	font-size: 28rpx;
}
.top {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	background-color: #ffffff;
	padding: 25rpx 30rpx;
	.left {
		&-text {
			color: #1c8be4;
		}
	}
	.right {
		display: flex;
		align-items: center;
		&-img {
			height: 40rpx;
			width: 40rpx;
			margin-right: 17rpx;
		}
		&-text {
			color: #333333;
		}
	}
}
.list {
	height: calc(100% - 98rpx);
	margin-top: 10rpx;
	.items {
		
	}
}
</style>
