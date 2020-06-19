<template>
	<view class="kt-container article">
		<input
			v-model="articleData.title"
			class="title"
			placeholder-class="title-placeholder"
			style="border-bottom: 1rpx solid #DDDDDD;"
			type="text"
			value=""
			placeholder="请输入标题"
		/>

		<!-- 编辑器 -->
		<kt-editor
			ref="Editor"
			@on-keyboard-show="onKeyboardShow"
			:autoHideToolbar="true"
			placeholder="输入正文..."
			:imageUploader="upload"
			areaHeight="calc(100% - 445rpx)"
			:html="html"
		></kt-editor>

		<view class="opt" :style="keyBoardShow ? 'position:fixed;bottom:80rpx;' :''">
			<view class="msg">上传封面图片</view>
			<view class="logo"><upload :imgs.sync="articleData.images" :text.sync="articleData.imageDescription"></upload></view>
		</view>

		<view class="btns kt-flex kt-just-end" v-if="!keyBoardShow">
			<button class="cu-btn" @tap="goView">预览</button>
			<button class="cu-btn" @tap="doSave">保存</button>
			<button class="cu-btn" @tap="modalShow = true">保存并发布</button>
		</view>

		<kt-modal class="modal" title="发布提示" v-model="modalShow" @on-cancel="onModalCancel" @on-confirm="onModalConfirm">
			<text>您是否确认发布文章</text>
		</kt-modal>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions:userDocActions } = createNamespacedHelpers('userDoc')
const { mapActions:articleActions } = createNamespacedHelpers('article')
import { getArticleDraft, addOrModifyDraft } from '@/apis/modules/article.js'
import { fileUpload, imgByMd5 } from '@/apis/modules/file.js'
import ktEditor from './components/kt-editor/kt-editor.vue'
import upload from './components/upload.vue'
import ktModal from '@/components/kt-uni-ui/kt-modal/kt-modal.vue'

export default {
	components: {
		ktEditor,
		upload,
		ktModal
	},
	
	data() {
		return {
			articleData: { // 文章编辑数据
				userId: '',
				title: '',
				images: [], // upload 组件回传封面图 Array 类型
				imageCode: '', // 接口交互要转成 md5
				imageDescription: '', // 限制就是25个字
				articleContent: '' // 富文本
			},
			html: '', // 创建时空，编辑时给值
			modalShow: false,
			keyBoardShow: false,
		}
	},

	async onLoad() {
		const {id, type} = this.$Route.query
		if(id && type) { // 编辑
			const article = await this.fetchSingleArticleOrDraft({type, id})
			this.articleData = Object.assign({}, {...article, images:[]})
			this.html = article.articleContent.replace(/<img [^>]*data-custom=['"]([^'"]+)[^>]*>/gi, function (match, custom) {
			    const md5 = custom.slice(4)
					const url = imgByMd5(md5)
			    const res = match.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/i, `src="${url}"`)
					return res
			})
		} else { // 创建
			this.articleData.userId = await this.getUserId()
		}
	},

	methods: {
		...articleActions(['createArticleOrDraft', 'fetchSingleArticleOrDraft']),
		...userDocActions(['getUserId']),
		
		// 预览页面
		async goView() {
			const couldCreate = await this.preCommit()
			if(!couldCreate) return
			this.$Router.push({ name: 'articleView', params:{...this.articleData, mode:'preview'} })
		},
		
		// 获取富文本
		async getHtml() {
			return await this.$refs['Editor'].previewData()
		},
		// 替换文本
		setHtml(html) {
			this.$refs['Editor']._insertText(html)
		},
		// 发布前
		async preCommit() {
			if(!this.isValid()) return false
			const imgUpload = await this.uploadImg()
			this.articleData.articleContent = await this.getHtml()
			return true
		},
		// 上传封面
		async uploadImg() {
			if (!this.articleData.images.length) return
			this.articleData.imageCode = await fileUpload(this.articleData.images[0])
		},
		
		// 保存草稿
		async doSave() {
			const couldCreate = await this.preCommit()
			if(!couldCreate) return
			
			const res = await this.createArticleOrDraft({...this.articleData, type:'draft'})
			uni.showToast({
				title: '保存未发布的文章可在【我的草稿箱】中查看',
				duration: 2000,
				icon: 'none',
				success: _ => this.goDoctorMain()
			})
		},
		
		// 发布文章
		async doCommit() {
			const couldCreate = await this.preCommit()
			if(!couldCreate) return
			const res = await this.createArticleOrDraft({...this.articleData, type:'article'})
			uni.showToast({
				title: '发布成功',
				duration: 2000,
				success: _ => this.goDoctorMain()
			})
		},
		
		// 跳转到个人号
		goDoctorMain() {
			setTimeout(() => {
				this.$Router.push({name:'doctorMain'})
			}, 2000)
		},
		
		onModalConfirm() {
			this.doCommit()
		},
		onModalCancel() {
			// console.log('取消')
			// TODO
		},
		// 编辑器键盘弹出
		onKeyboardShow(show) {
			this.keyBoardShow = show
		},
		
		// 编辑器图片上传
		async upload(localImg, insertImgCb) {
			try {
				const md5 = await fileUpload(null, localImg.path, localImg.name)
				insertImgCb(md5)
			} catch (e) {
				uni.showToast({
					title: '图片上传失败'
				})
			}
		},
		
		
		// 验证：标题必填
		isValid() {
			let valid = this.articleData.title
			if (!valid) {
				uni.showToast({
					title:'请填写文章标题',
					icon:'none'
				})
				return false
			}
			return true
		}
	}
}
</script>

<style lang="scss" scoped>
$blue: #1c8be4;
.btns {
	height: 100rpx;
	line-height: 100rpx;
	background-color: #ffffff;
	.cu-btn {
		height: 50rpx;
		line-height: 50rpx;
		background-color: #ffffff;
		font-size: 24rpx;
		padding: 10rpx;
		&:nth-child(1) {
			color: $blue;
			border-style: none !important;
			margin-right: 40rpx;
		}
		&:nth-child(2) {
			color: $blue;
			width: 140rpx;
			border-radius: 4rpx;
			margin-right: 30rpx;
			border: 1rpx solid $blue;
		}
		&:nth-child(3) {
			color: #ffffff;
			background-color: $blue;
			width: 140rpx;
			border-radius: 4rpx;
			margin-right: 20rpx;
		}
	}
}
.opt {
	height: 250rpx;
	line-height: 250rpx;
	background-color: #ffffff;
	.msg {
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 40rpx;
		color: #999999;
		font-size: 28rpx;
		font-weight: bold;
	}
	.logo {
		height: 190rpx;
		border-top: 1rpx solid #eeeeee;
		border-bottom: 1rpx solid #eeeeee;
	}
}
.title {
	height: 95rpx;
	padding: 40rpx 40rpx 0;
	background-color: #ffffff;
	border-bottom: 0 !important;
	&-placeholder {
		color: #666666;
		font-size: 32rpx;
		font-weight: bold;
	}
}
</style>
