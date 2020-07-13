<template>
	<view class="item bg mg-t2" :style="{height:showData.type === types[1] && '170rpx'}" @tap="goArticleView">
		<view class="body font26 kt-flex mg-b20">
			<image v-if="showData.imageCode" class="img mg-r20" :src="fetchImgByMd5(showData.imageCode)" mode=""></image>
			<image v-else class="img mg-r20" src="img/article-img.png" style="width: 160rpx; height: 110rpx;" mode="aspectFill"></image>
			<view class="text font26">
				<text class="gray3">{{showData.title}}</text>
				<text class="text-2 gray9">{{showData.imageDescription}}</text>
			</view>
		</view>
		<view v-if="showData.type === types[0]" class="kt-flex font24 gray6">
			<view class="kt-flex">
				<image class="mg-r10" style="width: 25rpx; height: 25rpx;" src="img/article-clock.png" mode=""></image>
				<text>发布时间：{{$moment(showData.createTime).format('YYYY-MM-DD')}}</text>
			</view>
			<view class="kt-flex">
				<image class="mg-r10" style="width: 30rpx; height: 30rpx;" src="img/article-eye.png" mode=""></image>
				<text>{{showData.article_click || 0}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {addSign} from '@/utils/cryption.js';
import {getBaseURL} from '@/common/config/config.js'

export default {
	props: {
		showData: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			types: ['article', 'draft']
		}
	},
	methods: {
		fetchImgByMd5(md5) {
			return `${getBaseURL('file')}/file/${md5}?${this.$utils.obj2str(addSign())}`
		},
		
		goArticleView() {
			this.$Router.push({name: 'articleView', params:{mode:'read', type:this.showData.type, id: this.showData.id}})
		}
	},
}
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 211rpx;
	padding: 25rpx 30rpx 15rpx;
	.body {
		.img {
			width: 160rpx;
			height: 110rpx;
		}
		.text {
			height: 110rpx;
			width: 510rpx;
			display: flex;
			flex-direction: column;
			&-2 {
				line-height: 37rpx;
			}
		}
	}
}

.gray6 {
	color: #666666;
}
.gray9 {
	color: #999999;
}
.gray3 {
	color: #333333;
}

.mg-r10 {
	margin-right: 10rpx;
}

.mg-b20 {
	margin-bottom: 20rpx;
}

.mg-t2 {
	margin-top: 2rpx;
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
