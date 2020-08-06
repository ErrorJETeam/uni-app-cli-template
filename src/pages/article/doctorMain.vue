<template>
	<view class="kt-container home">
		<!-- 空布局 -->
		<image class="empty" src="img/article-bg.png" mode=""></image>

		<!-- 卡片 -->
		<view class="card bg">
			<view class="info kt-flex kt-just-start">
				<image class="info-avatar" :src="imgs['doctor-avatar']" mode=""></image>
				<view class="info-body">
					<view class="line1 mg-b30">
						<text class="font30">{{ docInfo.empName }}</text>
						<text class="mg-l20">{{ docInfo.titlesName }}</text>
					</view>

					<view class="gray6 font26">
						<text class="mg-r30">收藏量</text>
						<text class="line3-2 orange">{{ favNum || 0 }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 快捷入口 -->
		<view class="fast bg kt-flex__c--xy kt-just-start">
			<view style="flex:1"></view>
			<view style="flex:1; width: 100%;" class="fast-list kt-flex kt-just-start">
				<view class="item kt-flex__c--xy" v-for="fa in fast" :key="fa.name" @tap="goList(fa.type)">
					<view class="item-bg"><image class="item-img" :src="fa.img"></image></view>
					<text class="item-text">{{ fa.name }}</text>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list mg-t10">
			<view class="title bg">
				<view class="line"></view>
				<text class="text font30">最新动态</text>
			</view>
			<view class="items"><article-item v-for="atc in articles" :key="atc.id" :show-data="atc"></article-item></view>
		</view>
	</view>
</template>

<script>
import articleItem from './components/article-item.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: userDocActions, mapState: userDocState } = createNamespacedHelpers('userDoc')
const { mapActions: articleActions } = createNamespacedHelpers('article')

export default {
	components: {
		articleItem
	},
	computed: {
		...userDocState({
			userId: state => state.docInfo.userId
		})
	},
	watch: {
		async userId(id) {
			this.articles = (await this.fetchArticles({ page: this.page, userId: id })).data
		}
	},
	data() {
		return {
			imgs:this.$staticImage,
			fast: [
				{ name: '我的文章', img: 'img/my-article.png', type: 'article' },
				{ name: '我的草稿箱', img: 'img/draft.png', type: 'draft' }
			],
			docInfo: {},
			articles: [],
			page: {
				pageIndex: 0,
				pageSize: 10
			},
			favNum: 0 // 收藏数
		}
	},
	async onLoad(query) {
		if (query && !Object.keys(query).length && !uni.getStorageSync('docParams')) {
			uni.showToast({
				title: '请先获取登录信息',
				icon: 'none'
			})
			return
		}

		// 仁济需求地址栏参数 => ?empId&chis_token
		/* #ifdef MP-WEIXIN */
		console.log('小程序', query, this.$Route)
		/* #ENDIF */
		this.docInfo = query && (await this.fetchDocInfo(query))
		this.favNum = query && (await this.fetchFavorate(this.docInfo.userId))
	},
	async onShow() {
		if (!this.userId) return
		this.articles = (await this.fetchArticles({ page: this.page, userId: this.userId })).data
	},
	methods: {
		...userDocActions(['fetchDocInfo']),
		...articleActions(['fetchFavorate', 'fetchArticles']),

		// 跳转到我的文章列表页面
		goList(type) {
			this.$Router.push({ name: 'articleList', params: { type } })
		}
	}
}
</script>

<style>
.gray6 {
	color: #666666;
}
.gray9 {
	color: #999999;
}
.gray3 {
	color: #333333;
}
.orange {
	color: #f89939;
}
.mg-r10 {
	margin-right: 10rpx;
}
.mg-r20 {
	margin-right: 20rpx;
}
.mg-l20 {
	margin-left: 20rpx;
}
.mg-r30 {
	margin-right: 30rpx;
}
.mg-b10 {
	margin-bottom: 10rpx;
}
.mg-b20 {
	margin-bottom: 20rpx;
}
.mg-b30 {
	margin-bottom: 30rpx;
}
.mg-t10 {
	margin-top: 10rpx;
}
.mg-t2 {
	margin-top: 2rpx;
}

.font30 {
	color: #333333;
	font-size: 30rpx;
	font-weight: bold;
}
.font24 {
	font-size: 24rpx;
}
.font26 {
	font-size: 26rpx;
}
.bg {
	background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
.list {
	.title {
		display: flex;
		align-items: center;
		height: 88rpx;
		width: 100%;
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
			font-size: 30rpx;
		}
	}
}
.card {
	position: absolute;
	background-image: url(//jkfw.wsj.xjbt.gov.cn/mini/im/card-bg.png);
	background-repeat:no-repeat;
	background-size: contain;
	background-position: 200rpx center;
	height: 170rpx;
	width: 700rpx;
	top: 231rpx;
	left: 25rpx;
	box-shadow: 2rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
	border-radius: 8rpx;
	z-index: 1;
	padding: 20rpx 20rpx 20rpx 0;
	.info {
		&-avatar {
			width: 130rpx;
			height: 130rpx;
			margin-left: 38rpx;
			margin-right: 28rpx;
			position: relative;
			bottom: 40rpx;
		}

		&-body {
			flex: 1;
			.line1 {
				height: 35rpx;
				line-height: 35rpx;
			}
		}
	}
}
.fast {
	height: 315rpx;
	padding-bottom: 36rpx;
	.fast-list {
		padding: 0 60rpx;
	}
	.item {
		margin-right: 100rpx;
		&-bg {
			position: relative;
			width: 100rpx;
			height: 100rpx;
			line-height: 100rpx;
			// background: rgba(235, 246, 255, 1);
			border-radius: 50rpx;
		}
		&-img {
			width: 70rpx;
			height: 70rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		&-text {
			color: #2b354a;
			font-size: 28rpx;
			margin-top: 10rpx;
		}
	}
}
.home {
	position: relative;
}
.empty {
	height: 310rpx;
	width: 100%;
}
</style>
