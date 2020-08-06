<template>
	<view class="kt-charts-area">
		<canvas
			:canvas-id="chartId"
			:id="chartId"
			:style="{ width: `${cWidth}px`, height: `${cHeight}px` }"
			@touchstart="touchStart($event, chartId)"
			@touchmove="touchMove($event, chartId)"
			@touchend="touchEnd($event, chartId)"
		></canvas>
	</view>
</template>

<script>
import uCharts from '../u-charts/u-charts.min.js'

let _self
let canvasObj = {} // 图表实例集合
let lastMoveTime = null //最后执行移动的时间戳
export default {
	props: {
		width: {
			type: Number,
			default: null
		},
		height: {
			type: Number,
			default: null
		},
		chartData: {
			type: Object,
			default: () => ({})
		},
		chartId: {
			type: String,
			default: ''
		},
		options: {
			type: Object,
			default: _ => ({
				area: {},
				legend: {}
			})
		}
	},
	data() {
		return {
			// canvas 尺寸
			cWidth: '',
			cHeight: '',
			max: 0
		}
	},
	
	watch: {
		chartData: {
			handler: function(v) {
				_self = this
				this.cWidth = uni.upx2px(this.width)
				this.cHeight = uni.upx2px(this.height)
				this.$nextTick(function() {
					this.addYLine(4)
					Object.keys(v).length && this.drawChartArea(this.chartId, v)
				})
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		// 根据最大值和平均值，Y 轴增加一条线
		addYLine(number) {
			const data = this.chartData.series
			if (!data) return
			let max = 0,
				arr = [],
				avg,
				ret

			data.forEach(item => (arr = [...arr, ...item.data]))

			max = Math.max(...arr)
			avg = arr.reduce((acc, val) => acc + val, 0) / arr.length
			ret = max + Math.floor(avg / number)

			this.max = ret
		},

		touchStart(e, id) {
			lastMoveTime = Date.now()
		},
		touchMove(e, id) {
			// 控制帧率
			let currMoveTime = Date.now()
			let duration = currMoveTime - lastMoveTime
			if (duration < Math.floor(1000 / 60)) return //每秒60帧
			lastMoveTime = currMoveTime
			let currIndex = canvasObj[id].getCurrentDataIndex(e)
			// 保证滑动在 x 轴有数据的范围内
			if (currIndex > -1 && currIndex < canvasObj[id].opts.categories.length) {
				let riqi = canvasObj[id].opts.categories[currIndex]
				let leibie = canvasObj[id].opts.series[0].name
				let shuju = canvasObj[id].opts.series[0].data[currIndex]
			}
			canvasObj[id].showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data
				}
			})
		},
		touchEnd(e, id) {
			let currIndex = canvasObj[id].getCurrentDataIndex(e)
			if (currIndex > -1 && currIndex < canvasObj[id].opts.categories.length) {
				let riqi = canvasObj[id].opts.categories[currIndex]
				let leibie = canvasObj[id].opts.series[0].name
				let shuju = canvasObj[id].opts.series[0].data[currIndex]
			}
			canvasObj[id].touchLegend(e)
			canvasObj[id].showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data
				}
			})
		},
		// 绘制图标
		drawChartArea: (cvsId, chartData) => {
			canvasObj[cvsId] = new uCharts({
				$this: _self,
				canvasId: cvsId, // canvas 绘制区域
				// [pie、line、column、area、ring、radar、arcbar、gauge、candle、bar、mix、rose、word]
				type: 'area', // 图表类型
				fontSize: 11, // 字体大小
				dataLabel: false, // 显示数据文本值
				dataPointShape: true, // 显示数据点图形标识
				dataPointShapeType: 'hollow', // 数据点类型 [solid 实心, hollow 空心]
				background: '#FFFFFF', // 背景色
				colors: ['#1C8BE4'], // 色系，跟类别对应
				pixelRatio: 1, // 像素比 [支付宝 >1 | 其他都是1]
				rotate: false, // 是否横屏
				padding: [5, 18, 10, 15], // 内边距
				enableMarkLine: false, // 是否开启辅助线
				animation: true, // 开启动画
				width: _self.cWidth, // 渲染图表必须和 canvas 的长宽一致
				height: _self.cHeight, // 需要调用 uni.upx2px 适配像素比
				// ...chartData, // [categories 类别, series 数据]
				categories: chartData.categories,
				series: chartData.series,
				// 图例设置
				legend: {
					show: true,
					float: 'center',
					itemGap: 10,
					..._self.options.legend
				},
				// X 轴
				xAxis: {
					disableGrid: true, // 隐藏网格线
					type: 'grid', // 网格类型, 基本上是固定的
					gridColor: '#CCCCCC', // 网格颜色
					gridType: 'dash', // 网格线类型 [dash 虚线 | solid 实线]
					dashLength: 8, // 虚线时，间隔 px
					boundaryGap: 'justify', //两端不留白配置
					axisLineColor: '#ddd', // 轴线颜色
					fontColor: '#999999',
					calibration: true // 刻度线
					// labelCount: 7 ,// X轴最多显示的刻度， 不写就是给几个显示几个
					// axisLine: false,
				},
				// Y 轴
				yAxis: {
					// disabled: false,
					disableGrid: false,
					gridType: 'solid',
					gridColor: '#f5f5f5',
					fontColor: '#999999',
					splitNumber: 4,
					data: [
						{
							axisLine: false,
							format: val => val.toFixed(0),
							max: _self.max
						}
					]
				},
				extra: {
					area: {
						type: 'straight', // [curve 曲线 | straight 直线]
						opacity: 0.1, // 色块透明度
						addLine: true, // 值之间的连线
						width: 2, // 线宽度
						gradient: false, // 渐变色
						..._self.options.area
					},
					// 显示某个数据点内容框，有样式定制需求才配置，一般默认就有
					tooltip: {
						bgColor: '#1C8BE4',
						bgOpacity: 0.8,
						gridColor: '#1C8BE4',
						horizentalLine: false, // BUG 水平横线， 打开有问题，图标会变形跳动
						// 数据标签和样式
						xAxisLabel: true,
						yAxisLabel: true,
						labelFontColor: '#ffffff',
						labelBgColor: '#1C8BE4',
						labelBgOpacity: 1 // 数据标签透明度
					}
				}
			})
		},
		// 数据更新
		updateData(id, data) {
			canvasObj[id].updateData({
				series: data.series,
				categories: data.categories
			})
		}
	}
}
</script>

<style></style>
