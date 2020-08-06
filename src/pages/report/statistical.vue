<template>
	<view class="kt-container">
		<!-- 导航 -->
		<view class="banner">
			<text class="text">{{ curWeek }}</text>
		</view>

		<view class="charts-container">
			<!-- 在线问诊 -->
			<view class="inquriy">
				<view class="inquiry-chart">
					<kt-charts-area
						:width="735"
						:height="410"
						chart-id="chart-area"
						:chart-data="chartData"
						:options="{ area: { type: 'curve', opacity: 0 }, legend: { show: true, padding: 10 } }"
					></kt-charts-area>
				</view>
			</view>
		</view>
		<view class="bis-title">业务数据统计</view>

		<!-- 分段器 tabs -->
		<uni-segmented-control
			:current="current"
			:values="items"
			@clickItem="onClickItem"
			style-type="text"
			active-color="#1C8BE4"
			class="segmented"
		></uni-segmented-control>

		<!-- 日期选择 -->
		<view class="title" v-if="current === 3" @tap="onShowDatePicker">
			<view class="date-text">
				<text class="title-text">{{ valuePicker[0] }}</text>
				<image
					style="margin-left: 28rpx;width: 23rpx; height: 15rpx; line-height: 80rpx;"
					src="img/single-down.png"
					mode="aspectFit"
				></image>
			</view>
			<view class="">-</view>
			<view class="date-text">
				<text class="title-text">{{ valuePicker[1] }}</text>
				<image
					style="margin-left: 28rpx;width: 23rpx; height: 15rpx; line-height: 80rpx;"
					src="img/single-down.png"
					mode="aspectFit"
				></image>
			</view>
		</view>

		<view class="biz-continer">
			<!-- 宫格 -->
			<view class="cu-list grid col-3" style="width: 100%;">
				<view
					class="cu-item"
					:class="{ pick: pick && index === 1 }"
					v-for="(item, index) in BIZ.slice(0, 3)"
					:key="item.name"
					style="align-items: center;"
					@tap="onDetail(item.name)"
				>
					<image :src="item.img" mode="aspectFit" style="width: 50rpx;height: 50rpx;"></image>
					<text>{{ item.name }}</text>
					<text>{{ item.num }}</text>
					<view v-if="index === 1" class="triangle" :class="{ rotate: !pick }">▲</view>
				</view>
			</view>

			<!-- 详细信息 -->
			<view v-if="pick" class="kt-flex slice" style="flex-basis: 100%;">
				<view class="slice-item">
					<text class="text-a">医保复诊诊疗人次</text>
					<text class="text-b">{{ `&emsp;` + bizDetail.yb }}</text>
				</view>
				<view class="slice-item">
					<text class="text-a">自费复诊诊疗人次</text>
					<text class="text-b">{{ `&emsp;` + bizDetail.fyb }}</text>
				</view>
			</view>

			<view class="cu-list grid col-3" style="width: 100%;margin-top: 0;">
				<view class="cu-item" v-for="(item, index) in BIZ.slice(3)" :key="item.name" style="align-items: center;">
					<image :src="item.img" mode="aspectFit" style="width: 50rpx;height: 50rpx;"></image>
					<text>{{ item.name }}</text>
					<text>{{ item.num }}</text>
				</view>
			</view>
		</view>

		<!-- 时间选择器插件 -->
		<mx-date-picker
			:show="showPicker"
			:type="type"
			:value="valuePicker"
			:show-tips="true"
			:begin-text="'统计开始'"
			:end-text="'统计结束'"
			:show-seconds="true"
			@confirm="onSelected"
			@cancel="onSelected"
		/>
	</view>
</template>

<script>
import ktChartsArea from './components/kt-charts/kt-charts-area.vue'
import MxDatePicker from './components/mx-datepicker/mx-datepicker.vue'
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
import { fetchDataOfDay, fetchDataOfWeek } from '@/apis/modules/report.js'
import {chartData} from '@/apis/mockData.js'

