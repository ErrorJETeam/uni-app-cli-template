# kt-editor

 这是基于 `uni-app` 原生自带的 `editor` 组件 + `富文本` API 实现的功能，另外配合市场上 `颜色选择器插件` 

> 看过小程序文档就知道，其实这个就是完全照抄小程序原生富文本和编辑器，文档都一样。



还需要借助 `uni-app` 的两个组件

- uni-popup 弹出层
- uni-transition 动画



![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200430141737.png)



## 原生特性

### Context

就是 `editor` 编辑器实例，它是通过 `id` 锁定一个 `<editor>` 组件

通过这个实例就可以进行一系列的 `api` 操作



### Props

```js
read-only	boolean	false 设置编辑器为只读
placeholder	string	提示信息
show-img-size	boolean	false 点击图片时显示图片大小控件
show-img-toolbarboolean	false 点击图片时显示工具栏控件
show-img-resize	boolean	false点击图片时显示修改尺寸控件
@ready	eventhandle	编辑器初始化完成时触发
@focus	eventhandle	编辑器聚焦时触发，event.detail = {html, text, delta}
@blur	eventhandle	编辑器失去焦点时触发，detail = {html, text, delta}
@input	eventhandle	编辑器内容改变时触发，detail = {html, text, delta}
@statuschange	eventhandle	通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
```



### API

#### format(name, value) 样式

就是修改样式，`name` 和 `value` 是对应的


| name                                                      | value                           | describe           |
| --------------------------------------------------------- | ------------------------------- | ------------------ |
| bold                                                      |                                 | 加粗               |
| italic                                                    |                                 | 斜线               |
| underline                                                 |                                 | 下划线             |
| strike                                                    |                                 | 删除线             |
| ins                                                       |                                 |                    |
| script                                                    | sub / super                     | 下/上标            |
| header                                                    | H1 / H2 / h3 / H4 / h5 / H6     | 标题               |
| align                                                     | left / center / right / justify | 对齐方式           |
| direction                                                 | rtl                             | 文字方向           |
| indent                                                    | -1 / +1                         | 缩退/进            |
| list                                                      | ordered / bullet / check        | 有序/无序/待办列表 |
| color                                                     | hex color                       | 文本颜色           |
| backgroundColor                                           | hex color                       | 背景颜色           |
| margin/marginTop/marginBottom/marginLeft/marginRight      | css style                       | 外边距             |
| padding/paddingTop/paddingBottom/paddingLeft/paddingRight | css style                       | 内边距             |
| font/fontSize/fontStyle/fontVariant/fontWeight/fontFamily | css style                       | 字体样式           |
| lineHeight                                                | css style                       | 行高               |
| letterSpacing                                             | css style                       | 字间距             |
| textDecoration                                            | css style                       |                    |
| textIndent                                                | css style                       |                    |

对已经应用样式的选区设置会取消样式。css style 表示 css 中规定的允许值。—— 也就是一个按钮，按一下有效，再按一下就取消这个样式。



#### setContents(obj) 初始化编辑器内容

- html 带标签的 `HTML` 内容
- delta 表示内容的 `delta` 对象
- success 成功回调 | fail 失败回调 | complete 完成回调



#### getContents(obj) 获取编辑器内容

- success 成功回调 | fail 失败回调 | complete 完成回调



#### clear(obj) 清空编辑器内容

- success 成功回调 | fail 失败回调 | complete 完成回调



#### insertDivider(obj) 插入分割线

- success 成功回调 | fail 失败回调 | complete 完成回调



#### insertText(obj) 覆盖文本

- text 文本内容
- success 成功回调 | fail 失败回调 | complete 完成回调



#### removeFormat(obj) 清除当前选取样式

- success 成功回调 | fail 失败回调 | complete 完成回调



#### undo(obj) 撤销

- success 成功回调 | fail 失败回调 | complete 完成回调



#### redo(obj) 恢复

- success 成功回调 | fail 失败回调 | complete 完成回调



#### insertImage(obj) 插入图片

- src 图片地址
- alt 图片替代文本
- width 宽度 | height 高度
- extClass 添加图片 img 标签上的类名
- data `data` 被序列化为 `name=value;name1=value2` 的格式挂在属性 `data-custom` 上
- success 成功回调 | fail 失败回调 | complete 完成回调

