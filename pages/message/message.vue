<template>
	<view>
		<!-- tab 切换 -->
		<view class="topbar">
			<scroll-view class="scroll-view" scroll-x :show-scrollbar="false">
				<view class="rel">
					<view class="item" v-for="(item, index) in navList" :class="{ active: curNav == item.id }" :key="index" @click="switchNav(item.id, index)">
						<view class="desc">{{ item.name }}</view>
					</view>
					<view class="slide" :style="'width: ' + sliderWidth + 'rpx;transform: translateX(' + sliderOffset + 'rpx)'"></view>
				</view>
			</scroll-view>
		</view>
		<!-- 长列表 -->
		<mescroll-uni ref="mescroll" :top="mescrollTop" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="initCallback">
			<view class="video-list">
				<view class="video-item" v-for="(item, index) in dataList" :key="index">
					<view class="video-wrap">
						<image class="img" :src="item.coverUrl + $imgSuffix"></image>
						<view class="desc ellipsis">{{ item.title }}</view>
						<view class="creater-bar flex-box">
							<view class="avactor-box flex-box">
								<image class="avactor" src=""></image>
								<view class="name">{{ item.creator[0].userName }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import { mockLongList, mockTabsList } from '@/apis/mockData.js';

export default {
	data() {
		return {
			curNav: '',
			sliderOffset: 0,
			sliderWidth: 60,
			navList: mockTabsList,
			dataList: [], // 长列表数据

			mescrollTop: 100, // 满足app高度
			// 下拉刷新的常用配置
			downOption: {
				auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
			},
			// 上拉加载的常用配置
			upOption: {
				auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				}
			}
		};
	},
	onLoad() {
		this.switchNav(34654, 0);
	},
	methods: {
		// 导航切换
		switchNav(id, index) {
			this.curNav = id;
			this.sliderWidth = index == 1 ? 140 : 60; // 特例宽度，要跟 tab 的文字宽度相等

			this.sliderOffset = 126 * index + (index > 1 ? 80 : 16) + (index == 0 && 16);

			this.getList(1, 1, res => {
				this.dataList = res;
			});
		},
		// 接口：获取相关视频
		getList(pageNum, pageSize, successCallback, errorCallback) {
			const params = {
				id: this.curNav,
				pageNum,
				pageSize
			};
			// TODO 接口请求数据
			if (mockLongList) {
				successCallback && successCallback(mockLongList);
			} else {
				errorCallback && errorCallback();
			}
		},
		// 初始化回调
		initCallback(mescroll) {
			this.getList(1, 1, res => {
				this.dataList = res;
			});
		},
		/*下拉刷新的回调， 返回 mescroll 实例 */
		downCallback(mescroll) {
			// 1 下拉刷新是有样式显示的，请求成功后，设置分页数据，并且手动关闭不同状态的 loading 效果 mescroll.endSuccess(); | mescroll.endErr();
			// 2 重置为第一页 (自动执行 page.num=1, 再触发 upCallback 加载方法 ) mescroll.resetUpScroll()
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
		upCallback(mescroll) {
			//联网加载数据
			this.getList(
				mescroll.num,
				mescroll.size,
				res => {
					//设置列表数据
					if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(res);

					// 后台接口有返回列表的总数据量 totalSize
					// mescroll.endBySize(10, 50); //必传参数(当前页的数据个数, 总数据量)
					mescroll.endSuccess();
				},
				() => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				}
			);
		}
	}
};
</script>

<style lang="scss">
.flex-box {
	display: flex;
	.flex-item {
		flex: 1;
	}
}

.scroll-view {
	position: fixed;
	width: 100%;
	height: 86rpx;
	white-space: nowrap;
	text-align: center;
	line-height: 86rpx;
	color: #333;
	font-weight: 600;
	border-bottom: 1rpx solid #e6e6e6;
	z-index: 10;
	background: #fff;

	.item {
		position: relative;
		display: inline-block;
		min-width: 126rpx;
		height: 86rpx;
		line-height: 86rpx;
		padding: 0 20rpx;
		&.active {
			color: #f32628;
		}
	}
}

.slide {
	position: absolute;
	width: 60rpx;
	height: 4rpx;
	left: 0;
	bottom: 0rpx;
	background: #f32628;
	transition: transform 0.3s;
	z-index: 2;
	/* #ifdef MP-WEIXIN */
	bottom: 2rpx;
	/* #endif */
}

.video-list {
	color: #333;
	background: #f8f8f8;
	.tit-bar {
		padding-left: 32rpx;
	}
	.video-item {
		padding-top: 32rpx;
		background: #fff;
		border-bottom: 24rpx solid #f8f8f8;
	}

	.video-wrap {
		width: 686rpx;
		margin: 0 auto;
	}

	.img {
		display: block;
		width: 686rpx;
		height: 390rpx;
		border-radius: 10rpx;
		background: #eee;
	}

	.desc {
		font-size: 30rpx;
		font-weight: 600;
		line-height: 84rpx;
		border-bottom: 1rpx solid #e6e6e6;
	}
}

.creater-bar {
	height: 100rpx;
	justify-content: space-between;
	align-items: center;
	.avactor-box {
		align-items: center;
	}
	.avactor {
		width: 66rpx;
		height: 66rpx;
		margin-right: 10rpx;
		border-radius: 66rpx;
		background: #eee;
	}

	.name {
		line-height: 100rpx;
	}
}
</style>
