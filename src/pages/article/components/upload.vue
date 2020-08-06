<template>
	<view class="cover kt-flex">
		<view class="cu-form-group" style="padding: 0;">
			<view class="grid grid-square flex-sub">
				<view class="bg-img wh126" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
				</view>
				<view class="solids wh126" @tap="ChooseImage" v-if="imgList.length < 1"><text class="cuIcon-cameraadd"></text></view>
			</view>
		</view>
		<view class="text-area">
			<textarea v-model="textByArticle" style="font-size:26rpx;" maxlength="25" class="textarea" placeholder-style="color:#999999; font-size:26rpx;" value="" placeholder="请输入简介（选填，限25字以内）" />
			<text class="text-num">{{textLength}}/25</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		imgs: {
			type: Array,
			default: []
		}
	},
	computed: {
		textLength() {
			return this.textByArticle.length
		}
	},
	data() {
		return {
			imgList: [],
			textByArticle: this.text
		}
	},
	watch: {
		text: {
			handler(v) {
				this.textByArticle = v
			}
		},
		textByArticle(v) {
			this.$emit('update:text', v)
		}
	},
	methods: {
		DelImg(e) {
			uni.showModal({
				title: '图片删除',
				content: '确定要删除这张图片吗？',
				cancelText: '点错了',
				confirmText: '是的',
				success: res => {
					if (res.confirm) {
						this.imgList.splice(e.currentTarget.dataset.index, 1)
					}
					this.$emit('update:imgs', [])
				}
			})
		},
		// 图片格式错误
		_validImgType(tempFiles) {
			const reg = /\w(\.jpeg|\.png|\.jpg|\.bmp)/i
			return tempFiles.every(img => reg.test(img.name))
		},
		ChooseImage() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					const isPass = this._validImgType(res.tempFiles)
					if(!isPass) {
						uni.showToast({
							title:'图片格式错误',
							icon:'none'
						})
						return
					}
					
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths)
					} else {
						this.imgList = res.tempFilePaths
					}
					this.$emit('update:imgs', res.tempFiles)
				}
			})
		},
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.text-area {
	position: relative;
	.text-num {
		font-size: 24rpx;
		color: #969799;
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
	}
}
.cover {
	height: 100%;
	padding: 0 35rpx;
}
// fix 布局让样式混乱
.wh126 {
	width:126rpx;
	height:126rpx;
	margin-bottom: 0 !important;
}
.textarea {
	flex-basis: 1;
	padding: 20rpx;
	height: 126rpx;
	width: 528rpx;
	border:1rpx solid rgba(221,221,221,1);
}
</style>
