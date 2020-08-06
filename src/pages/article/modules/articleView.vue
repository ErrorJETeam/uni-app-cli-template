<template>
	<view class="kt-container article-view">
		<view class="top"><text class="text">{{articleData.title}}</text></view>

		<view class="info kt-flex" v-if="mode===modes[1]">
			<text class="info-item">{{ `小葫芦&nbsp;&nbsp;&nbsp;&nbsp;2020-04-17` }}</text>
			<text style="flex:1;"></text>
			<view class="info-item kt-flex">
				<image class="item-img" src="img/start-solid.png" mode=""></image>
				<text class="item-text">{{articleData.article_click || 0}}</text>
			</view>
		</view>

		<view class="body ql-container" :style="{height: mode===modes[0] ? 'calc((100% - 173rpx))' : ''}">
			<jyf-parser :html="articleData.articleContent" ref="article"></jyf-parser>
		</view>

		<view class="bottom" v-if="mode===modes[1]">
			<view class="bottom-line1 kt-flex kt-just-end">
				<image class="icon" src="img/article-eye.png" mode=""></image>
				<text class="text">{{articleData.favorite_amount || 0}}</text>
			</view>
			<view class="bottom-line2 kt-flex">
				<view class="kt-flex" @tap="preDel">
					<image class="img" src="img/article-remove.png" mode=""></image>
					<text class="text">删除</text>
				</view>
				<view style="flex:1;"></view>
				<view class="kt-flex">
					<view class="kt-flex" v-if="type === types[1]" @tap="goArticle">
						<image class="img" src="img/article-edit2.png" mode=""></image>
						<text class="text">编辑</text>
					</view>
					<view class="kt-flex" v-if="type === types[1]" @tap="preCommit" style="margin-left: 30rpx;">
						<kt-icon class="img" name="kt-fabu" custom-prefix="kt-icon" size="32" color="#999999"></kt-icon>
						<text class="text">发布</text>
					</view>
				</view>
			</view>
		</view>
		
		<button @tap="$Router.back(1)" v-else type="primary" style="width: 100%;height: 88rpx; line-height: 88rpx; text-align: center; border-radius: 0; position: fixed; bottom: 0;">返回</button>

		<kt-modal class="modal" title="提示" v-model="modal.show" @on-confirm="onModalConfirm">
			<text>{{modal.text}}</text>
		</kt-modal>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions:articleActions } = createNamespacedHelpers('article')
import jyfParser from "../components/jyf-parser/jyf-parser";
import ktModal from '@/components/kt-uni-ui/kt-modal/kt-modal.vue'
import { imgByMd5 } from '@/apis/modules/file.js'

export default {
	components: {
		ktModal, jyfParser
	},
	data() {
		return {
			modalTypes: ['del', 'commit'], // 提示类型
			modal: {
				show: false,
				text: '',
				type: ''
			},
			modes: ['preview', 'read'], // 预览和医生阅读模式
			types: ['article', 'draft'], // 文章 | 草稿
			mode: 'preview',
			type: '', // 仅在 mode=read 时生效
			articleData: {},
			articleId: null
		}
	},
	async onLoad() {
		const {mode, ...articleData} = this.$Route.query
		this.mode = mode
		
		switch (mode){
			case this.modes[0]:
				this.articleData = articleData
				this.type = ''
				break;
			case this.modes[1]:
				this.articleId = articleData.id
				this.type = articleData.type
				
				const article = await this.fetchSingleArticleOrDraft({type:articleData.type, id:articleData.id})
				this.articleData = article
				this.articleData.articleContent = this.handleImg(article.articleContent)
				break;
		}
	},
	methods: {
		...articleActions(['fetchSingleArticleOrDraft', 'delArticleOrDraft', 'createArticleOrDraft']),
		// 删除提示
		preDel() {
			this.modal.text = '您是否确认删除该文章？'
			this.modal.type = this.modalTypes[0]
			this.modal.show = true
		},
		// 发布文章
		preCommit() {
			this.modal.text = '您是否确认发布该文章？'
			this.modal.type = this.modalTypes[1]
			this.modal.show = true
		},
		
		// 删除操作
		async doDel(){
			try{
				await this.delArticleOrDraft({type:this.type, id:this.articleId})
				this.showToastAndBack('删除成功')
			}catch(e){
				console.error('删除失败: ', e.msg || '删除失败')
				setTimeout(() => {
					this.$Router.back(1)
				}, 1500)
			}
		},
		
		// 发布操作
		async doCommit(){
			try{
				const res = await this.createArticleOrDraft({...this.articleData, type:'article'})
				this.showToastAndBack('发布成功')
			}catch(e){
				console.error('发布失败: ', e.msg || '发布失败')
				setTimeout(() => {
					this.$Router.back(1)
				}, 1500)
			}
		},
		
		onModalConfirm() {
			switch (this.modal.type){
				case this.modalTypes[0]:
					this.doDel()
					break;
				case this.modalTypes[1]:
					this.doCommit()
					break;
			}
		},
		
		showToastAndBack(title, none) {
			uni.hideToast()
			uni.showToast({
				title,
				icon: none ? 'none' : 'success',
				success:_=>{
					setTimeout(() => {
						this.$Router.back(1)
					}, 1500)
				}
			})
		},
		
		// 处理富文本中的 md5 图片
		// preview 模式是没有 md5 的，只有本地路径
		handleImg(html) {
			if(!html) return
			// html = html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
			html = html.replace(/<img [^>]*data-custom=['"]([^'"]+)[^>]*>/gi, function (match, custom) {
			    const md5 = custom.slice(4)
					const url = imgByMd5(md5)
			    const res = match.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/i, `src="${url}"`)
					return res
			})
			return html
		},
		
		// 跳转文章编辑页面
		goArticle() {
			this.$Router.replace({name:'article', params:{
				id: this.articleId,
				type: this.type
			}})
		}
	}
}
</script>

<style lang="scss" scoped>
#rich-text {
	width: 100%;
}
.titleImg {
	width: 690rpx;
	height: 350rpx;
}
.body {
	height: calc((100% - 298rpx));
	width: 100%;
	overflow: auto;
	padding: 30rpx;
	background-color: #ffffff;
}
.bottom {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #ffffff;
	&-line1 {
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 50rpx;
		.icon {
			width: 30rpx;
			height: 30rpx;
			margin-right: 15rpx;
		}
		.text {
			color: #999999;
			font-size: 26rpx;
		}
	}
	&-line2 {
		border-top: 1rpx solid #eeeeee;
		height: 98rpx;
		line-height: 98rpx;
		padding: 0 50rpx;
		.img {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
		.text {
			font-size: 26rpx;
			color: #333333;
		}
	}
}
.info {
	height: 46rpx;
	line-height: 46rpx;
	padding: 0 30rpx;
	background-color: #ffffff;
	&-item {
		&:nth-child(1) {
			color: #999999;
			font-size: 24rpx;
		}
		&:nth-child(3) {
			position: relative;
			.item-img {
				// UI 图片中心店有偏差
				position: relative;
				bottom: 2rpx;
				width: 28rpx;
				height: 28rpx;
				margin-right: 26rpx;
			}
			.item-text {
				color: #ffba00;
				font-size: 26rpx;
			}
		}
	}
}
.top {
	padding: 30rpx 30rpx 0;
	background-color: #ffffff;
	.text {
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
	}
}
.article-view {
	position: relative;
}
</style>
