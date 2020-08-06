# 图表库组件化

## 区域图 Area
![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200402104623.png)



### 使用示例

引入组件和注册

```js
import ktChartsArea from '@/components/kt-charts/kt-charts-area.vue'

export default {
	components: {
		ktChartsArea
	}
}
```

获取图表数据和格式化
```js
chartData = {
	// 数据类别
	categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
	// 数据列表
	series: [{
		name: '成交量A',
		data: [100, 80, 95, 150, 112, 132, 122],
		color: '#1C8BE4'
	}, ]
}
```

使用和数据绑定
- witdh 宽度
- height 高度
- chart-id 必须传的，用于 canvas DOM 指定。名字不能重复
- chart-data 如上数据
- options，配置选项，目前可以配置 `legend | area`
```vue
<kt-charts-area :width="735" :height="360" chart-id="chart-area" :chart-data="chartData" :options="{area:{type:'curve', opacity:0}, legend:{show: true}}">
</kt-charts-area>
```



## 圆环图 ring

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200402142009.png)

其他配置按照官方示例来就行，其中有一个常见但是在文档中很难看到描述的样式。

每一个数据的描述部分，是可以自定义的

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200403152100.png)

具体代码参照：

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200403152147.png)

