## 患者卡片
业务组件
![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200409150959.png)



### usage
```vue
<kt-patient-card topRightClass="top-class" card-type="re">
	<template v-slot:top-left-text>
		<view>小狗</view>
		<view>男</view>
		<view>30岁</view>
	</template>
	<template v-slot:top-right-text><text>待回复</text></template>
	<template v-slot:bottom-left>图</template>
	<template v-slot:bottom-right>2016-09-08 12:45:10</template>
</kt-patient-card>
```

### API
- card-type, 【String】in 问诊模式卡片， re 复诊模式卡片
- options:`Object`, `{avater: true, bottom: true, topRightArrow: true}` 控制`[顶部头像 | 底部 | 右上角箭头]`是否显示

### Slot

- top-img, 左上角头像
- top-left-text， 坐上文字
- top-right-text， 右上文字
- context， 内容区
- bottom-left， 左下区域
- bottom-right，右下区域


### Event
- kt-tap， 为了解决 `mescroll` 组件内包裹的元素 tap 事件无效，绕一圈派发出来的点击事件