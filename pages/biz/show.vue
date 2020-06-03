<template>
	<view class="">
		<!-- 1 colorui 测试 -->
		<view class="">colorUi 测试</view>
		<view class="grid col-5 padding-sm">
			<view class="margin-tb-sm text-center" v-for="(item, index) in ColorList" :key="index">
				<button class="cu-btn round" :class="['bg-' + item.name, shadow ? 'shadow' : '']">{{ item.title }}</button>
			</view>
		</view>

		<!-- 2 uni-ui -->
		<uni-title type="h1" title="uni-ui-title h1 测试"></uni-title>

		<!-- 3 ucharts 测试（可能要特别注意支付宝小程序的编译条件） -->
		<view class="qiun-padding" style="font-size: 32rpx;">
			<text>{{ tips }}</text>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">圆弧进度图</view></view>
		<view class="qiun-charts3"><canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts3" style="margin-left: 250rpx;"></canvas></view>
	</view>
</template>

<script>
import uCharts from 'vendor/u-charts/u-charts.js'
import uniTitle from "@/components/uni-title/uni-title.vue"

import { mockColorList, mockChartsConfig } from '@/apis/mockData.js' // mockData 本地
import CONST from '@/common/config/constant.js' // 引入全局配置

var _self

export default {
	components: { uniTitle },
	data() {
		return {
			shadow: false,
			// colorui 测试 data
			ColorList: mockColorList,

			// ucharts 测试圆弧进度图 data
			arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
			pixelRatio: CONST['pixelRatio'], // 像素倍率
			cWidth3: '', //圆弧进度图
			cHeight3: '', //圆弧进度图
			tips: ''
		}
	},
	onLoad(r) {
		console.log('List 页面 onLoad 接受传参 >>>', r, this.$Route)

		// ucharts
		_self = this
		this.cWidth3 = uni.upx2px(250)
		this.cHeight3 = uni.upx2px(250)
		this.arcbarWidth = uni.upx2px(24)
	},
	onReady() {
		this.getServerData()
	},
	methods: {
		// ucharts 配置数据获取
		getServerData() {
			uni.showLoading({
				title: '正在加载数据...'
			})
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
				data: {},
				success: function(res) {
					// 如接口报错，则用本地的 mock 数据
					_self.fillData(res.data || mockChartsConfig)
					_self.tips = 'charts 配置获取成功'
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名'
				},
				complete() {
					uni.hideLoading()
				}
			})
		},
		// ucharts 数据填充
		fillData(data) {
			this.serverData = data
			this.tips = data.tips

			let Arcbar2 = {
				series: []
			}

			Arcbar2.series = data.Arcbar2.series

			this.showArcbar2('canvasArcbar2', Arcbar2)
		},
		// ucharts 绘制
		showArcbar2(canvasId, chartData) {
			new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'arcbar',
				fontSize: 11,
				title: {
					name: Math.round(chartData.series[0].data * 100) + '%',
					color: chartData.series[0].color,
					fontSize: 25 * _self.pixelRatio
				},
				subtitle: {
					name: chartData.series[0].name,
					color: '#666666',
					fontSize: 15 * _self.pixelRatio
				},
				extra: {
					arcbar: {
						type: 'default',
						width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						backgroundColor: '#ffe3e8',
						startAngle: 1.25,
						endAngle: 0.75
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: false,
				width: _self.cWidth3 * _self.pixelRatio,
				height: _self.cHeight3 * _self.pixelRatio,
				dataLabel: true
			})
		}
	}
}
</script>

<style>
/* 引入 charts 自定义样式 */
@import '../../common/css/charts.css';
page {
	background: #f2f2f2;
	width: 750rpx;
	overflow-x: hidden;
}
</style>
