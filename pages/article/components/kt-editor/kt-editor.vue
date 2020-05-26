<template>
	<view class="editer-container" :style="editAreaHeight">
		<!-- 编辑器 -->
		<view class="editor-area">
			<editor
				id="editor"
				class="ql-container"
				:placeholder="placeholder"
				show-img-size
				show-img-toolbar
				show-img-resize
				@statuschange="_statusChange"
				@ready="onEditorReady"
			></editor>
		</view>

		<!-- 工具栏 -->
		<!-- v-show="keyboardShow || !autoHideToolbar" style="bottom: 288rpx;" -->
		<view class="editor-toolbar" v-show="keyboardShow || !autoHideToolbar">
			<block v-for="(t, idx) in tools" :key="t.field">
				<!-- 字号 -->
				<picker v-if="t.field === 'font'" class="iconfont" mode="selector" :range="fontSizeRange" @change="handler(t, $event)">
					<view :class="t.icon"></view>
				</picker>

				<!-- 文本颜色 -->
				<view
					v-else-if="t.field === 'color'"
					:style="fontColor != '#FFFFFF' ? 'color:' + formats.color : ''"
					:class="'iconfont' + t.icon"
					@tap="handler(t)"
				></view>

				<!-- 背景颜色 -->
				<view
					v-else-if="t.field === 'backgroundColor'"
					:style="bgColor ? 'color:' + formats.backgroundColor : ''"
					:class="'iconfont' + t.icon"
					@tap="handler(t)"
				></view>

				<!-- 对齐方式 -->
				<view
					v-else-if="t.name === 'align'"
					class="iconfont"
					:class="[formats.align === t.value ? 'ql-active' : '', t.icon]"
					@tap="handler(t)"
				></view>

				<!-- 列表 -->
				<view v-else-if="t.name === 'list'" class="iconfont" :class="[formats.list === t.value ? 'ql-active' : '', t.icon]" @tap="handler(t)"></view>

				<!-- 缩进/缩退 -->
				<view v-else-if="t.name === 'indent'" class="iconfont" :class="t.icon" @tap="handler(t)"></view>

				<!-- 标题 -->
				<view
					v-else-if="t.name === 'header'"
					class="iconfont"
					:class="[formats.header == t.value ? 'ql-active' : '', t.icon]"
					@tap="handler(t)"
				></view>

				<!-- 上/下标 -->
				<view
					v-else-if="t.name === 'script'"
					class="iconfont"
					:class="[formats.script === t.value ? 'ql-active' : '', t.icon]"
					@tap="handler(t)"
				></view>

				<!-- 其他简单类型 -->
				<view v-else class="iconfont" :class="[formats[t.name] ? 'ql-active' : '', t.icon]" @tap="handler(t)"></view>
			</block>
		</view>

		<!-- 颜色选择器 -->
		<uni-popup ref="popup" type="bottom" @transed="colorPop">
			<colorPicker :color="color" :show="showColor" @confirm="colorChanged" @cancel="colorPopClose"></colorPicker>
		</uni-popup>

		<!-- 富文本预览测试 -->
		<!-- 更好是使用 https://ext.dcloud.net.cn/plugin?id=364 -->
		<!-- <rich-text id="rich-text" :nodes="htmlData"></rich-text> -->
	</view>
</template>

<script>
import colorPicker from './components/colorPicker.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

