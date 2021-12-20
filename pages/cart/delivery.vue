<template>
	<view class="content page-height">
		<view class="delivery-list">
			<view class="delivery-item flex">
				<!-- <view class="item-left padding-top column flex-start-center">
					<view class="dot-icon" style="background: #999"></view>
					<view class="line" style="top: 5rpx"></view>
				</view> -->
				<view class="item-right column">
					<view>运单号：{{ info.expressNo }}</view>
					<text class="info">收货地址：{{ addr }}</text>
				</view>
			</view>

			<block v-for="(item, index) in info.expressTrace" :key="index">
				<view class="delivery-item flex">
					<!-- 当前进度 -->
					<view class="item-left column flex-start-center">
						<view
							class="dot"
							v-if="index"
						></view>
						<image src="/static/images/dot-icon.png" v-else class="dot-icon" mode="aspectFit">
						<view class="line"></view>
					</view>
					<!-- 历史进度 -->
					<!-- <view class="item-left column flex-start-center">
					<view class="border"></view>
					<view class="dot"></view>
					<view class="line"></view> -->
					<!-- </view> -->
					<view
						class="item-right column"
						
					>
						<!-- <text class="title">快递已签收</text> -->
						<text class="info" :style="'color:' + (!index ? '#333' : '#999')">{{ item.context }}</text>
						<text class="time" :style="'color:' + (!index ? '#333' : '#999')">{{ item.time }}</text>
					</view>
				</view>
			</block>

			<!-- <view class="delivery-item flex"> -->
			<!-- 当前进度 -->
			<!-- <view class="item-left column flex-start-center">
					<image src="/static/images/dot-icon.png" class="dot-icon" mode="aspectFit">
					<view class="line"></view>
				</view> -->
			<!-- 历史进度 -->
			<!-- <view class="item-left column flex-start-center">
					<view class="border"></view>
					<view class="dot"></view>
					<view class="line"></view>
				</view>
				<view class="item-right column">
					<text class="title">快递已签收</text>
					<text class="info">您的订单由本人签收，XXXXXXXXXXXXXXXXX,XXXX XXXXXXXXX</text>
					<text class="time">2020-02-15  20：36</text>
				</view> -->
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			addr: "",
		};
	},
	onLoad(data) {
		this.info = JSON.parse(data.info);

		this.addr = data.address;
	},
	onReady() {
		uni.setNavigationBarTitle({
			title: this.info.expressCompany,
		});
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx 50rpx;
	background: #fff;
}
.delivery-item {
	.item-left {
		position: relative;
		margin-right: 20rpx;
		width: 30rpx;
		&.padding-top {
			padding-top: 5rpx;
		}
	}
	.dot-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;

		color: #fff;
		z-index: 10;
	}
	.dot {
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background: #d7d7d7;
	}
	.border {
		width: 2rpx;
		height: 10rpx;
		background: #eaecec;
	}
	.line {
		width: 2rpx;
		height: 100%;
		background: #eaecec;
	}
	.item-right {
		flex: 1;
		margin-bottom: 40rpx;
	}
	.title {
		margin-bottom: 20rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: bold;
		color: #333;
	}
	.info {
		margin-bottom: 10rpx;
		// color: #666666;
		color: #333;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.time {
		// color: #666666;
		color: #333;
		font-size: 24rpx;
	}
	&.active {
		.title {
			color: #333;
		}
	}
	&:last-child {
		.line {
			width: 0;
		}
	}
}
</style>
