<template>
	<view class="content page-height">
		<view class="progress">
			<view class="progress-item">
				<view class="line"></view>
				<view class="top">
					<view class="dot-wrap">
						<image src="/static/images/dot-icon.png"> </image>
						<view class="fill-bg"></view>
						<!-- <view class="dot"></view> -->
					</view>
					<view class="title">你哦安抚</view>
				</view>
				<view class="bottom">
					<view class="context"> 打发发是的</view>
					<view class="time">1890-09-09 </view>
				</view>
			</view>
			<view class="progress-item">
				<!-- <view class="line"></view> -->
				<view class="top">
					<view class="dot-wrap">
						<!-- <image src="/static/images/dot-icon.png"> </image> -->
						<view class="dot"></view>
					</view>
					<view class="title">你哦安抚</view>
				</view>
				<view class="bottom">
					<view class="context"> 打发发是的</view>
					<view class="time">1890-09-09 </view>
				</view>
			</view>
		</view>
		<view class="info-wrap">
			<view class="info-money">
				<view>退款金额</view>
				<view>￥9090</view>
			</view>
			<view>
				<view>退款创建时间</view>
				<view>9090</view>
			</view>
			<view>
				<view>退款入账账户</view>
				<view>9090</view>
			</view>
			<view>
				<view>退款成功时间</view>
				<view>9090</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
		};
	},
	onLoad(data) {},
	onReady() {},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	min-height: 100vh;
	background: #fff;
}
.progress {
	.progress-item {
		margin-top: 90rpx;
		position: relative;
		.line {
			width: 2rpx;
			height: calc(100% + 90rpx);
			background: #d7d7d7;
			position: absolute;
			top: 20rpx;
			left: 25rpx;
		}
		.top {
			display: flex;
			.dot-wrap {
				width: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				border-radius: 50%;

				.dot {
					width: 12rpx;
					height: 12rpx;
					background: #d7d7d7;
					position: absolute;
					border-radius: 50%;
					z-index: 99;
				}
				image {
					width: 26rpx;
					height: 26rpx;
					position: absolute;
					z-index: 99;
				}
				.fill-bg {
					width: 24rpx;
					height: 24rpx;
					background: #fff;
					position: absolute;
					border-radius: 50%;
					z-index: 98;
				}
			}
			.title {
				font-size: 30rpx;
				color: #333;
				font-weight: bold;
			}
		}
		.bottom {
			padding-left: 50rpx;
			font-size: 28rpx;
			color: #999;
		}
	}
	.progress-item:nth-child(1) {
		margin-top: 0;
	}
}
.info-wrap {
	background: #f7f6f6;
	border-radius: 10rpx;
	padding: 20rpx 30rpx;
	margin-top: 90rpx;
	> view {
		display: flex;
		color: #999;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	> view:nth-child(1) {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}
}
</style>