export default {
	components: {
		colorPicker,
		uniPopup
	},
	props: {
		html: {
			type: String,
			default: ''
		},
		autoHideToolbar:{
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: '开始输入...'
		},
		// 编辑区域高度
		areaHeight: {
			type: String,
			default: '400rpx'
		},
		// 最多可选择的图片张数
		muiltImage: {
			type: Boolean,
			default: false
		},
		// 是否压缩图片
		compressImage: {
			type: Boolean,
			default: false
		},
		// 上传图片回调
		imageUploader: {
			type: Function
		},

		// 工具列表
		toolList: {
			type: Array,
			default: function() {
				return [
					'bold',
					'italic',
					'underline',
					'strike',
					'align-left',
					'align-center',
					'align-right',
					'remove',
					'font',
					'color',
					'backgroundColor',
					'image'
				]
			}
		}
	},
	computed: {
		tools() {
			const tools = [
				// 样式 editorContext.format 可以直接执行的
				{ field: 'bold', name: 'bold', label: '加粗', icon: 'icon-zitijiacu' },
				{ field: 'italic', name: 'italic', label: '斜体', icon: 'icon-zitixieti' },
				{ field: 'underline', name: 'underline', label: '下划线', icon: 'icon-zitixiahuaxian' },
				{ field: 'strike', name: 'strike', label: '删除线', icon: 'icon-zitishanchuxian' },
				{ field: 'align-left', name: 'align', value: 'left', label: '左对齐', icon: 'icon-zuoduiqi' },
				{ field: 'align-center', name: 'align', value: 'center', label: '居中', icon: 'icon-juzhongduiqi' },
				{ field: 'align-right', name: 'align', value: 'right', label: '右对齐', icon: 'icon-youduiqi' },
				{ field: 'align-justify', name: 'align', value: 'justify', label: '两端对齐', icon: 'icon-zuoyouduiqi' },

				// API
				{ field: 'remove', label: '清除格式', icon: 'icon-clearedformat', api: 'removeFormat' },
				{ field: 'clear', name: 'clear', label: '清空', icon: 'icon-shanchu', api: 'clear' },
				{ field: 'divider', label: '插入水平线', icon: 'icon-fengexian', api: 'insertDivider' },
				{ field: 'undo', label: '撤销', icon: 'icon-undo', api: 'undo' },
				{ field: 'redo', label: '恢复', icon: 'icon-redo', api: 'redo' },

				// 定制化功能
				{ field: 'date', label: '插入日期', icon: 'icon-date' },
				{ field: 'font', label: '调整字体大小', icon: 'icon-fontsize' },
				{ field: 'color', label: '文本颜色', icon: 'icon-text_color' },
				{ field: 'backgroundColor', label: '背景颜色', icon: 'icon-fontbgcolor' },
				{ field: 'image', label: '插入图片', icon: 'icon-charutupian' },
				{ field: 'preview', name: 'preview', label: '预览', icon: 'icon-preview' },

				// 扩展
				{ field: 'list-check', name: 'list', value: 'check', label: '待办列表', icon: 'icon-checklist' },
				{ field: 'list-ordered', name: 'list', value: 'ordered', label: '有序列表', icon: 'icon-youxupailie' },
				{ field: 'list-bullet', name: 'list', value: 'bullet', label: '无序列表', icon: 'icon-wuxupailie' },
				{ field: 'outdent', name: 'indent', value: '-1', label: '缩退', icon: 'icon-outdent' },
				{ field: 'indent', name: 'indent', value: '+1', label: '缩进', icon: 'icon-indent' },
				{ field: 'h1', name: 'header', value: '1', label: '一级标题', icon: 'icon-format-header-1' },
				{ field: 'h2', name: 'header', value: '2', label: '二级标题', icon: 'icon-format-header-2' },
				{ field: 'h3', name: 'header', value: '3', label: '三级标题', icon: 'icon-format-header-3' },
				{ field: 'h4', name: 'header', value: '4', label: '四级标题', icon: 'icon-format-header-4' },
				{ field: 'h5', name: 'header', value: '5', label: '五级标题', icon: 'icon-format-header-5' },
				{ field: 'h6', name: 'header', value: '6', label: '六级标题', icon: 'icon-format-header-6' },
				{ field: 'sub', name: 'script', value: 'sub', label: '下标', icon: 'icon-zitixiabiao' },
				{ field: 'super', name: 'script', value: 'super', label: '上标', icon: 'icon-zitishangbiao' },
				{ field: 'rtl', name: 'direction', value: 'rtl', label: '文本方向', icon: 'icon-direction-rtl' }
			]

			return tools.filter(t => this.toolList.includes(t.field))
		}
	},
	watch: {
		keyboardShow(value) {
			this.$emit('on-keyboard-show', value)
		},
		html(value) {
			this.onEditorReady()
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.viewHeight = res.windowHeight
			}
		})
	},
	mounted() {
		uni.onWindowResize((res) => {
			this.keyboardShow = this.viewHeight > res.size.windowHeight
		})
	},
	data() {
		return {
			editorCtx: null, // 编辑器实例
			formats: {}, // 当前生效的样式
			viewHeight: 0, // 页面初始高度
			keyboardShow: false, // 键盘是否弹起

			// 字号列表
			fontSizeRange: [10, 12, 14, 16, 18, 24, 32],

			// 色盘
			fontColor: '', // 文本色图标颜色
			bgColor: '', // 背景色图标颜色
			colorPickerName: '', // 当前打开的色盘
			color: '', // 色盘选择的颜色
			showColor: false ,// 显隐选择器
			
			// 文本预览
			htmlData: '',
			
			editAreaHeight: `height:${this.areaHeight}`
		}
	},
	methods: {
		// 工具栏操作
		handler(tool, payload) {
			if (!tool.field) return
			this.toast(tool.label)

			if (tool.api) {
				this.editorCtx[tool.api]()
				return
			}

			switch (tool.field) {
				case 'color':
				case 'backgroundColor': // 色盘
					this.colorPicker(tool.field)
					break
				case 'date': // 插入当前日期
					this.insertDate()
					break
				case 'font': // 字号
					const fz = this.fontSizeRange[payload.detail.value] + 'px'
					this.editorCtx.format('fontSize', fz)
					break
				case 'image': // 插入图片
					this.insertImage()
					break
				case 'preview':
					this.previewData()
					break
				default:
					// 更改样式
					this.editorCtx.format(tool.name, tool.value)
					break
			}
		},

		// 提示
		toast(label) {
			uni.showToast({
				duration: 600,
				icon: 'none',
				title: label
			})
		},

		// ********************************** 编辑器扩展功能
		// 预览文本
		previewData() {
			return new Promise((resolve, reject) => {
				let html
				this.editorCtx.getContents({
					success: res => {
						html = res.html
						this.htmlData = html.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
						resolve(html)
					}
				})
			})
		},

		// 图片插入
		insertImage() {
			const params = {
				count: this.muiltImage ? 9 : 1,
				sizeType: this.compressImage ? ['compressed'] : ['original'],
				sourceType: ['album', 'camera'] // 默认就是这个2项
			}

			uni.chooseImage({
				...params,
				success: res => {
					// 验证图片格式
					const isPass = this._showToast(_ => this._validImgType(res.tempFiles), '图片格式错误')
					if (!isPass) return
					
					res.tempFiles.forEach(async file => {
						// 获取压缩图片路径和名字
						const _img = await this.imageCompression(file)
						// 图片经过自定义上传接口，拿到 Md5 存储上标签属性上
						this.imageUploader(_img, (md5) => {
							this.editorCtx.insertImage({
								src: _img.path,
								alt: '图像',
								data: {md5}
							})
						})
					})
				}
			})
		},

		// 文本颜色和背景色
		colorPicker(field) {
			let color = this.formats[field]
			this.colorPickerName = field
			if (field == 'color' && !color) {
				color = '#000000'
			}
			if (field == 'backgroundColor' && !color) {
				color = '#FFFFFF'
			}
			this.color = color
			this.colorPopOpen()
		},
		// uni-popup 组件自定义事件
		colorPop(e) {
			this.showColor = e.show
		},
		// 打开色盘
		colorPopOpen() {
			this.$refs.popup.open({
				type: 'bottom'
			})
		},
		// 关闭色盘
		colorPopClose() {
			this.$refs.popup.close()
		},
		// 更换颜色
		colorChanged(e) {
			let label = ''
			switch (this.colorPickerName) {
				case 'backgroundColor':
					if (e.color == '#FFFFFF') {
						e.color = ''
					}
					this.bgColor = e.color
					label = '背景色'
					break
				case 'color':
					this.fontColor = e.color
					label = '颜色'
					break
			}
			this.colorPopClose()
			this.editorCtx.format(this.colorPickerName, e.color)
		},

		// 插入内容 - 日期
		insertDate() {
			const date = new Date()
			const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			this._insertText(formatDate)
		},

		// ********************************** 编辑器实例 API
		// 插入文本
		_insertText(text) {
			this.editorCtx.insertText({ text })
		},

		// 编辑内样式发生改变，记录生效样式列表
		_statusChange(e) {
			this.formats = e.detail
		},

		// 编辑器初始化
		onEditorReady() {
			uni
				.createSelectorQuery()
				.in(this)
				.select('#editor')
				.context(res => {
					this.editorCtx = res.context
					if (this.html) {
						this.editorCtx.setContents({
							html: this.html
						})
					}
				})
				.exec()
		},
		// ********************************** 辅助方法
		// 验证图片格式：验证的是文件后缀格式
		_validImgType(tempFiles) {
			const reg = /\w(\.jpeg|\.png|\.jpg|\.bmp)/i
			return tempFiles.every(img => reg.test(img.name))
		},
		
		// 验证性交互提示
		_showToast(cb, title) {
			const yes = cb()
			if (!yes) {
				uni.showToast({
					title,
					icon: 'none'
				})
				return false
			}
			return true
		},
		
		// 图片旋转
		imageCompression(img) {
			const that = this
			// 图片基本信息
			const { path, name } = img
		
			// Image 标签
			const image = new Image()
			image.src = path
		
			return new Promise((resolve) => {
				// 图片加载
				image.onload = function(img_event) {
					const imgSelf = this
						
					// http 对象
					const http = new XMLHttpRequest()
					http.open('GET', path, true)
					http.responseType = 'blob'
						
					// http 请求方法
					http.onload = function(http_event) {
						const httpSelf = this
						if (httpSelf.status == 200 || httpSelf.status === 0) {
							// http 请求状态
							let reader = new FileReader() // 文件流
							reader.onload = function(reader_event) {
								let view = new DataView(this.result)
						
								// 图片压缩1
								if (view.getUint16(0, false) != 0xffd8) {
									that._cpimg(path, httpSelf, imgSelf, -1, name).then(img => resolve(img))
									return 
								}
						
								let length = view.byteLength
								let offset = 2
								while (offset < length) {
									let marker = view.getUint16(offset, false)
									offset += 2
									if (marker == 0xffe1) {
										if (view.getUint32((offset += 2), false) != 0x45786966)
											that._cpimg(path, httpSelf, imgSelf, -1, name).then(img => resolve(img))
											return 
										let little = view.getUint16((offset += 6), false) == 0x4949
										offset += view.getUint32(offset + 4, little)
										let tags = view.getUint16(offset, little)
										offset += 2
										for (let i = 0; i < tags; i++)
											if (view.getUint16(offset + i * 12, little) == 0x0112) {
												that._cpimg(path, httpSelf, imgSelf, view.getUint16(offset + i * 12 + 8, little), name).then(img => resolve(img))
												return
											}
									} else if ((marker & 0xff00) != 0xff00) break
									else offset += view.getUint16(offset, false)
								}
						
								// 图片压缩2
								that._cpimg(path, httpSelf, imgSelf, -1, name).then(img => resolve(img))
								return 
							}
							reader.readAsArrayBuffer(httpSelf.response)
						}
					}
					http.send()
				}
			})
		},
		
		// 图片压缩
		_cpimg(filePath, httpSelf, imgSelf, orientation, name) {
			const that = this
			const image = {
				size: httpSelf.response.size,
				type: httpSelf.response.type,
				width: imgSelf.width,
				height: imgSelf.height,
				orientation,
				name
			}
			let img = new Image()
			img.src = filePath // 要压缩的图片
			let canvas = document.createElement('canvas')
			let ctx = canvas.getContext('2d')
			// 压缩图片 - 旋转处理
			let base = image.width / image.height
			if (image.width > that) {
				image.width = that.maxWidth
				image.height = Math.floor(image.width / base)
			}
			canvas.width = image.width
			canvas.height = image.height
			
			return new Promise((resolve) => {
				img.onload = () => {
					//  旋转图片
					let ot = image.orientation
					if ([5, 6, 7, 8, 'right', 'left', 'right-mirrored', 'left-mirrored'].indexOf(ot) > -1) {
						let base = image.width / image.height
						if (image.width > that.maxWidth) {
							image.height = that.maxWidth
							image.width = Math.floor(image.height * base)
						}
						canvas.width = image.height
						canvas.height = image.width
					}
					if (ot == 2 || ot == 'up-mirrored') {
						consol.log('待调整1')
					} else if (ot == 3 || ot == 'down') {
						consol.log('待调整2')
					} else if (ot == 4 || ot == 'down-mirrored') {
						consol.log('待调整3')
					} else if (ot == 5 || ot == 'right-mirrored') {
						consol.log('待调整4')
					} else if (ot == 6 || ot == 'right') {
						ctx.rotate(0.5 * Math.PI)
						ctx.translate(0, -image.height)
					} else if (ot == 7 || ot == 'left-mirrored') {
						consol.log('待调整5')
					} else if (ot == 8 || ot == 'left') {
						ctx.rotate(-0.5 * Math.PI)
						ctx.translate(-image.width, 0)
					}
					//将图片画到canvas上面 使用Canvas压缩
					ctx.drawImage(img, 0, 0, image.width, image.height)
						
					canvas.toBlob(
						fileSrc => {
							let imgSrc = window.URL.createObjectURL(fileSrc)
							// 拿到压缩后图片
							resolve({
								path: imgSrc,
								name: image.name
							})
						},
						image.type, 
						0.95
					)
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import './editor-icon.css';

.ql-active {
	color: #06c;
}
.editer-container {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
}
.editor-area {
	background-color: #ffffff;
	height: 100%;
	.ql-container {
		z-index: 2;
		background-color: #FFFFFF;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		font-size: 16px;
		line-height: 1.5;
		overflow: auto;
		padding: 40rpx;
		/deep/ .ql-editor {
			color: #333333;
			font-size: 26rpx;
			&::before {
				font-style: unset;
				color: #999999;
			}
		}
	}
}
.editor-toolbar {
	position: fixed;
	display: flex;
	flex-wrap: wrap;
	bottom: 0;
	// bottom: 280rpx; // 测试用
	width: 100%;
	background-color: #ffffff;
	.iconfont {
		padding: 10rpx 18rpx;
	}
}
</style>
