<template>
	<view class="kt-container">
		<!-- 导航 -->
		<view class="banner">
			<view class="date-show kt-flex__r--xy">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
					<view class="date-text">
						{{ date }}
						<em class="kt-triangle"></em>
					</view>
				</picker>
			</view>
			<view class="tabs kt-flex__r--xy">
				<view class="tab" @tap="switchTab(1)">
					<p>在线问诊</p>
					<p class="man-times">{{ askReqNum }}</p>
				</view>
				<view class="tab afterline" @tap="switchTab(2)">
					<p>在线复诊</p>
					<p class="man-times">{{ continueReqNum }}</p>
				</view>
				<view class="tab" @tap="switchTab(3)">
					<p>网络诊室</p>
					<p class="man-times">{{ '-' }}</p>
				</view>
			</view>
		</view>
		<view :style="{ left: leftPer }" class="kt-triangle-container"><em class="triangle up"></em></view>

		<view class="charts-container">
			<!-- 在线问诊 -->
			<view class="inquriy">
				<view class="title kt-flex__r--xy">
					<image :src="imgs.ask" style="width: 40rpx;height: 40rpx;" mode=""></image>
					<view class="kt-font-title" style="margin-left: 10rpx;">{{ currentInquiry }}</view>
					<view style="flex:1;"></view>
					<view class="kt-font-tip">日均接诊量 {{ showData.dayNum || '<1' }}</view>
				</view>
				<view class="inquiry-chart"><kt-charts-area :width="735" :height="360" chart-id="chart-area" :chart-data="chartData"></kt-charts-area></view>
			</view>

			<!-- 统计数据 -->
			<view class="statistical">
				<view class="tabs kt-flex__r--xy">
					<view class="tab">
						<p>总预约量</p>
						<p class="man-times">{{ showData.allNum }}</p>
					</view>
					<view class="tab afterline">
						<p>接诊量</p>
						<p class="man-times">{{ showData.validNum}}</p>
					</view>
					<view class="tab">
						<p>取消量</p>
						<p class="man-times">{{ showData.cancalNum }}</p>
					</view>
				</view>
				<view class="charts">
					<kt-charts-ring
						:width="700"
						:height="400"
						chart-id="chart-ring"
						:chart-data="chartRing"
						:chart-ring-rate="chartRingRate"
						title="接诊率"
					></kt-charts-ring>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getEmpMobileOisReqData, getEmpMobileOisReqDataByDay } from '@/apis/modules/report.js'
import ktChartsArea from './components/kt-charts/kt-charts-area.vue'
import ktChartsRing from './components/kt-charts/kt-charts-ring.vue'
import { formatChartArea, formatChartRing } from './reportFormat.js'

export default {
	components: {
		ktChartsArea,
		ktChartsRing
	},
	data() {
		const currentDate = this.getDate()
		return {
			imgs: this.$staticImage,
			date: currentDate,
			leftPer: '12%', // 三角形位移
			currentInquiry: '在线问诊',
			businessType: 1, // 业务类型

			// canvas 尺寸
			chartData: {}, // 数据
			chartRingRate: null, // 接诊率
			chartRing: {},

			// 接口数据
			showData: {
				num: 0,
				validNum: 0,
				vaildRate: 0,
				cancalNum: 0,
				allNum: 0,
				dayNum: 0
			},
			baseData: {},
			askReqNum: 0,
			continueReqNum: 0
		}
	},
	computed: {
		startDate() {
			return this.getDate('start')
		},
		endDate() {
			return this.getDate('end')
		}
	},
	async mounted() {
		await this.getBaseData()
	},
	methods: {
		// 基础数据
		async getBaseData() {
			const params = {
				startTime: this.date
			}
				
			const baseData = await getEmpMobileOisReqData(params)
			this.baseData = baseData
			this.askReqNum = baseData.askReqData.askReqNum
			this.continueReqNum = baseData.continueReqData.continueReqNum
			
			this.switchTab(1)
		},
		
		// 基础数据显示
		showDataByType() {
			const baseData = this.baseData
			switch (this.businessType) {
				case 1:
					this.showData = {
						num: baseData.askReqData.askReqNum,
						validNum: baseData.askReqData.askReqVaildNum,
						vaildRate: baseData.askReqData.askReqVaildRate,
						cancalNum: baseData.askReqData.askReqCancalNum,
						allNum: baseData.askReqData.askReqAllNum,
						dayNum: baseData.askReqData.askReqDayNum
					}
					break
				case 2:
					this.showData = {
						num: baseData.continueReqData.continueReqNum,
						validNum: baseData.continueReqData.continueReqVaildNum,
						vaildRate: baseData.continueReqData.continueReqVaildRate,
						cancalNum: baseData.continueReqData.continueReqCancalNum,
						allNum: baseData.continueReqData.continueReqAllNum,
						dayNum: baseData.continueReqData.continueReqDayNum
					}
					break
				case 3:
					this.showData = {
						num: 0,
						validNum: 0,
						vaildRate: 0,
						cancalNum: 0,
						allNum: 0,
						dayNum: 0
					}
					break
				default:
				 break
			}
			
			this.getCharData()
		},
		
		// 图表数据
		async getCharData() {
			const params = {
				startTime: this.date,
				businessType: this.businessType
			}
			
			// 圆环图数据
			this.chartRingRate = this.showData.vaildRate
			this.chartRing = formatChartRing(this.showData)
			// 折线图数据
			this.chartData = formatChartArea(await getEmpMobileOisReqDataByDay(params))
		},

		// tab 切换数据
		switchTab(ord) {
			// 三角形位移
			switch (ord) {
				case 1:
					this.leftPer = '12%'
					this.currentInquiry = '在线问诊'
					this.businessType = 1
					this.showDataByType()
					break
				case 2:
					this.leftPer = '46%'
					this.currentInquiry = '在线复诊'
					this.businessType = 2
					this.showDataByType()
					break
				case 3:
					// TODO 暂时没写
					break
					this.leftPer = '79.5%'
					this.currentInquiry = '网络诊室'
					this.businessType = 3
					this.showDataByType()
				default:
					break
			}
		},

		// 时间控件
		bindDateChange: function(e) {
			this.date = e.target.value
			this.getBaseData()
		},
		getDate(type) {
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1

			if (type === 'start') {
				year = year - 60
			} else if (type === 'end') {
				year = year + 2
			}
			month = month > 9 ? month : '0' + month
			return `${year}-${month}`
		}
	}
}
</script>

<style lang="scss" scoped>
.afterline {
	&::after {
		background-color: #dddddd;
	}
	&::before {
		background-color: #dddddd;
	}
}
.banner {
	height: 300rpx;
	background-color: #1c8be4;
	color: #ffffff;
	.date-show {
		height: 120rpx;
		justify-content: center;
		uni-view {
			width: 300rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			text-align: center;
			border: 2rpx solid #ffffff;
		}
		.date-text {
			display: flex;
			justify-content: center;
		}
	}
}

.tabs {
	padding-top: 30rpx;
	width: 750rpx;
	.tab {
		width: 250rpx;
		text-align: center;
		font-weight: bold;
		.man-times {
			font-size: 40rpx;
		}
	}
}

.charts-container {
	padding: 20rpx 0 0;
	height: calc(100% - 300rpx);
	overflow: scroll;

	.inquriy {
		height: 450rpx;
		background-color: #ffffff;
		border-bottom: 9rpx dotted #f5f5f5;
		.title {
			padding: 35rpx 30rpx 0;
		}
		.inquiry-chart {
			background-color: #ffffff;
			height: calc(100% - 90rpx);
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
</style>