export default {
	components: {
		ktChartsArea,
		MxDatePicker,
		uniSegmentedControl
	},
	// filters: {
	// 	timePlaceholder: function(value) {
	// 		return value.replace(/-/g, '/')
	// 	},
	// 	priceFilter: function(v) {
	// 		return (v + '').toFixed(2)
	// 	}
	// },
	data() {
		return {
			swiperIdx: 0,
			BIZ: [
				{ name: '在线咨询人次', img: 'img/rpt-1.png', num: null, price: false },
				{ name: '复诊诊疗人次', img: 'img/rpt-2.png', num: null, price: false },
				{ name: '电子处方张数', img: 'img/rpt-3.png', num: null, price: false },
				{ name: '诊疗费', img: 'img/rpt-4.png', num: null, price: true },
				{ name: '药品费', img: 'img/rpt-5.png', num: null, price: true },
				{ name: '在线医生数', img: 'img/rpt-6.png', num: null, price: false }
			],
			// 复诊人次详细
			pick: false,
			bizDetail: {
				yb: null,
				fyb: null
			},

			// canvas 尺寸
			chartData: chartData, // 数据
			time: {
				startTime: null,
				endTime: null
			},

			// 时间选择器
			showPicker: false,
			valuePicker: [],
			type: 'range',

			// 分段器
			items: ['今日', '昨日', '近7日', '自定义'],
			current: 0
		}
	},
	computed: {
		curWeek() {
			const { startTime: start, endTime: end } = this.time
			return `${this.$moment(start).format('MM/DD')} - ${this.$moment(end).format('MM/DD')}`
		}
	},
	async mounted() {
		// 最近一周
		const startTime = this.$moment(new Date())
			.subtract(6, 'd')
			.format('YYYY-MM-DD')
		const endTime = this.$moment(new Date()).format('YYYY-MM-DD')
		this.time = {
			startTime,
			endTime
		}

		// 默认当日
		this.valuePicker = [endTime, endTime]

		// await this.getDataOfDay([new Date(), new Date()])
		// await this.getCharData()
	},

	methods: {
		// 诊疗人次详细数据
		onDetail(name) {
			if (name !== '复诊诊疗人次') return
			this.pick = !this.pick
		},

		// 分段器
		onClickItem(e) {
			const idx = e.currentIndex
			if (this.current === idx) return
			this.current = idx
			if (idx === 3) return

			let startTime
			let endTime

			switch (idx) {
				case 0: // 今日
					startTime = new Date()
					endTime = startTime
					break
				case 1: // 昨天
					startTime = this.$moment(new Date()).subtract(1, 'd')
					endTime = startTime
					break
				case 2: // 近 7 天
					startTime = this.$moment(new Date()).subtract(6, 'd')
					endTime = new Date()
					break
			}

			const range = [startTime, endTime]

			this.valuePicker = [this.$moment(startTime).format('YYYY/MM/DD'), this.$moment(endTime).format('YYYY/MM/DD')]

			this.getDataOfDay(range)
		},
		// 时间选择器显示
		onShowDatePicker() {
			this.showPicker = true
		},
		// 时间选择
		onSelected(e) {
			this.showPicker = false
			if (e) {
				this.valuePicker = e.value
				this.getDataOfDay(e.date)
			}
		},

		// 范围时间内的业务数据
		async getDataOfDay(range) {
			uni.showLoading({
				title: '加载中'
			})
			// HACK 后端要求结束日期 + 1 天
			const params = {
				startTime: this.$moment(range[0]).format('YYYY-MM-DD'),
				endTime: this.$moment(range[1])
					.add(1, 'd')
					.format('YYYY-MM-DD')
			}
			const { data: dayData } = await fetchDataOfDay(params)

			uni.hideLoading()

			// 业务数据展示
			this.BIZ.map((item, idx) => {
				let num = 0
				switch (idx) {
					case 0: // 当日咨询
						num = dayData.DRZXL
						break
					case 1: // 诊疗人次
						this.bizDetail = {
							yb: dayData.DRWZLYB,
							fyb: dayData.DRWZLFYB
						}
						num = dayData.DRWZLYB * 1 + dayData.DRWZLFYB * 1
						break
					case 2: // 电子处方数
						num = dayData.DRZXCFL
						break
					case 3: // 诊疗费
						num = dayData.DRZXZLZSR && (dayData.DRZXZLZSR*1).toFixed(2)
						break
					case 4: // 药品费
						num = dayData.DRZXZLYPSR && (dayData.DRZXZLYPSR * 1).toFixed(2)
						break
					case 5: // 在线医生数
						num = dayData.ZXYSS
						break
				}

				return Object.assign(item, {
					...item,
					num: num + '' || '-'
				})
			})
		},

		// 最近一周的图表数据
		async getCharData() {
			const params = {
				startTime: this.time.startTime,
				endTime: this.$moment(this.time.endTime)
					.add(1, 'd')
					.format('YYYY-MM-DD')
			}

			// 接口数据
			const { data: WeekData } = await fetchDataOfWeek(params)

			// 图表数据
			this.chartData = this.singleFormat(WeekData)
		},

		// 数据格式化
		singleFormat(oriData) {
			const chartData = {
				categories: [],
				series: []
			}

			const fyb = oriData.QJWZLFYB.length ? oriData.QJWZLFYB.map(i => i.NUM) : [],
				yb = oriData.QJWZLYB.length ? oriData.QJWZLYB.map(i => i.NUM) : [],
				zx = oriData.QJZXL.length ? oriData.QJZXL.map(i => i.NUM) : []

			const iqr = {
				name: '复诊咨询人次',
				data: zx,
				color: '#1C8BE4',
				legendShape: 'circle'
			}

			const fee = {
				data: fyb
					? fyb.map((i, idx) => {
							return i * 1 + yb[idx] * 1
					  })
					: [],
				name: '复诊诊疗人次',
				color: '#F89939',
				legendShape: 'circle'
			}

			let categories = oriData['QJZXL'] // HACK 随便取一个字段长度

			// .replace(/\-/g,"/")
			chartData.categories = categories.map(item => this.$moment(new Date(item['CREATE_TIME'].replace(/\-/g, '/'))).format('MM/DD'))
			chartData.series.push(iqr)
			chartData.series.push(fee)

			return chartData
		}
	}
}
</script>