```js
uni.chooseImage({
  ...params,
  success: res => {
    res.tempFilePaths.forEach(path => {
      this.imageUploader(path, url => {
        this.editorCtx.insertImage({
          src: url,
          alt: '图像'
        })
      })
    })
  }
})
```




## 源代码修改
对于 `uni-popup.vue` 的修改, 在 `open | close` 事件中增加事件的派发

因为 `uni-app` 自己分装的做了一个延迟，但是这个 `change` 时间是立即触发的，没有和延迟搭上关系。所以这里在延迟结束增加了派发 `transed` 
```js
setTimeout(()=>{
	this.$emit('transed', {
		show: true // close 方法里写的是 false
	})
},this.duration)
```



## 上手指南

### Prop
- `autoHideToolbar` `boolean` 是否自动隐藏工具栏
- `areaHeight`， `String` 编辑区域高度， 默认 `400rpx`
- `muiltImage`， `Boolean` 是否可选择多张图片，false 时默认为 1 张，true 为 9 张
- `compressImage`， `Boolean` 是否开启图片压缩
- `imageUploader`， `Function` 上传图片回调，处理本地临时地址，上传服务器后，通过这个方法把真实图片地址传进去
- `html` , `String` 用于编辑器初始化时，接收到的富文本内容并展示。该值变更会触发编辑器采用该新值进行重新渲染

```js
<kt-editor :imageUploader="upload"></kt-editor>

// 父组件上传方法示例
async upload(localImg, insertImgCb) {
  try {
    // 上传文件或本地路径， 得到资源 MD5
    const md5 = await fileUpload(null, localImg.path, localImg.name)
    // 给编辑器传去 md5 码，然后会保存在 img 标签的 data-custom 自定义属性中，之后用正则取出来
    insertImgCb(md5)
  } catch (e) {
    uni.showToast({
      title: '图片上传失败'
    })
  }
}


// 接口定义
// 文件上传: 入参为文件 | 本地临时路径+名字
// 返回 md5
export function fileUpload(File, path, name) {
	return http.upload(`${file}/file/upload`, {
		filePath: path ? path : File.path,
		name: 'file',
		formData: {
			'filename': name ? name : File.name
		},
		custom: {
			cryption: false
		}
	})
}
```



- `toolList`， `Array` 工具栏列表，选取的是以下 `field` 字段

```js
// 目前已支持的工具栏列表
[
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
```



### Event

- `on-keyboard-show` 监听键盘是否弹起



## 富文本解析

原本要用 `rich-text` 来解析用上面 `editor` 导出的 `html` ，但是要另外引入样式，并采用一定的样式类包裹结构，其实效果也不理想。

> https://ask.dcloud.net.cn/article/36205



最后采用市场上成熟的插件，https://ext.dcloud.net.cn/plugin?id=805

用法简单，直接用就行了，还有很多功能有需要的话可以用，对于简单解析富文本来说，自动增加了图片预览功能，有能够保证正常解析从 `editor` 中导出的富文本内容，这就够了。

```js
// 引入
import jyfParser from "./components/jyf-parser/jyf-parser";

// 注册
components: {
  jyfParser
}

// 使用
<jyf-parser :html="articleData.articleContent" ref="article"></jyf-parser>
```





## 常用正则

### 获取某标签属性值

这里是获取 `img` 标签下 `data-custom` 属性的值。

> 形式是这样的, `data-custom="md5=xxxxxxx"`

看下面的代码是拿到 `md5=` 之后的内容，然后调用接口返回图片的加载路径

```js
this.html = article.articleContent.replace(/<img [^>]*data-custom=['"]([^'"]+)[^>]*>/gi, function (match, custom) {
  const md5 = custom.slice(4)
  const url = imgByMd5(md5)
  const res = match.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/i, `src="${url}"`)
  return res
})


// 接口展示
// 文件加载：用于 src 自动解析路径
export function imgByMd5(md5) {
  // addSign 是加验签 | utils.obj2str 对象转表单形式拼接到 URL
	return `${dev}${fileCenter}/file/${md5}?${utils.obj2str(addSign())}`
}
```



### 给图片上样式

就是替换一下，可用性不高

```js
html = html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
```








