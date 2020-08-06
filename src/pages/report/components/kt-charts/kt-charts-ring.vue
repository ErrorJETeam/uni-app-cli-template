<template>
	<view class="kt-charts-ring">
		<canvas
			:canvas-id="chartId"
			:id="chartId"
			:style="{ width: `${cWidth}px`, height: `${cHeight}px` }"
			@touchstart="touchRing($event, chartId)"
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
		title: {
			type: String,
			default: null
		},
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
		chartRingRate: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			// canvas 尺寸
			cWidth: '',
			cHeight: ''
		}
	},
	watch: {
		chartData: {
			handler: function(v) {
				this.$nextTick(function() {
					Object.keys(v).length && this.showRing(this.chartId, v)
				})
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		_self = this

		// px 转换
		this.cWidth = uni.upx2px(this.width)
		this.cHeight = uni.upx2px(this.height)
	},
	methods: {
		showRing(cvsId, chartData) {
			canvasObj[cvsId] = new uCharts({
				$this: _self,
				canvasId: cvsId,
				type: 'ring',
				fontSize: 11,
				padding: [0, 0, 0, 0],
				legend: {
					show: false
				},
				colors: ['#EF8900', '#D8D8D8'],
				background: '#FFFFFF',
				pixelRatio: 1,
				series: chartData.series,
				animation: true,
				width: _self.cWidth,
				height: _self.cHeight,
				disablePieStroke: true,
				dataLabel: true,
				title: {
					name: this.title,
					color: '#49B523',
					fontSize: 11
				},
				subtitle: {
					name: `${this.chartRingRate}%`,
					color: '#49B523',
					fontSize: 20
				},
				extra: {
					pie: {
						offsetAngle: 0,
						ringWidth: 30,
						labelWidth: 12
					}
				}
			})
		},
		touchRing(e, id) {
			canvasObj[id].touchLegend(e, {
				animation: false
			})
			canvasObj[id].showToolTip(e, {
				format: function(item) {
					return `${item.name}:${item.data}`
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