<style lang="scss" scoped>
.pick {
	background-color: #e8f3fc;
}
.slice {
	background-color: #e8f3fc;
	padding: 20rpx 20rpx;
	justify-content: space-evenly;
	&-item {
		color: #333333;
		.text-a {
			font-size: 24rpx;
		}
		.text-b {
			font-size: 27rpx;
			font-weight: bold;
		}
	}
}
.segmented {
	background-color: #ffffff;
	height: 70rpx;
	border-bottom: 1rpx solid #dddddd;
	::v-deep span {
		font-size: 24rpx;
		color: #666666;
	}
}

.bis-title {
	margin-top: 10rpx;
	padding: 0 27rpx;
	font-size: 27rpx;
	border-bottom: 1rpx solid #dddddd;
	color: #333333;
	font-weight: bold;
	background-color: #ffffff;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
}

.afterline {
	&::after {
		background-color: #dddddd;
	}
	&::before {
		background-color: #dddddd;
	}
}
.banner {
	height: 100rpx;
	background-color: #ffffff;
	text-align: center;
	.text {
		line-height: 100rpx;
		color: #2b354a;
		font-size: 27rpx;
		font-weight: bold;
	}
}

.charts-container {
	padding: 5rpx 0 0;
	overflow: scroll;

	.inquriy {
		min-height: 420rpx;
		padding-top: 10rpx;
		background-color: #ffffff;
		border-bottom: 9rpx dotted #f5f5f5;
		.title {
			padding: 35rpx 30rpx 0;
		}
		.inquiry-chart {
			background-color: #ffffff;
			display: flex;
			justify-content: center;
		}
	}
	.statistical {
		background-color: #ffffff;
		min-height: 550rpx;
		.charts {
			padding: 0 25rpx 0;
			display: flex;
			justify-content: center;
		}
	}
}

.title {
	padding: 20rpx 25rpx;
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: #ffffff;
	justify-content: space-between;
	&-text {
		font-size: 27rpx;
		font-weight: bold;
	}
	.date-text {
		align-items: center;
		display: flex;
	}
}

.biz-continer {
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	margin-top: 10rpx;

	.triangle {
		position: absolute;
		top: 20rpx;
		right: 25rpx;
		color: #f89939;
		transform: scaleY(0.7);
		&.rotate {
			transform: scaleY(0.7) rotate(0.5turn);
		}
	}

	::v-deep .cu-item {
		padding: 30rpx 0 !important;
		uni-text:nth-child(2) > span {
			font-size: 24rpx;
			color: #333333;
		}
		uni-text:nth-child(3) {
			margin-top: 25rpx;
			> span {
				font-size: 36rpx;
				color: #1c8be4;
			}
		}
	}
}
</style>
